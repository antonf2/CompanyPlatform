import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

  const handleCreateClick = () => {
    setCurrentUser({
      id: null,
      username: "",
      password: "",
      email: "",
      role: "User",
      isActive: true,
    });
    setIsEditing(false);
    setIsPopupOpen(true);
  };

  const handleEditClick = (user) => {
    setCurrentUser({
      id: user.id,
      username: user.username || "",
      password: user.password,
      email: user.email || "",
      role: user.role || "User",
      isActive: user.isActive !== undefined ? user.isActive : true,
    });
    setIsEditing(true);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentUser(null);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    if (!currentUser.username || !currentUser.email || !currentUser.role) {
      toast.error("Please fill in all required fields (Username, Email, Role).", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      if (isEditing) {
        await axios.put(
          `https://hackeruprojectapi.azurewebsites.net/api/User/${currentUser.id}`,
          JSON.stringify(currentUser),
          headers
        );
        setUsers(prevUsers => prevUsers.map(user => user.id === currentUser.id ? { ...user, ...currentUser } : user));
      } else {
        const response = await axios.post(
          "https://hackeruprojectapi.azurewebsites.net/api/User",
          JSON.stringify(currentUser),
          headers
        );
        setUsers(prevUsers => [...prevUsers, response.data]);
      }
      handleClosePopup();
      toast.success(isEditing ? "User updated successfully!" : "User created successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error("Failed to save user. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(err);
    }
  };


  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem("authToken");
    console.log(id);
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `https://hackeruprojectapi.azurewebsites.net/api/User/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
        );
        setUsers(prev => prev.filter(user => user.id !== id));
        setError(null);
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
