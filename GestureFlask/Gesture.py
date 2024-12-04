
from flask import Flask, jsonify, Response, render_template, request
import cv2
import numpy as np
import mediapipe as mp
import tensorflow as tf
from tensorflow.keras.models import load_model
import threading
from flask_cors import CORS
import random
import smtplib
from pymongo import MongoClient
from datetime import datetime, timedelta
from dotenv import load_dotenv
from bson import ObjectId
import cloudinary
import cloudinary.uploader
import re
import os
import atexit
import time

load_dotenv()

app = Flask(__name__)
CORS(app)

mpHands = mp.solutions.hands
hands = mpHands.Hands(max_num_hands=1, min_detection_confidence=0.7)
mpDraw = mp.solutions.drawing_utils
model = load_model('mp_hand_gesture')

with open('gesture.names', 'r') as f:
    classNames = f.read().splitlines()


# if not cap.isOpened():
#     raise ValueError("Unable to open webcam. Please check if the webcam is accessible.")

current_prediction = None

# def cleanup():
#     if cap.isOpened():
#         cap.release()
# atexit.register(cleanup)

try:
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client['otp_auth']
    otp_collection = db['otps']
    verified_users_collection = db['verified_users']
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    raise e

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))
# Email OTP auth 

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)
# Cloud Image

if not os.path.exists("uploads"):
    os.makedirs("uploads")

@app.route('/check', methods=['GET'])
def home():
    return jsonify({"message": "Server started"}), 200

@app.route('/')
def hello():
    return '<h1>Working on PORT http://127.0.0.1:8000/</h2>'

def send_email(receiver_email, otp):
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            message = f"Subject: OTP Verification Code\n\nYour OTP is: {otp}. This code is valid for 5 minutes."
            server.sendmail(EMAIL_USER, receiver_email, message)
    except Exception as e:
        print(f"Error sending email: {e}")

@app.route('/send_otp', methods=['POST'])
def send_otp():
    try:
        # Parse the request data
        data = request.get_json()
        email = data.get('email')

        # Validate email input
        if not email:
            return jsonify({"error": "Email is required"}), 400

        # Check email format
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, email):
            return jsonify({"error": "Invalid email format"}), 400

        # Check if the email exists in the verified_users_collection
        verified_user = verified_users_collection.find_one({"email": email})
        if not verified_user:
            return jsonify({"error": "Email not found in verified users"}), 404

        # Generate OTP and store it in otp_collection
        otp = str(random.randint(100000, 999999))
        otp_data = {
            "email": email,
            "otp": otp,
            "expires_at": datetime.utcnow() + timedelta(minutes=5)
        }

        # Check if an OTP already exists for the email
        existing_otp = otp_collection.find_one({"email": email})
        if existing_otp:
            otp_collection.update_one({"email": email}, {"$set": otp_data})
        else:
            otp_collection.insert_one(otp_data)

        # Send OTP via email
        send_email(email, otp)

        return jsonify({"message": "OTP sent to email"}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route("/create_profile", methods=["POST"])
def create_profile():
    try:
        # Parse request data
        data = request.json
        if not data:
            return jsonify({"success": False, "message": "No data provided"}), 400

        # Extract and validate required fields
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        password = data.get("password")
        street = data.get("street")
        city = data.get("city")
        zipcode = data.get("zipcode")

        if not first_name or not last_name or not email or not password:
            return jsonify({"success": False, "message": "All fields are required (first name, last name, email, password)"}), 400

        # Check if user already exists
        existing_user = verified_users_collection.find_one({"email": email})
        if existing_user:
            return jsonify({"success": False, "message": "Email already exists"}), 409

        new_user = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password ,
            "street": street,
            "city": city,
            "zipcode": zipcode,
            "Gesture": []
        }

        # Insert the user into the database
        verified_users_collection.insert_one(new_user)

        return jsonify({"success": True, "message": "Profile created successfully"}), 201

    except Exception as e:
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500


@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    try:
        # Parse request data
        data = request.get_json()
        email = data.get('email')
        otp = data.get('otp')

        # Validate input
        if not email or not otp:
            return jsonify({"error": "Email and OTP are required"}), 400

        # Retrieve OTP record from database
        otp_record = otp_collection.find_one({"email": email})
        if not otp_record:
            return jsonify({"error": "OTP not found"}), 404

        # Verify OTP
        if otp_record["otp"] == otp:
            if otp_record["expires_at"] > datetime.utcnow():
                otp_collection.delete_one({"email": email})
                return jsonify({"message": "OTP verified successfully"}), 200
            else:
                return jsonify({"error": "OTP has expired"}), 400
        else:
            return jsonify({"error": "Invalid OTP"}), 400

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
@app.route("/password", methods=["POST"])
def login():
    try:
        # Parse request data
        data = request.json
        if not data:
            return jsonify({"success": False, "message": "No data provided"}), 400

        # Get email and password from the request
        email = data.get("email")
        password = data.get("password")

        # Validate input
        if not email or not password:
            return jsonify({"success": False, "message": "Email and password are required"}), 400

        # Find the user in the database
        user = verified_users_collection.find_one({"email": email, "password": password})

        # Check if user exists
        if not user:
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

        # Authentication successful
        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": {
                "email": user["email"],
                "first_name": user["first_name"],
                "last_name": user["last_name"]
            }
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500

    
@app.route('/getUserById', methods=['POST'])
def get_user_by_id():
    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    try:
        # Convert the user_id to an ObjectId and fetch the user document
        user_record = verified_users_collection.find_one({"_id": ObjectId(user_id)})

        if user_record:
            # Convert ObjectId to string for JSON compatibility
            user_record['_id'] = str(user_record['_id'])
            return jsonify(user_record), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": f"Invalid user ID format: {str(e)}"}), 400

    
    
