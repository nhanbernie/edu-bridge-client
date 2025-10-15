import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { GetStudentUpcomingSessionsResponse, StudentUpcomingSessionsParams } from "../type";

export const getStudentScheduleEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetStudentUpcomingSessionsResponse, StudentUpcomingSessionsParams>({
    query: ({ studentId }) => ({
      url: API_ENDPOINTS.CLASS_SESSION.GET_STUDENT_SCHEDULE.replace("{studentId}", studentId),
      method: "GET",
    }),
    providesTags: ["StudentSchedule"],
  });
