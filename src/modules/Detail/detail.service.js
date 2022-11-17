import axiosInstance from "../../utils/apiRequest";
import { API } from "../../config";

export const getNFTDetailService = async (id) => {
  const { data } = await axiosInstance.get(`${API}/marketplaces/${id}`);
  return data.data;
};

export const getNFTTransaction = async (nft_id) => {
  const { data } = await axiosInstance.get(
    `${API}/transactions?nft_id=${nft_id}`
  );
  return data.data;
};
