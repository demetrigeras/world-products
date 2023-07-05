import api from "./apiConfig.js";
import axios from 'axios'

export const getCountries = async () => {
  try {
    const response = await api.get("/world");
    return response.data;
  } catch (error) {
    console.error(`Failed to get countries - error: ${error}`);
    throw error;
  }
};

export const getCountry = async (name) => {
  try {
    const response = await api.get(`/world/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get country - error: ${error}`);
    throw error;
  }
}