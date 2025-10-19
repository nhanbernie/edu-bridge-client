import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { filterTutorsEndpoint } from "./endpoints/index";
import { searchTutorsEndpoint } from "./endpoints/searchTutors";

export const tutorApi = createApi({
  reducerPath: "tutorApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tutor"],
  endpoints: (builder) => ({
    filterTutors: filterTutorsEndpoint(builder),
    searchTutors: searchTutorsEndpoint(builder),
  }),
});

export const {
  useFilterTutorsQuery,
  useLazyFilterTutorsQuery,
  useSearchTutorsQuery,
  useLazySearchTutorsQuery,
} = tutorApi;
