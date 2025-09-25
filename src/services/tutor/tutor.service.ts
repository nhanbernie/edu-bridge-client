import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { searchTutorsEndpoint } from "./endpoints/index";

export const tutorApi = createApi({
  reducerPath: "tutorApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tutor"],
  endpoints: (builder) => ({
    searchTutors: searchTutorsEndpoint(builder),
  }),
});

export const { useSearchTutorsQuery, useLazySearchTutorsQuery } = tutorApi;
