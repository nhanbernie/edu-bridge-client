import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { filterTutorsEndpoint, getTutorSubjectsEndpoint } from "./endpoints/index";
import { searchTutorsEndpoint } from "./endpoints/searchTutors";

export const tutorApi = createApi({
  reducerPath: "tutorApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tutor", "TutorSubjects"],
  endpoints: (builder) => ({
    filterTutors: filterTutorsEndpoint(builder),
    searchTutors: searchTutorsEndpoint(builder),
    getTutorSubjects: getTutorSubjectsEndpoint(builder),
  }),
});

export const {
  useFilterTutorsQuery,
  useLazyFilterTutorsQuery,
  useSearchTutorsQuery,
  useLazySearchTutorsQuery,
  useGetTutorSubjectsQuery,
  useLazyGetTutorSubjectsQuery,
} = tutorApi;
