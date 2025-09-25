// Slot type
export interface SlotDto {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

// Availability Block types
export interface AvailabilityBlockDto {
  blockId: string;
  tutorId: string;
  startTime: string;
  endTime: string;
  weekNumber: number;
  isRecurring: boolean;
  recurrenceWeeks: number;
  slots: SlotDto[] | null;
  createdAt: string;
  updatedAt: string | null;
}

// Availability Block Request types
export interface CreateAvailabilityBlockRequest {
  timeRanges: {
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }[];
  isRecurring: boolean;
  recurrenceWeeks: number;
}

export interface UpdateAvailabilityBlockRequest {
  startTime?: string;
  endTime?: string;
}

export interface GetAvailabilityBlocksRequest {
  tutorId?: string;
}

export interface DeleteAvailabilityBlockRequest {
  blockId: string;
}

// Availability Block Response types
export interface CreateAvailabilityBlockResponse {
  success: boolean;
  data: AvailabilityBlockDto[];
  message: string;
  errors: any[] | null;
}

export interface GetAvailabilityBlocksResponse {
  success: boolean;
  data: AvailabilityBlockDto[];
  message: string;
  errors: any[] | null;
}

export interface UpdateAvailabilityBlockResponse {
  success: boolean;
  data: AvailabilityBlockDto;
  message: string;
  errors: any[] | null;
}

export interface DeleteAvailabilityBlockResponse {
  success: boolean;
  data: AvailabilityBlockDto;
  message: string;
  errors: any[] | null;
}
