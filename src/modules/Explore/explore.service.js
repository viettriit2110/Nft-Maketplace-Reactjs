import axiosInstance from "../../utils/apiRequest";
import { API } from "../../config";

export const getListService = async (params) => {
  const {page, limit, element, sortBy} = params.payload
  const { data } = await axiosInstance.get(
    `${API}/marketplaces?page=${page}&limit=${limit}&element=${element}&sorted_by=${sortBy}`
  );
  return data;
};
