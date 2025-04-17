import type { CommentAllResponse, User } from "~/auto_api";
import type { JobPostingResponseDtoUpdate } from "./job.interface";

export interface UpdateUserDto extends User {
  username: string;
  bio?: string;
  address?: string;
  level?: string;
  score?: string;
  job?: string;
  created_at: string;
  active: boolean;
  jobPostings: [JobPostingResponseDtoUpdate];
  comments: [CommentAllResponse];
  posts?: [];
  feelings?: [];
}
