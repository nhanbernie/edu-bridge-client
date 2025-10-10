import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api/baseQuery";
import { getTutorFeedbacksEndpoint } from "./endpoints/getTutorFeedbacks";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery,
  tagTypes: ["TutorFeedbacks", "CourseFeedbacks"],
  endpoints: (builder) => ({
    getTutorFeedbacks: getTutorFeedbacksEndpoint(builder),
  }),
});

export const { useGetTutorFeedbacksQuery, useLazyGetTutorFeedbacksQuery } = feedbackApi;
