import React from 'react';

const EvaluationSDK = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-6xl text-[#005177] mb-6 font-bold">
        Evaluation SDK
      </h1>
      
      <div className="text-gray-600 space-y-4">
        <p>
          Our SDK has the following specifications:
        </p>
        
        <p>
          We offer Windows Motion Gesture hand tracking and gesture recognition SDK for free evaluation.
          Technical support is also provided free of charge.
        </p>
        
        <p>
          Windows SDK supports Microsoft Kinect RGB, NIR, and/or Depth cameras in front-facing and ego-centric positions. It uses a 21 points-based skeleton for hand tracking and gesture recognition. Positional coordinates for all tracked joints are provided in real-time. Each hand is assigned a unique ID along with face, side, grip, size, and (pointing) direction values. The SDK is able to track overlapping hands as well as train hand-grip.
        </p>
        
        <p>
          Sample gestures are included in static, dynamic, trigger and drawing categories. Specifically, the SDK supports numeric, thumbs_ok, victory, open_palm, and fist gestures in static category. It supports tapping, swiping, and zooming gestures in dynamic category. Drawing gestures in the form of letter, number, symbols, shapes, and characters are also provided. Each supported gesture can be performed in a variety of ways.
        </p>
        
        <p>
          The gesture SDK also supports body tracking using joints skeletons approach. Body skeleton covers 25 key joins in upper body such as eyes, ears, nose, shoulders, elbows, wrists, and palm center. It is linked to a 21-point skeleton for each hand attached to the body, thereby allowing all users' movements and gestures to be assigned to a specific individual in a group.
        </p>
        
        <p>
          Evaluation SDK can be integrated with Intel 3D cameras, Microsoft Windows SDK 2.0, IDS, xE325,
          and Android. It is written in C++ but comes with plugins for C#/Unity, Java, Python, and Unity. The
          minimum supported depth camera for hand tracking purposes is a function of IR/PD (i.e., imager
          resolution) and FOV (i.e. lens).
        </p>

        <button className="mt-8 bg-[#3C8195] hover:bg-[#2d6171] text-white py-2 px-6 rounded-full text-lg font-semibold">
          Request a free evaluation
        </button>
      </div>
    </div>
  );
};

export default EvaluationSDK;