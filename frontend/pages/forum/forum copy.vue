<template>
  <!-- Main Content -->
  <div class="flex-1">
    <!-- Hero Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="mb-6 md:mb-0 md:w-2/3">
          <h1 class="text-3xl font-bold mb-3">
            Nền tảng Hỏi & Đáp IT - ChoCode
          </h1>
          <p class="text-gray-600 mb-4">
            ChoCode là nơi kết nối, giao lưu, chia sẻ kiến thức IT
          </p>

          <ForumAskQuestion />
        </div>

        <div class="md:w-1/3">
          <img
            loading="lazy"
            src="~/assets/images/home/working.jpg"
            alt="Q&A Platform"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div
      class="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4"
    >
      <div class="w-full sm:w-64">
        <el-select
          v-model="selectedClass"
          placeholder="Chọn lớp:"
          class="w-full"
        >
          <el-option label="Tất cả" value="all"></el-option>
          <el-option label="Lớp 1" value="1"></el-option>
          <el-option label="Lớp 2" value="2"></el-option>
          <!-- Add more options as needed -->
        </el-select>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="bg-gray-800 text-white px-4 py-2 rounded-lg">
          Tất cả
        </button>
        <button class="bg-white text-gray-700 px-4 py-2 rounded-lg border">
          Đã trả lời
        </button>
        <button class="bg-white text-gray-700 px-4 py-2 rounded-lg border">
          Chưa có câu trả lời
        </button>
      </div>
    </div>

    <div class="text-gray-500 mb-4">1,023,426 câu hỏi</div>

    <!-- Questions List -->
    <div class="space-y-4">
      <!-- Question 1 -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex flex-col sm:flex-row sm:justify-between mb-2">
          <div class="flex items-center mb-2 sm:mb-0">
            <div class="relative">
              <img
                src="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-1/347853572_181660051156413_803340202436754467_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEzgwbrsE2X5xXrJ2ZnSyW78M6YPqnVZYPwzpg-qdVlg7sP5PDEkw84ztABOLANdjZ7efXdGA73UgMxstPWz7ow&_nc_ohc=tUNB1qnRqXgQ7kNvwET-G31&_nc_oc=AdnEPDaAovw-eS5SHEnG9K_tMd8h2H4_ZhkAFZbgFjWHY3aD6TqD4UokR8fstpLsLbNAxMsklTKA0Qd8zNXL0YBp&_nc_zt=24&_nc_ht=scontent.fdad2-1.fna&_nc_gid=GSMUW4sPGw6QDIsf1utUcA&oh=00_AfF-DOlFumPK0YM_-5IszutD-8mX-ZccMNnbpd22ABSwbQ&oe=680477A9"
                alt="Avatar"
                class="w-10 h-10 rounded-full"
              />
              <div
                class="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white"
              >
                1
              </div>
            </div>
            <div class="ml-3">
              <div class="font-medium">Phạm Quốc Việt</div>
              <div class="text-gray-500 text-sm">vài giây trước</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-700">NodeJS • 10d</span>
            <button>
              <Image class="h-5 w-5 text-gray-500" />
            </button>
            <button>
              <Bookmark class="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div class="mb-3">Cứu tuiiiiiiiii</div>

        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center space-x-3 mb-2 sm:mb-0">
            <button class="flex items-center text-gray-500">
              <ThumbsUp class="h-5 w-5 mr-1" />
              <span>0</span>
            </button>
            <button class="flex items-center text-gray-500">
              <ThumbsDown class="h-5 w-5" />
            </button>
          </div>
          <button
            class="border border-orange-500 text-orange-500 px-4 py-1 rounded-full w-full sm:w-auto"
          >
            Trả lời
          </button>
        </div>
      </div>

      <!-- Question 2 -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex flex-col sm:flex-row sm:justify-between mb-2">
          <div class="flex items-center mb-2 sm:mb-0">
            <div class="relative">
              <img
                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s480x480&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeELWX8buaslfwM-PmlFIGVSWt9TLzuBU1Ba31MvO4FTUGNb7XARBGmfzVS7u3jB3KiM9jnxkELzeZOtl9akDLX0&_nc_ohc=W7q9tlVoy3sQ7kNvwHrDd4j&_nc_oc=Adks1NWIKUk3F_imri5dPJTK6IfS5ReZpW3gzqC6mmb74vgrKfAY4LuoPxlqpjoLaPUA6w8XUAf6BX4zln0XQl8H&_nc_zt=24&_nc_ht=scontent.fdad1-3.fna&oh=00_AfEPPXfLeq8_uVYszfW8ZPgbMRNoui4eYbCGBm4-2i1fPg&oe=6825E3FA"
                alt="Avatar"
                class="w-10 h-10 rounded-full"
              />
              <div
                class="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white"
              >
                1
              </div>
            </div>
            <div class="ml-3">
              <div class="font-medium">Nguyễn Quang Kính</div>
              <div class="text-gray-500 text-sm">1 phút trước</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-700">NestJS • 10d</span>
            <button>
              <Bookmark class="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div class="mb-3">Cho mình hỏi JWT là gì ạ?</div>

        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center space-x-3 mb-2 sm:mb-0">
            <button class="flex items-center text-gray-500">
              <ThumbsUp class="h-5 w-5 mr-1" />
              <span>0</span>
            </button>
            <button class="flex items-center text-gray-500">
              <ThumbsDown class="h-5 w-5" />
            </button>
          </div>
          <button
            class="border border-orange-500 text-orange-500 px-4 py-1 rounded-full w-full sm:w-auto"
          >
            Trả lời
          </button>
        </div>
      </div>

      <!-- Question 3 with answer -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex flex-col sm:flex-row sm:justify-between mb-2">
          <div class="flex items-center mb-2 sm:mb-0">
            <div class="relative">
              <img
                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s480x480&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeELWX8buaslfwM-PmlFIGVSWt9TLzuBU1Ba31MvO4FTUGNb7XARBGmfzVS7u3jB3KiM9jnxkELzeZOtl9akDLX0&_nc_ohc=W7q9tlVoy3sQ7kNvwHrDd4j&_nc_oc=Adks1NWIKUk3F_imri5dPJTK6IfS5ReZpW3gzqC6mmb74vgrKfAY4LuoPxlqpjoLaPUA6w8XUAf6BX4zln0XQl8H&_nc_zt=24&_nc_ht=scontent.fdad1-3.fna&oh=00_AfEPPXfLeq8_uVYszfW8ZPgbMRNoui4eYbCGBm4-2i1fPg&oe=6825E3FA"
                alt="Avatar"
                class="w-10 h-10 rounded-full"
              />
              <div
                class="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white"
              >
                1
              </div>
            </div>
            <div class="ml-3">
              <div class="font-medium">Nguyễn Thanh Triều</div>
              <div class="text-gray-500 text-sm">1 phút trước</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-700">NextJS • 10d</span>
            <button>
              <Bookmark class="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div class="mb-3">Zustand là gì vậy mn?</div>

        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center space-x-3 mb-2 sm:mb-0">
            <button class="flex items-center text-gray-500">
              <ThumbsUp class="h-5 w-5 mr-1" />
              <span>0</span>
            </button>
            <button class="flex items-center text-gray-500">
              <ThumbsDown class="h-5 w-5" />
            </button>

            <div class="flex items-center ml-3">
              <img
                src="https://randomuser.me/api/portraits/men/62.jpg"
                alt="Answerer"
                class="w-6 h-6 rounded-full"
              />
              <span class="text-gray-500 text-sm ml-1">1 trả lời</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div class="bg-blue-50 text-primary px-3 py-1 rounded-lg text-sm">
              <span>Nhãn giống cây trồng</span>
            </div>
            <button
              class="border border-orange-500 text-orange-500 px-4 py-1 rounded-full w-full sm:w-auto"
            >
              Trả lời
            </button>
          </div>
        </div>
      </div>

      <!-- Question 4 -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex flex-col sm:flex-row sm:justify-between mb-2">
          <div class="flex items-center mb-2 sm:mb-0">
            <div class="relative">
              <img
                src="https://randomuser.me/api/portraits/men/62.jpg"
                alt="Avatar"
                class="w-10 h-10 rounded-full"
              />
              <div
                class="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white"
              >
                2
              </div>
            </div>
            <div class="ml-3">
              <div class="font-medium">Mỹ Giang</div>
              <div class="text-gray-500 text-sm">2 phút trước</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-700">Tiếng Anh • Lớp 8 • 10d</span>
            <button>
              <Bookmark class="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div class="mb-3">[Question content would go here]</div>

        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center space-x-3 mb-2 sm:mb-0">
            <button class="flex items-center text-gray-500">
              <ThumbsUp class="h-5 w-5 mr-1" />
              <span>0</span>
            </button>
            <button class="flex items-center text-gray-500">
              <ThumbsDown class="h-5 w-5" />
            </button>
          </div>
          <button
            class="border border-orange-500 text-orange-500 px-4 py-1 rounded-full w-full sm:w-auto"
          >
            Trả lời
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Grid,
  ChevronRight,
  Image,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
} from "lucide-vue-next";
import type { PostCreateResponseDto } from "~/auto_api";
const posts = ref< PostCreateResponseDto[] | null >(null);
const response = await postService.postControllerFindAll(2, 1);
posts.value = response.data;

const selectedClass = ref("all");
</script>
