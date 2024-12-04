
import axios from "axios";
import { baseUrl } from "./config";

export const startGestureCapture = async () => {
    try {
      const objectId = localStorage.getItem('userId'); 
      if (!objectId) {
        throw new Error('ObjectId is missing from localStorage');
      }
  
      const response = await axios.post(`${baseUrl}/start_gesture_capture`, {
        user_object_id: objectId,
      });
  
      return response.data;
    } catch (error) {
      console.error("Error starting gesture capture:", error);
      throw error;
    }
  };
  

  export const getVideoFeedUrl = () => {
    const objectId = localStorage.getItem('userId'); 
    if (!objectId) {
      console.error("ObjectId is missing from localStorage");
      return null;
    }
  
    return `${baseUrl}/video_feed/${objectId}`;
  };