import React from 'react';
import { Box } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Box className="w-8 h-8 text-red-500" />
          <span className="font-medium text-xl">ChainFlow</span>
        </Link>

        {/* Navigation Links - Centered */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex items-center gap-12">
            <Link
              to="/"
              className={`hover:text-blue-900 text-sm font-medium ${
                location.pathname === '/' ? 'text-blue-900' : ''
              }`}
            >
              HOME
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-900 text-sm font-medium ${
                location.pathname === '/about' ? 'text-blue-900' : ''
              }`}
            >
              ABOUT
            </Link>
            <Link
              to="/services"
              className={`hover:text-blue-900 text-sm font-medium ${
                location.pathname === '/services' ? 'text-blue-900' : ''
              }`}
            >
              SERVICES
            </Link>
          </div>
        </div>

        {/* Get in Touch Button - Right aligned */}
        <button className="hidden md:block px-6 py-2 border border-blue-900 rounded-full text-sm font-medium hover:bg-blue-900 hover:text-white transition-colors">
          GET IN TOUCH
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
