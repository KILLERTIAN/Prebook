import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Register a new restaurant
export const registerRestaurant = async (restaurantData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/restaurants/register`,
      restaurantData
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const addRestaurant = async (restaurantData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/restaurants/`,
      restaurantData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding restaurant:", error);
    throw error; // Propagate the error for further handling
  }
};

// Function to get 1 week from today's date
const getEndDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 7);
  return today.toISOString().split("T")[0]; // returns YYYY-MM-DD format
};

// Service for bulk-add tables
export const addTables = async (restaurantId, data) => {
  const url = `${API_BASE_URL}/restaurants/${restaurantId}/tables/bulk-add/`;
  // const data = [
  //   { capacity: 2, quantity: 2 },
  //   { capacity: 4, quantity: 2 },
  //   { capacity: 5, quantity: 2 },
  //   { capacity: 6, quantity: 3 }
  // ];

  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tables:", error);
    throw error;
  }
};

// Service for auto-creating slots
export const createSlots = async (restaurantId) => {
  const url = `${API_BASE_URL}/restaurants/${restaurantId}/slots/auto-create-multi/`;
  const data = {
    startDate: "2024-12-01",
    endDate: getEndDate(),
  };

  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating slots:", error);
    throw error;
  }
};