@app.route('/getDetails', methods=['POST'])
def get_details():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Find the user in the verified_users collection
    user_record = verified_users_collection.find_one({"email": email}, {"_id": 1})

    if user_record:
        return jsonify({"_id": str(user_record["_id"])}), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
@app.route('/addGesture', methods=['POST'])
def add_manual_gesture():
    data = request.form
    user_id = data.get('user_id')
    gesture = data.get('gesture')
    image = request.files.get('image')

    # Check required fields
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    if not gesture:
        return jsonify({"error": "Gesture is required"}), 400
    if not image:
        return jsonify({"error": "Image is required"}), 400

    try:
        # Convert the user_id to an ObjectId
        user_object_id = ObjectId(user_id)

        # Upload the image to Cloudinary
        upload_result = cloudinary.uploader.upload(image, public_id=f"gestures/{gesture}_{image.filename}")

        # Get the URL of the uploaded image
        image_url = upload_result.get("url")

        # Create a dictionary with gesture name and Cloudinary image URL
        gesture_entry = {
            "gesture": gesture,
            "image": image_url
        }

        # Append the gesture entry to the user's gestures list in the database
        result = verified_users_collection.update_one(
            {"_id": user_object_id},
            {"$push": {"gestures": gesture_entry}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "message": "Gesture and image URL added to user's record",
            "gesture_entry": gesture_entry
        }), 200

    except Exception as e:
        return jsonify({"error": f"Invalid user ID format or database error: {str(e)}"}), 400
    
@app.route('/getUserGestures', methods=['POST'])
def get_user_gestures():
    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    try:
        user_object_id = ObjectId(user_id)
        user_record = verified_users_collection.find_one({"_id": user_object_id}, {"Gesture": 1})

        if user_record:
            # Return the gestures list
            return jsonify({"gestures": user_record.get("Gesture", [])}), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": f"Invalid user ID format: {str(e)}"}), 400
    
@app.route('/gesture', methods=['GET'])
def get_gesture():
    return jsonify({"gesture": current_prediction})

def save_gesture_and_frame(frame, gesture_name, user_object_id):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Save the frame to a temporary file
    temp_filename = f"temp_{gesture_name}_{timestamp}.jpg"
    cv2.imwrite(temp_filename, frame)
    
    try:
        # Upload the image to Cloudinary under a folder named after the objectId
        upload_response = cloudinary.uploader.upload(
            temp_filename,
            folder=f"Gesture/{user_object_id}/gestures"  # Create folder with objectId and subfolder 'gestures'
        )
        image_url = upload_response['secure_url']
        print(f"Gesture '{gesture_name}' uploaded to Cloudinary: {image_url}")
        
        # Remove the temporary file after upload
        os.remove(temp_filename)
        return image_url
    except Exception as e:
        print(f"Error uploading to Cloudinary: {e}")
        return None

# Variables for timing
last_saved_time = time.time() 
save_interval = 12


def update_user_gesture(user_object_id, gesture_name, image_url):
    try:
        verified_users_collection.update_one(
            {'_id': ObjectId(user_object_id)},  # Find user by ObjectId
            {'$push': {'Gesture': {'gesture_name': gesture_name, 'image_url': image_url}}}
        )
        print(f"User {user_object_id} updated with gesture {gesture_name}")
    except Exception as e:
        print(f"Error updating user: {e}")

# Function to generate video stream
def gen(user_object_id):
    cap = cv2.VideoCapture(0)
    global last_saved_time
    while True:
        success, frame = cap.read()
        if not success:
            print("Failed to capture frame.")
            break

        # Flip and process frame for gesture
        frame = cv2.flip(frame, 1)
        framergb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = hands.process(framergb)
        gesture_name = "Unknown"

        if result.multi_hand_landmarks:
            landmarks = []
            for handslms in result.multi_hand_landmarks:
                for lm in handslms.landmark:
                    lmx = int(lm.x * frame.shape[1])
                    lmy = int(lm.y * frame.shape[0])
                    landmarks.append([lmx, lmy])
                mpDraw.draw_landmarks(frame, handslms, mpHands.HAND_CONNECTIONS)

                # Predict the gesture using the loaded model
                try:
                    # Flatten landmarks and predict gesture
                    prediction = model.predict(np.array([landmarks]).flatten().reshape(1, -1))
                    classID = np.argmax(prediction)
                    gesture_name = classNames[classID]
                except Exception as e:
                    print(f"Error in gesture prediction: {e}")

   
        current_time = time.time()
        if gesture_name != "Unknown" and current_time - last_saved_time >= save_interval:
            image_url = save_gesture_and_frame(frame, gesture_name,user_object_id)
            if image_url:
                update_user_gesture(user_object_id, gesture_name, image_url)
            last_saved_time = current_time  # Update the time when the image was last saved

        # Display the gesture name on the frame
        cv2.putText(frame, gesture_name, (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)

        # Convert frame to JPEG and yield as response
        ret, jpeg = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        frame_data = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_data + b'\r\n')


# Route for video streaming
@app.route('/video_feed/<user_object_id>')
def video_feed(user_object_id):
    return Response(gen(user_object_id), mimetype='multipart/x-mixed-replace; boundary=frame')

# Route to start gesture capture for a given user
@app.route('/start_gesture_capture', methods=['POST'])
def start_gesture_capture():
    user_object_id = request.json.get('user_object_id')  # Get the user ObjectId from the request
    if not user_object_id:
        return jsonify({"error": "User ObjectId is required"}), 400
    return jsonify({"message": "Gesture capture started"}), 200


if __name__ == '__main__':
    app.run(port=8000, host="127.0.0.1")
