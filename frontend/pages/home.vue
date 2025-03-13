<template>

  <HomeJobs />

  <!-- <HomeBanner /> -->
</template>
<script setup lang="ts">
import {
  MessageSquare,
  Store,
  BriefcaseBusiness,
  User,
  CircleCheckBig,
  ShieldCheck
} from "lucide-vue-next";
import { ArrowDown } from "@element-plus/icons-vue";

const currentUser = ref(false);
const centerDialogVisible = ref(false);
const showHotNews = ref(true);
const jobs = ref([
  {
    id: 1,
    title:
      "[Tuyển Freelancer] Phát triển Website Thuê Sách Trực Tuyến (Custom Code)",
    author: "Ninh Phan Trí",
    location: "TP. Hồ Chí Minh",
    category: "Lập trình web",
    budget: "30.000.000 đ - 50.000.000 đ",
    deadline: "Hạn nhận hồ sơ: 16 giờ 56 phút",
    description:
      "Tôi đang tìm kiếm một freelancer chuyên nghiệp để phát triển website dịch vụ thuê sách trực tuyến dựa trên mô hình kinh doanh đã có. Website cần được thiết kế tùy chỉnh để đáp ứng các yêu cầu đặc thù...",
    skills: [
      "Xây dựng website thương mại điện tử",
      "CSS",
      "HTML",
      "Java",
      "Javascript",
      "MongoDB",
      "MySQL",
      "Node.js",
      "Laravel",
      "PostgreSQL",
    ],
    link: "/post/123",
    detailsLink: "post",
  },
  {
    id: 2,
    title: "Làm web theo mẫu trên mạng",
    author: "Hoàng Trung Nam",
    location: "TP. Hồ Chí Minh",
    category: "Lập trình web",
    budget: "5.000.000 đ - 15.000.000 đ",
    deadline: "Hạn nhận hồ sơ: 22 ngày 10 giờ",
    description:
      "Làm web theo mẫu trên mạng tương tự với website: https://credent.net/...",
    skills: ["Phát triển ứng dụng web", ".NET"],
    link: "/post/1234",
    detailsLink: "post",
  },
]);
</script>
