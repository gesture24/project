import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, UserPlus } from 'lucide-react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storedEmail = localStorage.getItem('userEmail');
      const storedUserId = localStorage.getItem('userId');
      if (storedEmail && storedUserId) {
        setIsAuthenticated(true);
        setUserEmail(storedEmail);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    navigate('/');
    setIsDropdownOpen(false);
  };

  const handleRegister = () => {
    navigate('/');
    setIsDropdownOpen(false);
  };

  return (
    <header className="border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/home-page" className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/128/12350/12350545.png"
              alt="Motion Gestures Logo"
              width={40}
              height={40}
              className="w-auto h-10"
            />
            <div className="text-lg font-semibold text-gray-800">
              <span className="text-emerald-600 font-serif">MOTION</span> <span className="font-sans">GESTURES</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/technology"
              className="text-emerald-600 hover:text-emerald-800 hover:underline transition-colors font-medium"
            >
              TECHNOLOGY
            </Link>
            <Link
              to="/applications"
              className="text-emerald-600 hover:text-emerald-800 hover:underline transition-colors font-medium"
            >
              APPLICATIONS
            </Link>
            <Link
              to="/resources"
              className="text-emerald-600 hover:text-emerald-800 hover:underline transition-colors font-medium"
            >
              RESOURCES
            </Link>
            <Link
              to="/my-gestures"
              className="text-emerald-600 hover:text-emerald-800 hover:underline transition-colors font-medium"
            >
              MY GESTURES
            </Link>
            <Link
              to="/contact"
              className="text-emerald-600 hover:text-emerald-800 hover:underline transition-colors font-medium"
            >
              CONTACT
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-emerald-500"
                />
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        {userEmail}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleRegister}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <UserPlus className="mr-2 h-4 w-4" /> Register
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <button className="md:hidden p-2 text-gray-600 hover:text-emerald-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;