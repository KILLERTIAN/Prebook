import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react"; // Importing UserCircle icon

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(""); // State to store the user's role

  useEffect(() => {
    // Get the role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []); // Runs once when the component is mounted

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 shadow-lg py-4 h-[70px] z-[999]">
      <div className="px-4 sm:px-10 flex justify-between items-center w-full">
        {/* Logo or Brand Name */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Prebook</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-white text-lg font-medium hover:text-blue-200"
          >
            Home
          </Link>

          {userRole == "owner" && (
            <Link
              to="/register"
              className="text-white text-lg font-medium hover:text-blue-200"
            >
              Register Restaurant
            </Link>
          )}
          {/* <Link
            to="/book"
            className="text-white text-lg font-medium hover:text-blue-200"
          >
            Book Table
          </Link> */}
          <Link
            to="/restaurants"
            className="text-white text-lg font-medium hover:text-blue-200"
          >
            Restaurants
          </Link>
          {!user && (
            <Link
              to="/login"
              className="text-white text-lg font-medium hover:text-blue-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* User Icon */}
        {user && (
          <div className="relative">
            <button
              className="text-white"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <UserCircle size={36} />
            </button>
            {/* Logout Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-32">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    // Handle Logout
                    alert("Logged out!");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${
          isMenuOpen ? "block" : "hidden"
        } md:hidden fixed top-0 right-0 h-full w-64 bg-blue-600 shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-end p-4">
          <button className="text-white" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center mt-8">
          <Link
            to="/"
            className="text-white text-lg font-medium hover:text-blue-200 py-2"
            onClick={handleLinkClick}
          >
            Home
          </Link>

          {userRole == "owner" && (
            <Link
              to="/register"
              className="text-white text-lg font-medium hover:text-blue-200 py-2"
              onClick={handleLinkClick}
            >
              Register Restaurant
            </Link>
          )}
          {/* <Link
            to="/book"
            className="text-white text-lg font-medium hover:text-blue-200 py-2"
            onClick={handleLinkClick}
          >
            Book Table
          </Link> */}
          <Link
            to="/restaurants"
            className="text-white text-lg font-medium hover:text-blue-200 py-2"
            onClick={handleLinkClick}
          >
            Restaurants
          </Link>
          {!user && (
            <Link
              to="/login"
              className="text-white text-lg font-medium hover:text-blue-200 py-2"
              onClick={handleLinkClick}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
