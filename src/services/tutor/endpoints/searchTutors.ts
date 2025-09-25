import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { TutorSearchRequest, TutorSearchResponse } from "../type";

export const searchTutorsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<TutorSearchResponse, TutorSearchRequest>({
    query: (params) => {
      // Build query string from params
      const searchParams = new URLSearchParams();
      
      // Add simple params
      if (params.MinHourlyRate !== undefined) {
        searchParams.append("MinHourlyRate", params.MinHourlyRate.toString());
      }
      if (params.MaxHourlyRate !== undefined) {
        searchParams.append("MaxHourlyRate", params.MaxHourlyRate.toString());
      }
      if (params.Grades) {
        searchParams.append("Grades", params.Grades);
      }
      if (params.MinRating !== undefined) {
        searchParams.append("MinRating", params.MinRating.toString());
      }
      if (params.HoursPerSession) {
        searchParams.append("HoursPerSession", params.HoursPerSession);
      }
      if (params.PageNumber !== undefined) {
        searchParams.append("PageNumber", params.PageNumber.toString());
      }
      if (params.PageSize !== undefined) {
        searchParams.append("PageSize", params.PageSize.toString());
      }
      
      // Handle array params (Subjects)
      if (params.Subjects && params.Subjects.length > 0) {
        params.Subjects.forEach(subject => {
          searchParams.append("Subjects", subject);
        });
      }

      return {
        url: `/api/tutor/search?${searchParams.toString()}`,
        method: "GET",
      };
    },
    providesTags: ["Tutor"],
    transformResponse: (response: TutorSearchResponse) => {
      console.log("🔍 Tutor search response:", response);
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("❌ Tutor search error:", response);
      return response;
    },
  });
