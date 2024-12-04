import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hand, ArrowRight, Loader2, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../config/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const passwordResponse = await fetch(`${baseUrl}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const passwordData = await passwordResponse.json();

      if (passwordResponse.ok) {
        const idResponse = await fetch(`${baseUrl}/getDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const idData = await idResponse.json();

        if (idResponse.ok) {
          toast.success('Login successful!');
          localStorage.setItem('userToken', passwordData.token);
          localStorage.setItem('userId', idData._id);
          localStorage.setItem('userEmail', email);
          setTimeout(() => navigate('/home-page'), 2000);
        } else {
          toast.error('Failed to fetch user details. Please try again.');
        }
      } else {
        toast.error(passwordData.detail || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
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
              Welcome to Gesture Recognition
            </h1>
            <p className="text-emerald-100/80 text-lg max-w-md">
              Experience a new way of authentication through innovative gesture recognition technology. 
              Secure, intuitive, and designed for the future.
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 mb-8">Enter your credentials to continue</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter your password"
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
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6">
              <Link 
                to="/login-otp" 
                className="w-full flex items-center justify-center py-3 px-4 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <Lock className="w-5 h-5 mr-2" />
                Login via OTP
              </Link>
            </div>

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

export default Login;