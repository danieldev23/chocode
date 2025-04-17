import { UpdateJobPostingDto } from "~/auto_api";
import { JobPostingResponseDtoUpdate } from "~/interfaces/job.interface";
import { jobPostingService } from "~/utils/api.utils";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const response = await jobPostingService.jobPostControllerFindAll();
  const data = (response as any).data?.data as JobPostingResponseDtoUpdate;
  return data;
});
