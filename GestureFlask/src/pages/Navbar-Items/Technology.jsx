import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TechnologyPage = () => {
  const technologies = [
    { number: 1, name: "Python" },
    { number: 2, name: "Mediapipe" },
    { number: 3, name: "OpenCV Python" },
    { number: 4, name: "Flask" },
    { number: 5, name: "Numpy" }
  ];

  const gestureImages = {
    'Hand Skeleton': {
      src: "data:image/jpeg;base64,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",
      alt: 'Hand skeleton visualization showing connected joints with colored dots and lines',
      label: 'Hand Skeleton'
    },
    'Overlapped Hands': {
      src: 'https://www.motiongestures.com/assets/Uploads/MOG-Hand-Banner-square-ok.jpg',
      alt: 'Visualization of overlapped hands detection',
      label: 'Overlapped Hands'
    },
    'Thumbs Up': {
      src: 'https://ai.google.dev/static/mediapipe/images/solutions/gesture-recognizer.png',
      alt: 'Hand face and side view tracking',
      label: 'Thumbs Up'
    },
    'OK Gesture': {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwBP3kFnRtu8VkBrV4INjM-TkWlhX4tYMShg&s',
      alt: 'OK hand gesture recognition',
      label: 'OK Gesture'
    },
    'Swiping Gesture': {
      src: 'https://tse3.mm.bing.net/th?id=OIP.YIcXQq_JNiCq7w-lVH8yHQHaHa&pid=Api&P=0&h=180',
      alt: 'Swiping gesture demonstration',
      label: 'Swiping Gesture'
    },
    'Drawing Gesture': {
      src: 'data:image/jpeg;base64,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',
      alt: 'Drawing gesture tracking',
      label: 'Drawing Gesture'
    },
    'Stop': {
      src: 'https://tse4.mm.bing.net/th?id=OIP.616I7d3RjHZtF6oCoyTZpQAAAA&pid=Api&P=0&h=180',
      alt: 'Drawing gesture tracking',
      label: 'Stop'
    },
    'Smile': {
      src: 'https://tse3.mm.bing.net/th?id=OIP.cS4ePQAZskt3k253MKP_cwHaE8&pid=Api&P=0&h=180',
      alt: 'Drawing gesture tracking',
      label: 'Smile'
    },
    'peace': {
      src: 'https://tse1.mm.bing.net/th?id=OIP.4DTXnK2J0uaFbcZ2Hq-HWwAAAA&pid=Api&P=0&h=180',
      alt: 'Drawing gesture tracking',
      label: 'Peace'
    },
    'Thumbs down': {
      src: 'https://images.pexels.com/photos/9017561/pexels-photo-9017561.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Drawing gesture tracking',
      label: 'Thumbs down'
    }
  };

  const [selectedGesture, setSelectedGesture] = useState(Object.keys(gestureImages)[0]);


  return (
    <div className="min-h-screen bg-white">
      
      <section className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b556d] leading-tight mb-6">
              Unlock endless possibilities with seamless hand tracking!
            </h1>
            <p className="text-xl md:text-2xl text-[#42798a] leading-relaxed">
              Add powerful contactless interface to any product, in any sector
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <img
              src="https://media.licdn.com/dms/image/D5612AQGN3EdrFCyEeg/article-cover_image-shrink_720_1280/0/1662353833082?e=2147483647&v=beta&t=ckF3bIrPXQbzcrDYt0gu7g4XeYmknxyYnv97GRslyAE"
              alt="Hand tracking illustration"
              className="max-w-md w-full rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      
      <section className="container mx-auto px-4 py-24 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#0b556d] mb-24"
        >
          Our Technology Stack
        </motion.h2>
        <div className="space-y-24 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-300 transform -translate-x-1/2 hidden lg:block" />

          {technologies.map((tech, index) => (
            <motion.div
              key={tech.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center relative`}
            >
              <div className="flex-1 z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-2xl shadow-[0_10px_20px_rgba(0,100,0,0.3)] hover:shadow-[0_20px_30px_rgba(0,100,0,0.4)] transition-all duration-300 border-2 border-emerald-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-[#3e879f]">#{tech.number}</span>
                    <h3 className="text-2xl font-bold text-[#468397]">{tech.name}</h3>
                  </div>
                </motion.div>
              </div>
              <div className="hidden lg:block flex-1" />
              <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-emerald-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
            </motion.div>
          ))}
        </div>
      </section>

      
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24 max-w-5xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-teal-800 mb-6"
          >
            Explore hand tracking and gesture recognition photos
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden"
              key={selectedGesture}
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={gestureImages[selectedGesture].src}
                alt={gestureImages[selectedGesture].alt}
                className="w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-teal-800 text-white py-4 px-6">
                <h3 className="text-xl font-semibold">{gestureImages[selectedGesture].label}</h3>
              </div>
            </motion.div>


            <div className="space-y-4">
              <h3 className="text-2xl text-teal-800 font-semibold mb-6">
                Select from following gestures:
              </h3>
              <div className="space-y-3">
                {Object.keys(gestureImages).map((gesture) => (
                  <motion.button
                    key={gesture}
                    onClick={() => setSelectedGesture(gesture)}
                    className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 
                              ${selectedGesture === gesture
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-teal-50'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {gesture}
                  </motion.button>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
    </div>
  );
};

export default TechnologyPage;