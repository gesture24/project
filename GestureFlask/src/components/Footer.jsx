import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/12350/12350545.png"
                alt="Motion Gestures Logo"
                width={40}
                height={40}
                className="w-auto h-10"
              />
              <div className="text-lg font-semibold text-gray-800">
                <span className="text-emerald-600">MOTION</span> GESTURES
              </div>
            </Link>
            <div className="text-gray-600 space-y-2">
              <p>info@motiongestures.com</p>
              <p>168 Lone Street,</p>
              <p>Suite 455C</p>
              <p>Piramal Lane</p>
              <p>India</p>
            </div>
          </div>

          
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Link href="/home" className="text-emerald-600 hover:text-emerald-800 transition-colors">HOME</Link>
              <Link href="/technology" className="text-emerald-600 hover:text-emerald-800 transition-colors">TECHNOLOGY</Link>
              <Link href="/applications" className="text-emerald-600 hover:text-emerald-800 transition-colors">APPLICATIONS</Link>
              <Link href="/resources" className="text-emerald-600 hover:text-emerald-800 transition-colors">RESOURCES</Link>
              <Link href="/news" className="text-emerald-600 hover:text-emerald-800 transition-colors">NEWS</Link>
              <Link href="/company" className="text-emerald-600 hover:text-emerald-800 transition-colors">COMPANY</Link>
              <Link href="/contact" className="text-emerald-600 hover:text-emerald-800 transition-colors">CONTACT</Link>
            </div>
          </div>

        
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-semibold text-gray-800">Subscribe to receive SDK update notifications</h3>
            <form className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-800"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

       
        <div className="mt-8 pt-4 border-t border-gray-100 text-center text-gray-600">
          <p>Copyright © 2024 Motion Gestures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer