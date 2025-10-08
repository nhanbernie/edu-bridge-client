import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  getStudentUpcomingSessionsEndpoint,
  getTutorUpcomingSessionsEndpoint,
  getTutorUpcomingSessionsByCourseEndpoint,
  getStudentScheduleEndpoint,
  joinSessionEndpoint,
} from "./endpoints";

export const classSessionApi = createApi({
  reducerPath: "classSessionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "StudentUpcomingSessions",
    "TutorUpcomingSessions",
    "TutorUpcomingSessionsByCourse",
    "StudentSchedule",
  ],
  endpoints: (builder) => ({
    getStudentUpcomingSessions: getStudentUpcomingSessionsEndpoint(builder),
    getTutorUpcomingSessions: getTutorUpcomingSessionsEndpoint(builder),
    getTutorUpcomingSessionsByCourse: getTutorUpcomingSessionsByCourseEndpoint(builder),
    getStudentSchedule: getStudentScheduleEndpoint(builder),
    joinSession: joinSessionEndpoint(builder),
  }),
});

export const {
  useGetStudentUpcomingSessionsQuery,
  useGetTutorUpcomingSessionsQuery,
  useGetTutorUpcomingSessionsByCourseQuery,
  useGetStudentScheduleQuery,
  useJoinSessionMutation,
} = classSessionApi;
