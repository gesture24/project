import React from 'react';

const SpecificationsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-5xl font-bold text-[#006C84] mb-6">Specifications</h1>
      
      <p className="text-gray-600 mb-8">
        Our SDK has the following specifications:
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#006C84] mb-4">Processors</h2>
        <p className="text-gray-700 leading-relaxed">
          We support ARM and Intel architectures. Hardware acceleration is not required for single hand operation 
          though we can run SDK on accelerators such as GPUs, NPUs, and FPGAs. SDK can also be ported to 
          custom platforms upon request.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#006C84] mb-4">Computation</h2>
        <p className="text-gray-700 leading-relaxed">
          Recognition algorithms are computationally light and can scale according to available resources. 
          For example, ARM A7 can support static gestures with a single hand. ARM A53 can support both static 
          and dynamic gestures with a single hand. And ARM A72 can support two hands while ARM i5 can support 
          several hands. Custom recognition models can also be created upon request for specific platforms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#006C84] mb-4">OS & Plug-ins</h2>
        <p className="text-gray-700 leading-relaxed">
          We support Windows, Linux, Mac OS, Android, and iOS operating systems. SDK is written in C++ and 
          comes with plugins for C#, Java, Python, and Unity. Custom plugins can also be created upon request 
          for specific platforms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#006C84] mb-4">Cameras</h2>
        <p className="text-gray-700 leading-relaxed">
          We support RGB (i.e. color), NIR (i.e. near infrared) and Depth (e.g. time of flight) cameras. 
          The SDK can also be customized upon request for 3rd party cameras by taking into account variables 
          such as camera type, image resolution, camera position, camera speed, and field of view. We also 
          support multi-camera setup.
        </p>
      </section>
    </div>
  );
};

export default SpecificationsPage;