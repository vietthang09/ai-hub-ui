 export interface Reviewer {
  name: string;
  profile_photo: object
}

export interface Review extends Reviewer {
  external_id: string;
  rating: number;
  content: string;
  created_at: string;
}

export interface PullReviewsResponse {
  success: boolean;
  saved_count: number;
  skipped_count: number;
  total_count: number;
}

export interface GetReviewsResponse {
  success: boolean;
  total_count: number;
  reviews: Review[];
}
