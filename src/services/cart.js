import api from "./apiConfig.js";

export const getCarts = async () => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    console.error(`Failed to get pledges - error: ${error}`);
    throw error;
  }
};

export const getCart = async (id) => {
    try {
      const response = await api.get(`/cart/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get charity - error: ${error}`);
      throw error;
    }
  }

export const createCart = async (pledge) => {
    try {
      const response = await api.post("/cart", pledge);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateCart = async (id, update) => {
    try {
      const response = await api.put(`/cart/${id}`, update);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteCart = async (id) => {
    try {
      const response = await api.delete(`/cart/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };