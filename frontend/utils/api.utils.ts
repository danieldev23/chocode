import { AuthApi, CategoryApi, PostApi, UserApi, JobPostingApi } from "~/auto_api";

export const authService = new AuthApi();
export const postService = new PostApi();
export const userService = new UserApi();
export const categoryService = new CategoryApi();
export const jobPostingService = new JobPostingApi();