import { UseUserContext } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersAPI } from "../../services/usersservice";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const { setAuthenticated, setUser } = UseUserContext();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoggingIn(true);

      const response = await usersAPI.login({
        username_or_email: formData.email,
        typedpassword: formData.password,
      });

      setAuthenticated(true);
      setUser(response.user);
      setLoggingIn(false);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      setLoggingIn(false);
    }
  };
  return {
    formData,
    error,
    showPassword,
    loggingIn,
    setShowPassword,
    handleInputChange,
    handleSubmit,
  };
};
