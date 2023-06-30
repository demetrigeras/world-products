import api from "./apiConfig.js";

export const getCountries = async () => {
  try {
    const response = await api.get("/world");
    return response.data;
  } catch (error) {
    console.error(`Failed to get charities - error: ${error}`);
    throw error;
  }
};

export const getCountry = async (id) => {
  try {
    const response = await api.get(`/world/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get charity - error: ${error}`);
    throw error;
  }
}