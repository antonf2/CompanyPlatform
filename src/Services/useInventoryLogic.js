import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://hackeruprojectapi.azurewebsites.net/api/Inventory";

const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getAllItems = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        toast.error(error.response?.data?.message || "Failed to fetch items.", { position: "top-center" });
        throw new Error(error.response?.data?.message || "Failed to fetch items.");
    }
};

export const createItem = async (itemData) => {
    try {
        const response = await axios.post(API_URL, itemData, getAuthHeaders());
        toast.success("Item created successfully!", { position: "top-center" });
        return response.data;
    } catch (error) {
        console.error("Error creating item:", error);
        toast.error(error.response?.data?.message || "Failed to create item.", { position: "top-center" });
        throw new Error(error.response?.data?.message || "Failed to create item.");
    }
};

export const updateItem = async (id, itemData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, itemData, getAuthHeaders());
        toast.success("Item updated successfully!", { position: "top-center" });
        return response.data;
    } catch (error) {
        console.error(`Error updating item with ID ${id}:`, error);
        toast.error(error.response?.data?.message || "Failed to update item.", { position: "top-center" });
        throw new Error(error.response?.data?.message || "Failed to update item.");
    }
};

export const deleteItem = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        toast.success("Item deleted successfully!", { position: "top-center" });
    } catch (error) {
        console.error(`Error deleting item with ID ${id}:`, error);
        toast.error(error.response?.data?.message || "Failed to delete item.", { position: "top-center" });
        throw new Error(error.response?.data?.message || "Failed to delete item.");
    }
};
