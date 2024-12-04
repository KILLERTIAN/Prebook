import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const imageLinks = [
  "https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1464306208223-e0b4495a5553?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1671403964040-3fa56d33f44b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1673809798970-30c14cfd0ab6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1700752343056-e89926bf5ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1695132236644-1cc276ec81f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGZvb2R8ZW58MHx8MHx8fDA%3D",
];

const getRandomImage = () => {
  return imageLinks[Math.floor(Math.random() * imageLinks.length)];
};

// Rename the RestaurantCard component properly
const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <img
        src={restaurant.image || getRandomImage()}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      {/* Details */}
      <div className="p-4">
        {/* Name and Cuisine */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {restaurant.name}
            </h3>
            {/* Rating as Stars */}
            <div className="flex items-center space-x-2 text-yellow-500">
              {/* Stars */}
              <span>
                {"★".repeat(Math.round(restaurant.rating)) +
                  "☆".repeat(5 - Math.round(restaurant.rating))}
              </span>
              {/* Numeric Rating */}
              <span className="text-gray-700 text-sm font-medium">
                {restaurant.rating}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
            <p
              className={`mt-1 text-xs font-medium text-right ${
                restaurant.isVeg ? "text-green-500" : "text-red-500"
              }`}
            >
              {restaurant.isVeg ? "Veg" : "Non-Veg"}
            </p>
          </div>
        </div>
        {/* Book Button */}
        <button
          onClick={() => alert(`Booking ${restaurant.name}`)}
          className="block w-full bg-blue-600 text-white py-2 text-center rounded-lg font-semibold hover:bg-blue-700"
        >
          Book
        </button>
      </div>
    </div>
  );
};

// Correctly name the main component
const RestaurantsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch restaurants data
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/restaurants/search/?keyword=${searchQuery}`
        );
        const data = await response.json();
        setRestaurantData(data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data when the search query changes
    if (searchQuery) {
      fetchRestaurants();
    } else {
      // Fetch all restaurants if no search query
      fetch(`${API_BASE_URL}/restaurants/`)
        .then((response) => response.json())
        .then((data) => {
          setRestaurantData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
          setLoading(false);
        });
    }
  }, [searchQuery]);

  return (
    <div className="min-h-[calc(100vh-70px)] px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Restaurants</h1>
        {/* Search Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, cuisine, veg/non-veg..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 text-gray-500 w-5 h-5" />
        </div>
      </div>
      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurantData.length > 0 ? (
            restaurantData.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No restaurants found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
