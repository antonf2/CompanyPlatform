import axios from "axios";

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
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};

export const createItem = async (itemData) => {
    const response = await axios.post(API_URL, itemData, getAuthHeaders());
    return response.data;
};

export const updateItem = async (id, itemData) => {
    const response = await axios.put(`${API_URL}/${id}`, itemData, getAuthHeaders());
    return response.data;
};

export const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
