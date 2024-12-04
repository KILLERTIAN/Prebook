import React, { useState, useEffect } from "react";
import { bookTable } from "../services/bookings";
import axios from "axios";

const BookTable = () => {
  const [formData, setFormData] = useState({
    restaurant_name: "",
    slot_time: "",
    people: 1,
    customer_name: "",
    date: "",
  });
  const [restaurantData, setRestaurantData] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(
          "https://restro-api-33n2.onrender.com/restaurants/1"
        );
        setRestaurantData(response.data);
        setDisabledDates(getDisabledDays(response.data.working_days));
        setFormData((prev) => ({
          ...prev,
          restaurant_name: response.data.name,
        }));
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurantData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and a time slot.");
      return;
    }
    try {
      const response = await bookTable({ ...formData, date: selectedDate, slot_time: selectedSlot });
      alert(response.message || "Table booked successfully!");
    } catch (error) {
      alert(error.message || "Error booking table");
    }
  };

  const getDisabledDays = (workingDays) => {
    const allDays = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];
    return allDays.filter((day) => !workingDays.includes(day));
  };

  const generateWeekDates = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        isoDate: date.toISOString().split("T")[0],
        displayDate: date.toLocaleDateString("en-US", {
          weekday: "short",
          // month: "short",
          day: "numeric",
        }),
        dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
      };
    });
  };

  const availableDates = generateWeekDates();

  return (
    <div className="relative bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg')`,
          filter: "blur(10px)",
        }}
      ></div>

      <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-lg w-full z-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Book a Table
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select a Date
            </label>
            <div className="flex flex-wrap gap-2">
              {availableDates.map(({ isoDate, displayDate, dayName }) => (
                <button
                  key={isoDate}
                  type="button"
                  onClick={() => setSelectedDate(isoDate)}
                  disabled={disabledDates.includes(dayName)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedDate === isoDate
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } ${
                    disabledDates.includes(dayName)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-400"
                  }`}
                >
                  {displayDate}
                </button>
              ))}
            </div>
          </div>

          {/* Slot Selection */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a Time Slot
              </label>
              <div className="flex flex-wrap gap-2">
                {restaurantData?.time_slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSlot === slot
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } hover:bg-green-400`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Number of People */}
          <div>
            <label
              htmlFor="people"
              className="block text-sm font-medium text-gray-700"
            >
              Number of People
            </label>
            <input
              id="people"
              name="people"
              type="number"
              min="1"
              max="20"
              value={formData.people}
              onChange={(e) =>
                setFormData({ ...formData, people: e.target.value })
              }
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Customer Name */}
          <div>
            <label
              htmlFor="customer_name"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>
            <input
              id="customer_name"
              name="customer_name"
              type="text"
              value={formData.customer_name}
              onChange={(e) =>
                setFormData({ ...formData, customer_name: e.target.value })
              }
              placeholder="Enter your name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Book Table
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTable;
