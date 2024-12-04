import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import Components
import RegisterRestaurant from "./components/RegisterRestaurant";
import BookTable from "./components/BookTable";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RestaurantsPage from "./components/RestaurantsPage";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
        {/* Enhanced Navigation Bar */}
        <Navbar user={user} />

        {/* Routes */}
        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterRestaurant />} />
            <Route path="/book" element={<BookTable />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
