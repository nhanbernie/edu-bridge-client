export interface GetSubjectsResponse {
  success: boolean;
  message: string;
  data: string[];
  errors: any[] | null;
}

export interface GetSubjectsRequest {
  tutorId: string;
}

