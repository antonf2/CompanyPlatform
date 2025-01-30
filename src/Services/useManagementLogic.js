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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        toast.error("Failed to fetch users. Please try again.", { position: "top-center" });
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
        "Content-Type": "application/json",
      },
    };

    if (!currentUser.username || !currentUser.email || !currentUser.role) {
      toast.error("Please fill in all required fields (Username, Email, Role).", { position: "top-center" });
      return;
    }

    try {
      if (isEditing) {
        await axios.put(
          `https://hackeruprojectapi.azurewebsites.net/api/User/${currentUser.id}`,
          JSON.stringify(currentUser),
          headers
        );
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === currentUser.id ? { ...user, ...currentUser } : user)));
        toast.success("User updated successfully!", { position: "top-center" });
      } else {
        const response = await axios.post(
          "https://hackeruprojectapi.azurewebsites.net/api/User",
          JSON.stringify(currentUser),
          headers
        );
        setUsers((prevUsers) => [...prevUsers, response.data]);
        toast.success("User created successfully!", { position: "top-center" });
      }
      handleClosePopup();
    } catch (err) {
      toast.error("Failed to save user. Please try again.", { position: "top-center" });
      console.error(err);
    }
  };

  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`https://hackeruprojectapi.azurewebsites.net/api/User/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted successfully!", { position: "top-center" });
      setError(null);
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete user. Please try again.", { position: "top-center" });
      setError("Failed to delete user. Please try again.");
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
    handleCancel,
    isModalOpen,
    setIsModalOpen,
  };
};

export default useManagementLogic;
