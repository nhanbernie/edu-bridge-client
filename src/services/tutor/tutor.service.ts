import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { filterTutorsEndpoint } from "./endpoints/index";

export const tutorApi = createApi({
  reducerPath: "tutorApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tutor"],
  endpoints: (builder) => ({
    filterTutors: filterTutorsEndpoint(builder),
  }),
});

export const { useFilterTutorsQuery, useLazyFilterTutorsQuery } = tutorApi;
