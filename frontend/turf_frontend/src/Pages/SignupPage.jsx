// src/Pages/SignupPage.jsx
import React, { useState } from "react";
import api from "../utils/api"; // Adjust the import path as needed
import "./SignupPage.css"; // Optional for styling

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    mobile_number: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(formData.mobile_number);
      const response = await api.post("/home/signup", formData);

      if (response.status === 201) {
        setSuccess(response.data);// Show success message from backend
        setError(""); // Clear error messages
        setFormData({
          email: "",
          username: "",
          password: "",
          mobile_number: "",
        });
    // Reset form
      } else {
        setError("Unexpected response from the server.");
        setSuccess("");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Email already exists.");
      } else {
        setError(err.response?.data || "An error occurred.");
      }
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
        />
        <label htmlFor="username">Username:</label>
        <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
        />
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
        />
        <label htmlFor="mobile">Mobile Number:</label>
        <input
            type="text"
            name="mobile_number"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
