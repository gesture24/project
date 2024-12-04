import React from 'react';
import {

    Typography,

} from "@mui/material";

const ContactPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
                <div className="max-w-xl">
                    <h1 className="text-[#1B4B66] text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                    Meet our team and discover the vision driving our company forward
                    </h1>
                    <p className="text-[#1B4B66] text-xl mb-8">
                        Motion Gestures was established to revolutionize hand tracking and gesture recognition technology.
                    </p>
                </div>
                <div className="flex justify-center">
                    <img
                        src="https://motiongestures.com/assets/Uploads/MOG-Hand-Banner-square-pinch.jpg"
                        alt="Hand tracking visualization"
                        className="w-full max-w-lg object-contain"
                        style={{ aspectRatio: '1/1' }}
                    />
                </div>
            </div>

      
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-[#1B4B66] mb-8">
                    I would like to learn more about Motion Gestures
                </h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-600 mb-2">
                                Name <span className="text-[#1B4B66]">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1B4B66] focus:ring-2 focus:ring-[#1B4B66] focus:ring-opacity-20 outline-none transition duration-200 shadow-sm hover:shadow-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-600 mb-2">
                                Email <span className="text-[#1B4B66]">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1B4B66] focus:ring-2 focus:ring-[#1B4B66] focus:ring-opacity-20 outline-none transition duration-200 shadow-sm hover:shadow-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-gray-600 mb-2">
                                Phone <span className="text-[#1B4B66]">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1B4B66] focus:ring-2 focus:ring-[#1B4B66] focus:ring-opacity-20 outline-none transition duration-200 shadow-sm hover:shadow-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-gray-600 mb-2">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1B4B66] focus:ring-2 focus:ring-[#1B4B66] focus:ring-opacity-20 outline-none transition duration-200 shadow-sm hover:shadow-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="comments" className="block text-gray-600 mb-2">
                            Comments <span className="text-[#1B4B66]">*</span>
                        </label>
                        <textarea
                            id="comments"
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1B4B66] focus:ring-2 focus:ring-[#1B4B66] focus:ring-opacity-20 outline-none transition duration-200 shadow-sm hover:shadow-md"
                        ></textarea>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="newsletter"
                            className="w-4 h-4 text-[#1B4B66] border-gray-300 rounded focus:ring-[#1B4B66]"
                        />
                        <label htmlFor="newsletter" className="ml-2 text-gray-600">
                            Add me to newsletter
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#1B4B66] text-white px-8 py-3 rounded-full transition duration-200 shadow-sm hover:shadow-lg transform hover:scale-105 hover:bg-[#1B4B66]/90"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;