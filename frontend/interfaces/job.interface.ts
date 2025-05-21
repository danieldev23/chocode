import type { JobPostingResponseDto } from "~/auto_api/models";

export interface JobPostingResponseDtoUpdate extends JobPostingResponseDto {
  image: string;
  user: {
    username: string;
    fullName: string;
    avatar: string;
  };
}