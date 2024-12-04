import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Hand, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../config/config';

const LoginOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/send_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('OTP sent successfully!');
        setOtpSent(true);
      } else {
        toast.error(data.detail || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const otpResponse = await fetch(`${baseUrl}/verify_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          otp: otp.join('') 
        }),
      });

      const otpData = await otpResponse.json();

      if (otpResponse.ok) {
        const idResponse = await fetch(`${baseUrl}/getDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const idData = await idResponse.json();

        if (idResponse.ok) {
          toast.success('OTP verified successfully!');
          localStorage.setItem('userToken', otpData.token);
          localStorage.setItem('userId', idData._id);
          localStorage.setItem('userEmail', email);
          setTimeout(() => navigate('/home-page'), 2000);
        } else {
          toast.error('Failed to fetch user details. Please try again.');
        }
      } else {
        toast.error(otpData.detail || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-1/2 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"
        />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-emerald-500/90 rounded-lg flex items-center justify-center mb-8">
              <motion.div
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Hand className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-6">
              Login with OTP
            </h1>
            <p className="text-emerald-100/80 text-lg max-w-md">
              Secure, quick, and password-free. Use our OTP system to access your account with ease.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="/login" 
              className="flex items-center text-emerald-600 hover:text-emerald-700 mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to login
            </Link>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">OTP Login</h2>
            <p className="text-gray-600 mb-8">
              {otpSent 
                ? "Enter the OTP sent to your email" 
                : "Enter your email to receive an OTP"}
            </p>

            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="space-y-2">
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-2">
                  <label 
                    htmlFor="otp" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    One-Time Password
                  </label>
                  <div className="flex gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isLoading || otp.some(digit => !digit)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify OTP
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default LoginOTP;