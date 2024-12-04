# 1. Use the official Python image from Docker Hub
FROM python:3.8-slim

# 2. Set environment variables to prevent Python from writing .pyc files and buffer logs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Set the working directory in the container
WORKDIR /app

# 4. Copy the requirements file into the container
COPY requirements.txt /app/

# 5. Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy the rest of the project files into the container
COPY . /app/

# 7. Expose the port that the Flask app runs on
EXPOSE 5000

# 8. Set the command to run the Flask app with Gunicorn, using Gesture.py as the main entry point
CMD ["gunicorn", "-b", "0.0.0.0:5000", "Gesture:app"]
