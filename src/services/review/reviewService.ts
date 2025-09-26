import type { PullReviewsResponse, GetReviewsResponse } from "./types";
import axiosInstance from "../axiosInstance";

 
export const getReviews = async (): Promise<GetReviewsResponse> => {
  const response = await axiosInstance.get<GetReviewsResponse>("/api/reviews/", {

  });
  return response.data;
};

export const pullReviews = async (): Promise<PullReviewsResponse> => {
  const response = await axiosInstance.post<PullReviewsResponse>(
    "/api/reviews/pull/",

  );
  return response.data;
};
