import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

// Service to fetch slots by restaurant ID
export const fetchSlotsByRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/restaurants/${restaurantId}/slots/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const today = new Date().toISOString().split("T")[0];
    const slots = response.data.filter((slot) => slot.date >= today);

    const dates = [...new Set(slots.map((slot) => slot.date))];
    const slotObjects = slots.map(({ id, time, date }) => ({
      date: date,
      slot_id: id,
      time,
    }));

    return { dates, slotObjects };
  } catch (error) {
    throw new Error("Error fetching slots");
  }
};

export const bookTable = async (bookingDetails) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/restaurants/${bookingDetails.restaurant_id}/slots/${bookingDetails.slot_id}/book-api/`,
      bookingDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error booking table");
  }
};
