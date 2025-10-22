import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  getStudentUpcomingSessionsEndpoint,
  getStudentHistorySessionsEndpoint,
  getTutorUpcomingSessionsEndpoint,
  getTutorHistorySessionsEndpoint,
  getTutorUpcomingSessionsByCourseEndpoint,
  getStudentScheduleEndpoint,
  joinSessionEndpoint,
} from "./endpoints";

export const classSessionApi = createApi({
  reducerPath: "classSessionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "StudentUpcomingSessions",
    "StudentHistorySessions",
    "TutorUpcomingSessions",
    "TutorHistorySessions",
    "TutorUpcomingSessionsByCourse",
    "StudentSchedule",
  ],
  endpoints: (builder) => ({
    getStudentUpcomingSessions: getStudentUpcomingSessionsEndpoint(builder),
    getStudentHistorySessions: getStudentHistorySessionsEndpoint(builder),
    getTutorUpcomingSessions: getTutorUpcomingSessionsEndpoint(builder),
    getTutorHistorySessions: getTutorHistorySessionsEndpoint(builder),
    getTutorUpcomingSessionsByCourse: getTutorUpcomingSessionsByCourseEndpoint(builder),
    getStudentSchedule: getStudentScheduleEndpoint(builder),
    joinSession: joinSessionEndpoint(builder),
  }),
});

export const {
  useGetStudentUpcomingSessionsQuery,
  useGetStudentHistorySessionsQuery,
  useGetTutorUpcomingSessionsQuery,
  useGetTutorHistorySessionsQuery,
  useGetTutorUpcomingSessionsByCourseQuery,
  useGetStudentScheduleQuery,
  useJoinSessionMutation,
} = classSessionApi;
