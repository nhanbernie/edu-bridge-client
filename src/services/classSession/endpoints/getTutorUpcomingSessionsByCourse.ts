import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { GetTutorUpcomingSessionsResponse } from "../type";

export interface TutorUpcomingSessionsByCourseParams {
  tutorId: string;
  courseId: string;
}

export const getTutorUpcomingSessionsByCourseEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetTutorUpcomingSessionsResponse, TutorUpcomingSessionsByCourseParams>({
    query: ({ tutorId, courseId }) => ({
      url: API_ENDPOINTS.CLASS_SESSION.GET_TUTOR_UPCOMING_SESSIONS_BY_COURSE.replace(
        "{tutorId}",
        tutorId
      ).replace("{courseId}", courseId),
      method: "GET",
    }),
    providesTags: ["TutorUpcomingSessionsByCourse"],
  });
