import axiosInstance from "../../utils/apiRequest";
import { API } from "../../config";

export const getUserProfileService = async () => {
  const { data } = await axiosInstance.get(`${API}/profile`);
  try {
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot get your profile information");
  }
};

export const getUserNFTService = async (userId, params) => {
  const {page, limit, element} = params
  const { data } = await axiosInstance.get(`${API}/users/${userId}/nfts?page=${page}&limit=${limit}&element=${element}`);
  try {
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot get your NFTs");
  }
};

export const updateUserService = async (userData) => {
  const { data } = await axiosInstance.put(`${API}/profile`, {
    ...userData,
  });
  try {
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot get your profile information");
  }
};
