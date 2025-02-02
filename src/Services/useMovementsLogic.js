import axios from 'axios';

const API_URL = 'https://hackeruprojectapi.azurewebsites.net/api/InventoryMovement';

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getMovements = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory movements:', error);
    }
};

export const saveMovement = async (movementData) => {
    try {
        const response = await axios.post(API_URL, movementData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error saving inventory movement:", error);
        return null;
    }
};

