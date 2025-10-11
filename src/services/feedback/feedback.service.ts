import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api/baseQuery";
import { getTutorFeedbacksEndpoint } from "./endpoints/getTutorFeedbacks";
import { createFeedbackEndpoint } from "./endpoints/createFeedback";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery,
  tagTypes: ["TutorFeedbacks", "CourseFeedbacks", "Feedback", "TutorRating", "CourseRating"],
  endpoints: (builder) => ({
    getTutorFeedbacks: getTutorFeedbacksEndpoint(builder),
    createFeedback: createFeedbackEndpoint(builder),
  }),
});

export const {
  useGetTutorFeedbacksQuery,
  useLazyGetTutorFeedbacksQuery,
  useCreateFeedbackMutation,
} = feedbackApi;
