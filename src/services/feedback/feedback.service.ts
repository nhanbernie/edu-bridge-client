import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  createFeedbackEndpoint,
  getTutorRatingEndpoint,
  getCourseRatingEndpoint,
  getTutorFeedbacksEndpoint,
} from "./endpoints";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Feedback", "TutorRating", "CourseRating", "TutorFeedbacks"],
  endpoints: (builder) => ({
    createFeedback: createFeedbackEndpoint(builder),
    getTutorRating: getTutorRatingEndpoint(builder),
    getCourseRating: getCourseRatingEndpoint(builder),
    getTutorFeedbacks: getTutorFeedbacksEndpoint(builder),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetTutorRatingQuery,
  useGetCourseRatingQuery,
  useGetTutorFeedbacksQuery,
} = feedbackApi;
