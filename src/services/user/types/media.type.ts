import { ApiResponse } from "@/services/api/type";

// Media types enum
export type MediaType = "Award" | "VideoIntro";

// Media item interface
export interface MediaItem {
  mediaId: string;
  tutorId: string;
  type: MediaType;
  title: string;
  filePath: string;
  createdAt: string;
  updatedAt: string | null;
}

// Upload media request
export interface UploadMediaRequest {
  tutorId: string;
  file: File;
  title: string;
  type: MediaType;
}

// Upload media response (single item for VideoIntro)
export type UploadMediaResponse = ApiResponse<MediaItem>;

// Get media response (array for Awards)
export type GetMediaResponse = ApiResponse<MediaItem[]>;
