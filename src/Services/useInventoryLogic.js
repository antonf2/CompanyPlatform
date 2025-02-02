import axios from "axios";
import { toast } from "react-toastify";
import { saveMovement } from "./useMovementsLogic";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://hackeruprojectapi.azurewebsites.net/api/Inventory";

const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return {};

    try {
        const decoded = jwtDecode(token);

        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            userId: decoded.unique_name,
        };
    } catch (error) {
        return {};
    }
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

        const headers = getAuthHeaders();
        const userId = headers.userId;
        await saveMovement({
            ItemId: response.data.name,
            UserId: userId,
            Action: "Created",
            QuantityChanged: itemData.quantity,
            Notes: "New inventory item added.",
        });

        return response.data;
    } catch (error) {
        console.error("Error creating item:", error);
        toast.error(error.response?.data?.message || "Failed to create item.", { position: "top-center" });
        throw new Error(error.response?.data?.message || "Failed to create item.");
    }
};

export const updateItem = async (id, itemData) => {
    try {
        const oldItem = await axios.get(`${API_URL}/${id}`, getAuthHeaders()); 
        const quantityDiff = itemData.quantity - oldItem.data.quantity;

        const response = await axios.put(`${API_URL}/${id}`, itemData, getAuthHeaders());
        toast.success("Item updated successfully!", { position: "top-center" });

        const headers = getAuthHeaders();
        const userId = headers.userId;
        await saveMovement({
            ItemId: itemData.name,
            UserId: userId,
            Action: quantityDiff > 0 ? "Added" : "Taken",
            QuantityChanged: Math.abs(quantityDiff),
            Notes: "Inventory item updated.",
        });

        return response.data;
    } catch (error) {
        console.error(`Error updating item with ID ${id}:`, error);
        toast.error(error.response?.data?.message || "Failed to update item.", { position: "top-center" });
        throw new Error(error.response?.data?.message || "Failed to update item.");
    }
};

export const deleteItem = async (id) => {
    try {
        const itemData = await axios.get(`${API_URL}/${id}`, getAuthHeaders());

        if (!itemData?.data) {
            toast.error("Item not found!", { position: "top-center" });
            throw new Error("Item does not exist.");
        }

        const headers = getAuthHeaders();
        const userId = headers.userId;
        await saveMovement({
            ItemId: itemData.data.name,
            UserId: userId,
            Action: "Removed",
            QuantityChanged: itemData.data.quantity,
            Notes: "Inventory item deleted.",
        });

        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        toast.success("Item deleted successfully!", { position: "top-center" });

    } catch (error) {
        console.error(`Error deleting item with ID ${id}:`, error);
        toast.error(error.response?.data?.message || "Failed to delete item.", { position: "top-center" });
        throw new Error(error.response?.data?.message || "Failed to delete item.");
    }
};

