import React, { useState, useEffect } from "react";
import { fetchSlotsByRestaurant, bookTable } from "../services/restaurants";
import { useLocation, useNavigate } from "react-router-dom";

const BookTable = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = location.state;

  const [availableDates, setAvailableDates] = useState([]);
  const [slotObjects, setSlotObjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [numOfPeople, setNumOfPeople] = useState(1);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const { dates, slotObjects } = await fetchSlotsByRestaurant(id);
        setAvailableDates(dates);
        setSlotObjects(slotObjects);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and a slot.");
      return;
    }

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Customer email not found in local storage.");
      return;
    }

    try {
      const bookingDetails = {
        customer_email: userEmail,
        restaurant_id: id,
        slot_id: selectedSlot.slot_id,
        num_of_people: parseInt(numOfPeople, 10),
      };
      const response = await bookTable(bookingDetails);
      alert(response.message || "Table booked successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message || "Error booking table");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Book a Table</h2>
        <form onSubmit={handleBooking}>
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select a Date
            </label>
            <div className="flex flex-wrap gap-2">
              {availableDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`py-2 px-4 border ${
                    selectedDate === date
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Slot Selection */}
          {selectedDate && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Select a Slot
              </label>
              <div className="flex flex-wrap gap-2">
                {slotObjects
                  .filter((slot) => slot.date === selectedDate)
                  .map((slot) => (
                    <button
                      key={slot.slot_id}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-4 border ${
                        selectedSlot?.slot_id === slot.slot_id
                          ? "bg-blue-500 text-white"
                          : "bg-white"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Number of People */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Number of People
            </label>
            <input
              type="number"
              min="1"
              value={numOfPeople}
              onChange={(e) => setNumOfPeople(e.target.value)}
              className="w-full border px-3 py-2"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Book Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookTable;
