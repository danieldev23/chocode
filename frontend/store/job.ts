import { defineStore } from "pinia";
import type { JobPostingResponseDto } from "~/auto_api";
import { jobPostingService } from "~/utils/api.utils";


export const useJobStore = defineStore("job", {
  state: () => ({
    jobs: [] as JobPostingResponseDto[], 
  }),

  actions: {
    async fetchJobs() {
      try {
        const response = await jobPostingService.jobPostControllerFindAll();
        // If response is already the array of jobs
        if (Array.isArray(response.data)) {
          this.jobs = response.data;
          console.log("[SERVER] Jobs:", JSON.stringify(this.jobs, null, 2));
        } 
        // If response has a data property containing the array
        else if (response.data && Array.isArray(response.data)) {
          this.jobs = response.data;
          console.log("[SERVER] Jobs:", JSON.stringify(this.jobs, null, 2));
        }
        // Fallback
        else {
          console.error("Unexpected API response format:", response);
          this.jobs = [];
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        this.jobs = [];
      }
    },
  },
});