import React, { useEffect, useState } from "react";

const Home = () => {
  const [userRole, setUserRole] = useState(""); // State to store the user's role

  useEffect(() => {
    // Get the role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []); // Runs once when the component is mounted

  return (
    <div className="max-h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="text-center p-8 max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
          Welcome to <span className="text-blue-600">Prebook</span>
        </h1>
        <p className="mt-6 text-lg text-gray-700">
          Seamlessly reserve tables at your favorite restaurants. Hassle-free
          bookings, just a click away!
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          {userRole !== "customer" && ( // Conditionally render the Register Restaurant button
            <a
              href="/register"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Register Restaurant
            </a>
          )}
          <a
            href="/restaurants"
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg shadow-lg text-lg font-medium hover:bg-gray-300 focus:ring-4 focus:ring-gray-300"
          >
            Find a Restaurant
          </a>
        </div>

        {/* Image Section */}
        <div className="mt-10">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHJlc3RhdXJhbnQlMjBib29raW5nfGVufDB8fHx8MTY5ODgzNDU0Mg&ixlib=rb-1.2.1&q=80&w=1080"
            alt="Restaurant Table Booking Illustration"
            className="mx-auto w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
