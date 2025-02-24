<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative h-[50vh] bg-gradient-to-r from-gray-900 to-gray-800">
      <div class="absolute inset-0 opacity-20 rounded-lg">
        <div class="h-full w-full " style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMzAgMEwwIDMwaDYwTDMwIDB6TTMwIDYwTDAgMzBoNjBMMzAgNjB6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+'); background-repeat: repeat;"></div>
      </div>
      <div class="absolute inset-0 flex items-center justify-center text-white px-4">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Code Market Hub</h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover quality source code, websites, and academic projects
          </p>
          <el-input
            v-model="searchQuery"
            placeholder="Search for projects, source code, or specific technologies..."
            class="max-w-2xl mx-auto search-dark"
            :prefix-icon="Search"
            size="large"
          />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <el-select
            v-model="categoryFilter"
            placeholder="Project Type"
            size="large"
            class="w-full"
          >
            <el-option label="All Types" value="" />
            <el-option label="Website Templates" value="website" />
            <el-option label="Academic Projects" value="academic" />
            <el-option label="Scripts & Tools" value="scripts" />
            <el-option label="Mobile Apps" value="mobile" />
            <el-option label="APIs & Backend" value="backend" />
          </el-select>

          <el-select
            v-model="techFilter"
            placeholder="Technology"
            size="large"
            class="w-full"
          >
            <el-option label="All Technologies" value="" />
            <el-option label="PHP" value="php" />
            <el-option label="Python" value="python" />
            <el-option label="JavaScript" value="javascript" />
            <el-option label="Java" value="java" />
            <el-option label="React" value="react" />
            <el-option label="Vue.js" value="vue" />
          </el-select>

          <el-select
            v-model="priceFilter"
            placeholder="Price Range"
            size="large"
            class="w-full"
          >
            <el-option label="All Prices" value="" />
            <el-option label="Under 500k" value="under_500" />
            <el-option label="500k - 1M" value="500_1m" />
            <el-option label="1M - 2M" value="1m_2m" />
            <el-option label="Over 2M" value="over_2m" />
          </el-select>

          <el-select
            v-model="sortBy"
            placeholder="Sort By"
            size="large"
            class="w-full"
          >
            <el-option label="Newest" value="newest" />
            <el-option label="Most Popular" value="popular" />
            <el-option label="Price: Low to High" value="price_asc" />
            <el-option label="Price: High to Low" value="price_desc" />
          </el-select>
        </div>
      </div>

      <!-- Project Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <!-- Project Preview -->
          <div class="relative h-56">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent">
              <div class="absolute bottom-4 left-4 right-4">
                <div class="flex gap-2 mb-2">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold mb-1 line-clamp-2">{{ project.title }}</h3>
                <p class="text-gray-500 text-sm">{{ project.type }}</p>
              </div>
              <span class="text-xl font-bold text-blue-600">{{ formatPrice(project.price) }}</span>
            </div>

            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ project.description }}</p>

            <div class="border-t pt-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <el-icon><Download /></el-icon>
                  <span class="text-sm text-gray-500">{{ project.downloads }}+ downloads</span>
                </div>
                <div class="flex items-center gap-2">
                  <el-rate
                    v-model="project.rating"
                    disabled
                    size="small"
                    text-color="#ff9900"
                  />
                  <span class="text-sm text-gray-500">({{ project.reviews }})</span>
                </div>
              </div>
            </div>

            <div class="flex gap-2 mt-4">
              <el-button type="primary" @click="viewProject(project)" class="flex-1">
                View Details
              </el-button>
              <el-button @click="previewDemo(project)">
                Live Demo
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center mt-8">
        <el-button type="primary" plain size="large" @click="loadMore">
          Load More Projects
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Download } from '@element-plus/icons-vue'

const searchQuery = ref('')
const categoryFilter = ref('')
const techFilter = ref('')
const priceFilter = ref('')
const sortBy = ref('newest')

const projects = ref([
  {
    id: 1,
    title: 'E-commerce Website with Admin Dashboard',
    type: 'Website Template',
    price: 1500000,
    technologies: ['PHP', 'MySQL', 'Bootstrap'],
    downloads: 234,
    rating: 4.5,
    reviews: 48,
    description: 'Complete e-commerce solution with inventory management, order processing, and customer management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
  },
  {
    id: 2,
    title: 'Student Management System',
    type: 'Academic Project',
    price: 850000,
    technologies: ['Python', 'Django', 'PostgreSQL'],
    downloads: 156,
    rating: 4.7,
    reviews: 32,
    description: 'Comprehensive student management system with attendance, grades, and course management.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
  },
  {
    id: 3,
    title: 'Real Estate Portal',
    type: 'Website Template',
    price: 2000000,
    technologies: ['Laravel', 'Vue.js', 'MySQL'],
    downloads: 189,
    rating: 4.8,
    reviews: 56,
    description: 'Feature-rich real estate website with property listing, search, and agent management.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d'
  },
  {
    id: 4,
    title: 'Hospital Management System',
    type: 'Academic Project',
    price: 1800000,
    technologies: ['Java', 'Spring Boot', 'React'],
    downloads: 145,
    rating: 4.6,
    reviews: 38,
    description: 'Complete HMS with patient records, appointment scheduling, and billing system.',
    image: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2'
  },
  {
    id: 5,
    title: 'Learning Management System',
    type: 'Website Template',
    price: 1200000,
    technologies: ['Node.js', 'React', 'MongoDB'],
    downloads: 278,
    rating: 4.4,
    reviews: 62,
    description: 'Modern LMS with course creation, student progress tracking, and assessment tools.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
  },
  {
    id: 6,
    title: 'Inventory Management System',
    type: 'Scripts & Tools',
    price: 950000,
    technologies: ['PHP', 'CodeIgniter', 'MySQL'],
    downloads: 198,
    rating: 4.3,
    reviews: 45,
    description: 'Complete inventory system with barcode scanning, stock alerts, and reporting.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4'
  }
])

const filteredProjects = computed(() => {
  let result = [...projects.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query))
    )
  }

  if (categoryFilter.value) {
    result = result.filter(project => project.type.toLowerCase().includes(categoryFilter.value))
  }

  if (techFilter.value) {
    result = result.filter(project => 
      project.technologies.some(tech => tech.toLowerCase() === techFilter.value)
    )
  }

  if (priceFilter.value) {
    switch(priceFilter.value) {
      case 'under_500':
        result = result.filter(project => project.price < 500000)
        break
      case '500_1m':
        result = result.filter(project => project.price >= 500000 && project.price < 1000000)
        break
      case '1m_2m':
        result = result.filter(project => project.price >= 1000000 && project.price < 2000000)
        break
      case 'over_2m':
        result = result.filter(project => project.price >= 2000000)
        break
    }
  }

  switch (sortBy.value) {
    case 'popular':
      result.sort((a, b) => b.downloads - a.downloads)
      break
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    default:
      result.sort((a, b) => b.id - a.id)
  }

  return result
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const viewProject = (project) => {
  console.log('Viewing project:', project)
}

const previewDemo = (project) => {
  console.log('Opening demo for:', project)
}

const loadMore = () => {
  console.log('Loading more projects...')
}
</script>

<style scoped>
.search-dark .el-input__wrapper {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: none !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-dark .el-input__wrapper:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.search-dark .el-input__inner {
  color: white;
}

.search-dark .el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
</style>