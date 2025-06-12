<template>
  <div class="max-w-5xl mx-auto mt-8">
    <div class="text-center mb-10">
      <div
        class="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center text-nowrap"
      >
        Các công việc mới nhất
        <img class="h-6" src="~/assets/images/post/new.gif" alt="New" />
      </div>
    </div>

    <div class="space-y-6">
      <div
        v-for="job in jobs"
        :key="job.id"
        class="group bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg border border-gray-100"
      >
        <!-- Header Section -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <NuxtLink
              class="inline-block group-hover:text-primary transition-colors duration-200"
            >
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {{ job.title }}
              </h3>
            </NuxtLink>
            <div class="flex items-center gap-2 text-gray-600">
              <div class="flex items-center">
                <el-avatar :size="24" class="mr-2">
                  {{ job.author.charAt(0) }}
                </el-avatar>
                <span class="font-medium">{{ job.author }}</span>
              </div>
              <span class="text-gray-400">•</span>
              <span class="text-sm">{{ job.location }}</span>
            </div>
          </div>

          <div class="text-right">
            <div class="text-lg font-bold text-primary mb-1">
              {{ job.budget }}
            </div>
            <div class="text-sm text-gray-500">
              Deadline: {{ job.deadline }}
            </div>
          </div>
        </div>

        <!-- Category and Verification -->
        <div class="flex items-center gap-4 mb-4">
          <span
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
          >
            <el-icon><Folder /></el-icon>
            {{ job.category }}
          </span>
          <span class="inline-flex items-center gap-1 text-sm text-green-600">
            <el-icon><Check /></el-icon>
            Verified Client
          </span>
        </div>

        <!-- Description -->
        <div class="relative mb-4">
          <p class="text-gray-600 line-clamp-2">
            {{ job.description }}
          </p>
          <NuxtLink
            :to="job.detailsLink"
            class="text-primary hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1 mt-2"
          >
            View Details
            <el-icon><ArrowRight /></el-icon>
          </NuxtLink>
        </div>

        <!-- Skills and Actions -->
        <div class="flex items-center justify-between">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in job.skills"
              :key="index"
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200',
                index === 0
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              {{ skill }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <el-button type="info" plain size="small" @click="saveJob(job)">
              <el-icon><Star /></el-icon>
              Save
            </el-button>
            <el-button type="primary" size="small" @click="applyJob(job)">
              Apply Now
            </el-button>
          </div>
        </div>

        <!-- Engagement Metrics -->
        <div
          class="flex items-center gap-4 mt-4 pt-4 border-t text-sm text-gray-500"
        >
          <span class="flex items-center gap-1">
            <el-icon><View /></el-icon>
            {{ Math.floor(Math.random() * 100) + 20 }} views
          </span>
          <span class="flex items-center gap-1">
            <el-icon><User /></el-icon>
            {{ Math.floor(Math.random() * 20) + 5 }} proposals
          </span>
          <span class="flex items-center gap-1">
            <el-icon><Clock /></el-icon>
            Posted {{ Math.floor(Math.random() * 24) + 1 }}h ago
          </span>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div class="text-center mt-8">
      <el-button type="primary" plain> Load More Opportunities </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  Folder,
  Check,
  Star,
  View,
  User,
  Clock,
} from "@element-plus/icons-vue";

interface Job {
  id: number;
  title: string;
  author: string;
  location: string;
  category: string;
  budget: string;
  deadline: string;
  description: string;
  skills: string[];
  link: string;
  detailsLink: string;
}

defineProps<{
  jobs: Job[];
}>();

const saveJob = (job: Job) => {
  console.log("Saving job:", job.id);
};

const applyJob = (job: Job) => {
  console.log("Applying for job:", job.id);
};
</script>

<style scoped>
.group:hover {
  transform: translateY(-1px);
}
</style>
