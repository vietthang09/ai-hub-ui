 import axios from "axios";
import axiosInstance from "../axiosInstance";
import type {
   PullReviewsResponse,
  GetReviewsResponse,
  Review,
} from "./types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

 
export const getReviews = async (): Promise<any> => {
  const {data} = await axios.get<any>(`${BASE_URL}/api/reviews`);
  console.log(data)
  return data;
}

 export const pullReviews = async (): Promise<PullReviewsResponse> => {
  const { data } = await axiosInstance.post<PullReviewsResponse>(
    "/api/reviews/pull"
  );
  return data;
};
