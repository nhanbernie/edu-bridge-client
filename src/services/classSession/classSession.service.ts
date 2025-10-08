import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { getStudentUpcomingSessionsEndpoint, getTutorUpcomingSessionsEndpoint } from "./endpoints";

export const classSessionApi = createApi({
  reducerPath: "classSessionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["StudentUpcomingSessions", "TutorUpcomingSessions"],
  endpoints: (builder) => ({
    getStudentUpcomingSessions: getStudentUpcomingSessionsEndpoint(builder),
    getTutorUpcomingSessions: getTutorUpcomingSessionsEndpoint(builder),
  }),
});

export const { useGetStudentUpcomingSessionsQuery, useGetTutorUpcomingSessionsQuery } =
  classSessionApi;
