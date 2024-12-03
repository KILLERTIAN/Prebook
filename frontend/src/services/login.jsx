import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerOrLogin = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register-or-login/`, {
      email,
      password,
      role,
    });

    // Destructure the response to get the email, id, role, and message
    const {
      email: responseEmail,
      id,
      role: responseRole,
      message,
    } = response.data;

    // Store user data in localStorage if login/register is successful
    localStorage.setItem("userEmail", responseEmail);
    localStorage.setItem("userId", id);
    localStorage.setItem("userRole", responseRole);

    console.log(message); // Optionally log the success message or handle it as needed

    return { email: responseEmail, id, role: responseRole }; // Return user data for further use
  } catch (error) {
    // Handle error (for example, showing an error message to the user)
    console.error(
      "Error during login/register:",
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error to be handled by the caller
  }
};
