import { useState, useEffect } from "react";
import axios from "axios";

const useManagementLogic = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://hackeruprojectapi.azurewebsites.net/api/User", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsPopupOpen(true);
  };

  const handleCreateClick = () => {
    setCurrentUser({
      username: "",
      password: "",
      email: "",
      role: "User",
      isActive: true,
    });
    setIsEditing(false);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentUser(null);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
  
    if (!currentUser.username || !currentUser.password || !currentUser.role) {
      setError("Please fill in all required fields (Username, Password, Role).");
      return;
    }
  
    try {
      if (isEditing) {
        await axios.put(
          `https://hackeruprojectapi.azurewebsites.net/api/User/${currentUser.username}`,
          currentUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "https://hackeruprojectapi.azurewebsites.net/api/User",
          currentUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      handleClosePopup();
    } catch (err) {
      setError("Failed to save user. Please try again.");
      console.error(err);
    }
  };
  

  const handleDeleteClick = async (username) => {
    const token = localStorage.getItem("authToken");
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `https://hackeruprojectapi.azurewebsites.net/api/User/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(prev => prev.filter(user => user.username !== username));
      } catch (err) {
        setError("Failed to delete user. Please try again.");
        console.error(err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  return {
    users,
    loading,
    error,
    currentUser,
    isPopupOpen,
    isEditing,
    handleEditClick,
    handleCreateClick,
    handleClosePopup,
    handleSave,
    handleDeleteClick,
    handleInputChange,
  };
};

export default useManagementLogic;
