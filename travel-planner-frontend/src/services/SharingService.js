import axios from "axios"
import { GetValueByKey } from "../helpers/LocalStorage"
import { SHARING_API_URL } from "../helpers/ApiConfig";

const getAuthHeaders = () => {
    const token = GetValueByKey("authToken");
    
    if (!token || token === "null" || token === "undefined") {
        return {};
    }
    
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export async function CreateShareLink(planId, accessType, expiresInDays = 7) {
  try {
    const res = await axios.post(`${SHARING_API_URL}`, {
      planId,
      accessType,
      expiresInDays
    });
        return res.data;
  } catch (error) {
    throw new Error("Greška pri kreiranju linka: " + (error.response?.data?.message || error.message));
  }
}

export async function ValidateShareToken(token){
    try{
        const res = await axios.get(`${SHARING_API_URL}/${token}/validate`);
        return res.data;
    } catch (error){
        console.error(error);
        throw error;
    }
}

export async function RevokeShareLink(token){
    try{
        const res = await axios.delete(`${SHARING_API_URL}/${token}`, getAuthHeaders());
        return res.data;
    } catch (error){
        console.error(error);
        throw error;
    }
}