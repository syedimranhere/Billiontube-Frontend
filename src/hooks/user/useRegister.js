import React, { useState } from "react";
import { usersAPI } from "../../services/usersservice";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notificationcontext";
export const useRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    gender: "",
    country: "",
    fullname: "",
    password: "",

    avatar: "",
    agreed: false,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { showNotification } = useNotification();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullname ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.gender ||
      !formData.country ||
      !formData.avatar
    ) {
      showNotification("Please fill all the fields", false);
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("fullname", formData.fullname);
      form.append("email", formData.email);
      form.append("username", formData.username);
      form.append("password", formData.password);
      form.append("gender", formData.gender);
      form.append("country", formData.country);
      form.append("avatar", formData.avatar);

      await usersAPI.register(form);
      showNotification("Account created successfully - Login", true);
      navigate("/login");
    } catch (err) {
      setError(
        err.response.data.message ||
          "An error occurred while creating your account."
      );
      setLoading(false);
    }
  };

  const countries = [
    "United States 🇺🇸",
    "Canada 🇨🇦",
    "United Kingdom 🇬🇧",
    "Germany 🇩🇪",
    "France 🇫🇷",
    "Spain 🇪🇸",
    "Italy 🇮🇹",
    "Brazil 🇧🇷",
    "Mexico 🇲🇽",
    "Australia 🇦🇺",
    "Japan 🇯🇵",
    "Pakistan 🇵🇰",
    "India 🇮🇳",
    "Russia 🇷🇺",
    "China 🇨🇳",
  ];

  const genders = ["Male", "Female"];

  return {
    formData,
    loading,
    showPassword,
    error,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    countries,
    genders,
    setShowPassword,
  };
};
