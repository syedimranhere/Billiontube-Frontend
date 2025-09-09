import { UseUserContext } from "../../context/AuthContext";
import { useNotification } from "../../context/notificationcontext";
import { useState, useRef, useEffect } from "react";
import { usersAPI } from "../../services/usersservice";

export const useAccountSettings = () => {
  const { showNotification } = useNotification();
  const { user, updateUser } = UseUserContext(); // Assuming you have updateUser function

  const [pfploading, setpfploading] = useState(false);
  const [settingit, setsettingit] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    fullname: "",
    profilePicture: "",
    passwordUpdatedAt: "",
  });

  const [error, seterror] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editMode, setEditMode] = useState({
    username: false,
    fullname: false,
    password: false,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.username || "",
        email: user.email || "",
        fullname: user.fullname || "",
        profilePicture: user.avatar || "",
      });
    }
  }, [user]);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    setpfploading(true);
    const file = e.target.files[0];

    if (file) {
      // Store original profile picture URL in case of error
      const originalProfilePicture = userInfo.profilePicture;

      const formDataToSend = new FormData();
      formDataToSend.append("avatar", file);

      try {
        // Wait for the API call to complete
        const response = await usersAPI.uploadPFP(formDataToSend);

        // Only update the UI after successful upload
        const newProfilePictureUrl = response.avatar;

        if (newProfilePictureUrl) {
          setUserInfo((prev) => ({
            ...prev,
            profilePicture: newProfilePictureUrl,
          }));

          // Update the global user context if available
          if (updateUser) {
            updateUser({ ...user, avatar: newProfilePictureUrl });
          }

          showNotification("Profile picture updated successfully", true);
        } else {
          // If no new URL in response, create local URL for immediate feedback
          const fileURL = URL.createObjectURL(file);
          setUserInfo((prev) => ({
            ...prev,
            profilePicture: fileURL,
          }));
          showNotification("Profile picture updated successfully", true);
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);

        // Revert to original profile picture on error
        setUserInfo((prev) => ({
          ...prev,
          profilePicture: originalProfilePicture,
        }));

        showNotification(
          error.response?.data?.message || "Failed to update profile picture",
          false
        );
      }
    }

    setpfploading(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUsernameSubmit = async () => {
    setsettingit(true);
    try {
      await usersAPI.changeUsername(formData.username);

      setUserInfo((prev) => ({
        ...prev,
        username: formData.username,
      }));

      // Update global user context
      if (updateUser) {
        updateUser({ ...user, username: formData.username });
      }

      setEditMode((prev) => ({ ...prev, username: false }));
      showNotification("Username changed", true);
    } catch (error) {
      console.error("Error updating username:", error);
      showNotification(
        error.response?.data?.message || "Username Already Exists",
        false
      );
    }
    setsettingit(false);
  };

  const handleFullnameSubmit = async () => {
    setsettingit(true);
    try {
      await usersAPI.changeFullname(formData.fullname);

      setUserInfo((prev) => ({
        ...prev,
        fullname: formData.fullname,
      }));

      // Update global user context
      if (updateUser) {
        updateUser({ ...user, fullname: formData.fullname });
      }

      setEditMode((prev) => ({ ...prev, fullname: false }));
      showNotification("Fullname changed", true);
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Invalid Fullname",
        false
      );
    }
    setsettingit(false);
  };

  const handlePasswordSubmit = async () => {
    seterror("");

    if (formData.newPassword !== formData.confirmPassword) {
      seterror("Passwords do not match");
      return;
    }

    setsettingit(true);

    try {
      await usersAPI.changePassword({
        oldpass: formData.currentPassword,
        newpass: formData.newPassword,
      });

      showNotification("Password changed successfully", true);

      setEditMode((prev) => ({ ...prev, password: false }));
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error(error.response);
      seterror(error.response?.data?.message || "Error changing password");
    }

    setsettingit(false);
  };

  const handleCancel = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
    setFormData((prev) => ({
      ...prev,
      username: userInfo.username,
      fullname: userInfo.fullname,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    seterror(""); // Clear any errors when canceling
  };

  return {
    pfploading,
    setpfploading,
    settingit,
    setsettingit,
    userInfo,
    setUserInfo,
    error,
    seterror,
    formData,
    setFormData,
    editMode,
    setEditMode,
    fileInputRef,
    handleProfilePictureClick,
    handleFileChange,
    handleUsernameSubmit,
    handleFullnameSubmit,
    handlePasswordSubmit,
    handleCancel,
    user,
  };
};
