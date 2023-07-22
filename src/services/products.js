import api from "./apiConfig.js";

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error(`Failed to get pledges - error: ${error}`);
    throw error;
  }
};

export const getProduct = async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get charity - error: ${error}`);
      throw error;
    }
  }

  export const getProductsByCountry = async (countryName) => {
    try {
      const response = await api.get(`/products/country/${countryName}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const createProduct = async (product) => {
    try {
      const response = await api.post("/products", product);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateProduct = async (id, update) => {
    try {
      const response = await api.put(`/products/${id}`, update);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // export const updateProductsByCountry = async (countryName, update) => {
  //   try {
  //     const response = await api.put(`/products/country/${countryName}`, update);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  export const deleteProduct = async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };