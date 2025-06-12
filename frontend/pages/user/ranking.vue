<template>
  <div class="bg-gradient-to-b from-indigo-50 to-blue-100 text-gray-900">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-white to-cyan-50 rounded-xl shadow-2xl container mx-auto px-4 py-8 mt-14">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full grid grid-cols-12 grid-rows-12">
          <div v-for="i in 144" :key="i" class="border border-cyan-200/10"></div>
        </div>
      </div>
      <div class="container mx-auto px-4 py-20 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-extrabold mb-6 animate-glitch text-gray-900">
            Code <span class="text-cyan-500">Masters</span>
          </h1>
          <p class="text-xl text-gray-700 mb-8 animate-fade-in">
            Celebrating the elite developers shaping our community
          </p>
          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <span class="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-200/30 text-cyan-700 flex items-center">
              <AwardIcon class="mr-2 h-5 w-5" /> Top Coders
            </span>
            <span class="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-200/30 text-purple-700 flex items-center">
              <UsersIcon class="mr-2 h-5 w-5" /> Community Leaders
            </span>
            <span class="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-200/30 text-amber-700 flex items-center">
              <StarIcon class="mr-2 h-5 w-5" /> Rising Stars
            </span>
          </div>
          <button class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white 
                         shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 animate-pulse"
                  @click="showNewUserDialog = true">
            <div class="flex items-center">
              <UserPlusIcon class="mr-2 h-5 w-5" /> Nominate a Developer
            </div>
          </button>
        </div>
      </div>
      <!-- Wave Divider -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg class="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#e0f2fe" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#e0f2fe" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#e0f2fe"></path>
        </svg>
      </div>
    </section>

    <!-- Podium Section -->
    <section class="container mx-auto -mt-16 mb-20 relative z-20">
      <div class="flex flex-wrap justify-center items-end gap-4 md:gap-8">
        <!-- Second Place -->
        <div class="order-2 md:order-1 transform transition-all duration-300 hover:scale-105">
          <div class="podium-card silver">
            <div class="medal-badge silver">2</div>
            <img :src="topThree[1]?.avatar || 'https://via.placeholder.com/80'"
                 :alt="topThree[1]?.fullName" class="mx-auto h-24 w-24 rounded-full object-cover border-4 border-gray-200 shadow-xl">
            <h3 class="mt-4 text-xl font-bold text-gray-900">{{ topThree[1]?.fullName || 'Silver Star' }}</h3>
            <p class="text-cyan-500 font-semibold">{{ topThree[1]?.score || 'N/A' }} points</p>
            <div class="flex justify-center mt-3">
              <div class="progress-circle" :style="{ '--progress': getProgressPercentage(topThree[1]?.score) + '%' }">
                <svg class="w-16 h-16">
                  <circle cx="32" cy="32" r="28" stroke-width="6" class="bg-circle" />
                  <circle cx="32" cy="32" r="28" stroke-width="6" class="progress-circle-bar" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- First Place -->
        <div class="order-1 md:order-2 transform transition-all duration-300 hover:scale-105 -mt-12">
          <div class="podium-card gold">
            <div class="medal-badge gold">1</div>
            <CrownIcon class="crown h-10 w-10 text-amber-400" />
            <img :src="topThree[0]?.avatar || 'https://via.placeholder.com/96'"
                 :alt="topThree[0]?.fullName" class="mx-auto h-32 w-32 rounded-full object-cover border-4 border-amber-300 shadow-xl">
            <h3 class="mt-4 text-2xl font-bold text-gray-900">{{ topThree[0]?.fullName || 'Code Champion' }}</h3>
            <p class="text-amber-500 font-semibold">{{ topThree[0]?.score || 'N/A' }} points</p>
            <div class="flex justify-center mt-3">
              <div class="progress-circle" :style="{ '--progress': getProgressPercentage(topThree[0]?.score) + '%' }">
                <svg class="w-20 h-20">
                  <circle cx="40" cy="40" r="36" stroke-width="6" class="bg-circle" />
                  <circle cx="40" cy="40" r="36" stroke-width="6" class="progress-circle-bar" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Third Place -->
        <div class="order-3 transform transition-all duration-300 hover:scale-105">
          <div class="podium-card bronze">
            <div class="medal-badge bronze">3</div>
            <img :src="topThree[2]?.avatar || 'https://via.placeholder.com/80'"
                 :alt="topThree[2]?.fullName" class="mx-auto h-24 w-24 rounded-full object-cover border-4 border-purple-300 shadow-xl">
            <h3 class="mt-4 text-xl font-bold text-gray-900">{{ topThree[2]?.fullName || 'Bronze Star' }}</h3>
            <p class="text-purple-500 font-semibold">{{ topThree[2]?.score || 'N/A' }} points</p>
            <div class="flex justify-center mt-3">
              <div class="progress-circle" :style="{ '--progress': getProgressPercentage(topThree[2]?.score) + '%' }">
                <svg class="w-16 h-16">
                  <circle cx="32" cy="32" r="28" stroke-width="6" class="bg-circle" />
                  <circle cx="32" cy="32" r="28" stroke-width="6" class="progress-circle-bar" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters and Tabs -->
    <section class="container mx-auto mb-8">
      <div class="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-6">
        <div class="flex flex-wrap justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Developer Rankings</h2>
          <div class="flex flex-wrap gap-4">
            <div class="relative">
              <input v-model="searchQuery" placeholder="Search developers..." 
                     class="px-4 py-2 rounded-lg bg-gray-50 border border-cyan-200/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-64">
              <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
            </div>
            <select v-model="filterTag" class="px-4 py-2 rounded-lg bg-gray-50 border border-cyan-200/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option value="">All Tags</option>
              <option v-for="tag in uniqueTags" :key="tag" :value="tag">{{ tag }}</option>
            </select>
          </div>
        </div>
        <div class="flex space-x-4 border-b border-cyan-200/30">
          <button :class="{ 'text-cyan-500 border-b-2 border-cyan-500': activeTab === 'score', 'text-gray-600': activeTab !== 'score' }" 
                  class="pb-2 font-semibold" @click="activeTab = 'score'">Score Ranking</button>
          <button :class="{ 'text-cyan-500 border-b-2 border-cyan-500': activeTab === 'activity', 'text-gray-600': activeTab !== 'activity' }" 
                  class="pb-2 font-semibold" @click="activeTab = 'activity'">Activity Ranking</button>
        </div>
      </div>
    </section>

    <!-- Developer List -->
    <section class="container mx-auto pb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="developer in filteredDevelopers" :key="developer.id"
             class="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:-translate-y-1 group">
          <div class="h-3 bg-gradient-to-r" :class="getRankGradient(developer.rank)"></div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center">
                <div class="rank-badge" :class="getRankGradient(developer.rank)">{{ developer.rank }}</div>
                <img :src="developer.avatar || 'https://via.placeholder.com/64'"
                     :alt="developer.fullName" class="h-16 w-16 rounded-full object-cover border-2 border-cyan-400 group-hover:scale-105 transition-transform duration-300">
                <div class="ml-4">
                  <h3 class="text-lg font-bold text-gray-900">{{ developer.fullName }}</h3>
                  <p class="text-sm text-gray-700">{{ developer.bio || `@${developer.username}` }}</p>
                </div>
              </div>
              <button class="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 transition-all duration-300"
                      @click="vote(developer.id)">
                <ThumbsUpIcon class="h-5 w-5 text-cyan-500" />
              </button>
            </div>
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Score</span>
                <span class="text-sm font-semibold text-cyan-500">{{ developer.score || 'N/A' }}</span>
              </div>
              <div class="progress-bar" :style="{ '--progress': getProgressPercentage(developer.score) + '%' }"></div>
            </div>
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-for="tag in developer.tags || []" :key="tag" class="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-700 text-xs font-semibold">
                {{ tag }}
              </span>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <div class="flex items-center">
                <MessageSquareIcon class="h-4 w-4 text-gray-600 mr-2" />
                <span class="text-sm text-gray-600">{{ developer.posts || 0 }} posts</span>
              </div>
              <div class="flex items-center">
                <CalendarIcon class="h-4 w-4 text-gray-600 mr-2" />
                <span class="text-sm text-gray-600">Joined {{ formatDate(developer.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Empty State -->
      <div v-if="filteredDevelopers.length === 0" class="text-center py-20">
        <SearchXIcon class="h-16 w-16 mx-auto text-gray-600 mb-4" />
        <h3 class="text-xl font-bold text-gray-900 mb-2">No developers found</h3>
        <p class="text-gray-700">Try adjusting your search or filters</p>
      </div>
    </section>

    <!-- Nominate Developer Dialog -->
    <div v-if="showNewUserDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Nominate a Developer</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm text-gray-700">Full Name</label>
            <input v-model="newDeveloper.fullName" placeholder="Enter full name"
                   class="w-full px-3 py-2 rounded-lg bg-gray-50 border border-cyan-200/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
          </div>
          <div>
            <label class="text-sm text-gray-700">Username</label>
            <input v-model="newDeveloper.username" placeholder="Enter username"
                   class="w-full px-3 py-2 rounded-lg bg-gray-50 border border-cyan-200/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
          </div>
          <div>
            <label class="text-sm text-gray-700">Bio</label>
            <textarea v-model="newDeveloper.bio" placeholder="Short bio"
                      class="w-full px-3 py-2 rounded-lg bg-gray-50 border border-cyan-200/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
          </div>
          <div>
            <label class="text-sm text-gray-700">Tags</label>
            <select v-model="newDeveloper.tags" multiple class="w-full px-3 py-2 rounded-lg bg-gray-50 border border-cyan-200/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option value="Developer">Developer</option>
              <option value="Community">Community</option>
              <option value="Hacker">Hacker</option>
              <option value="Designer">Designer</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <button class="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400" @click="showNewUserDialog = false">Cancel</button>
          <button class="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600" @click="addNewDeveloper">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { AwardIcon, UsersIcon, StarIcon, UserPlusIcon, ThumbsUpIcon, SearchIcon, SearchXIcon, CrownIcon, MessageSquareIcon, CalendarIcon } from 'lucide-vue-next'

const developers = ref([
  {
    id: 1,
    username: "305955602",
    fullName: "Huy Đặng Quốc",
    active: true,
    score: "20.000",
    level: null,
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIPZmtqHKB3G1sXJIeblWjNN0m-QTPxD9AeNJgd31oAGjE6AA8=s96-c",
    bio: null,
    created_at: "2025-05-21T16:04:43.381Z",
    updated_at: "2025-05-25T18:17:32.854Z",
    tags: [],
    posts: 0
  },
  {
    id: 5,
    username: "441884169",
    fullName: "Huy Dev",
    active: true,
    score: null,
    level: null,
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJ2tsNly6pKGxhoXGZQXlO2OiA-JkPFVh8avFFMyFYgKCoTkA_a=s96-c",
    bio: null,
    created_at: "2025-05-24T06:16:44.530Z",
    updated_at: "2025-05-28T16:10:00.666Z",
    tags: [],
    posts: 0
  },
  {
    id: 6,
    username: "420314974056174",
    fullName: "Đặng Quốc Huy",
    active: true,
    score: null,
    level: null,
    avatar: null,
    bio: null,
    created_at: "2025-05-24T21:00:00.736Z",
    updated_at: "2025-05-24T21:00:00.736Z",
    tags: [],
    posts: 0
  },
  {
    id: 7,
    username: "382729337",
    fullName: "Đặng Quốc Huy",
    active: true,
    score: null,
    level: null,
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocL-ZcyFDa3dySGN3Cr-CLyGrONcIs12kT8Ue21WT7iJxVSZTRaV=s96-c",
    bio: null,
    created_at: "2025-05-25T17:47:16.937Z",
    updated_at: "2025-05-26T17:01:00.753Z",
    tags: [],
    posts: 0
  },
  {
    id: 8,
    username: "574038891",
    fullName: "Đặng Quốc Huy",
    active: true,
    score: null,
    level: null,
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocK8fgrE5ODLQkq_sYZfXz38gyIPRY39u8U18nTD15adiS_Qzem8=s96-c",
    bio: null,
    created_at: "2025-06-07T08:45:36.645Z",
    updated_at: "2025-06-07T08:45:36.645Z",
    tags: [],
    posts: 0
  },
  {
    id: 9,
    username: "517497901",
    fullName: "Huy Hacker",
    active: true,
    score: null,
    level: null,
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIJObxTJqC60Byg3jxoa8wDgk-PhrgxK8600RbZfrXsZWrfT7M=s96-c",
    bio: null,
    created_at: "2025-06-07T10:31:42.951Z",
    updated_at: "2025-06-07T10:31:42.951Z",
    tags: [],
    posts: 0
  }
])

// State
const activeTab = ref('score')
const searchQuery = ref('')
const filterTag = ref('')
const showNewUserDialog = ref(false)
const newDeveloper = ref({
  fullName: '',
  username: '',
  bio: '',
  tags: []
})

// Computed
const sortedDevelopers = computed(() => {
  return [...developers.value]
    .sort((a, b) => {
      if (activeTab.value === 'score') {
        const scoreA = a.score ? parseFloat(a.score.replace('.', '')) : -Infinity
        const scoreB = b.score ? parseFloat(b.score.replace('.', '')) : -Infinity
        return scoreB - scoreA
      } else {
        const activityA = a.posts || 0
        const activityB = b.posts || 0
        return activityB - activityA
      }
    })
    .map((developer, index) => ({
      ...developer,
      rank: index + 1
    }))
})

const topThree = computed(() => sortedDevelopers.value.slice(0, 3))
const filteredDevelopers = computed(() => {
  return sortedDevelopers.value.filter(developer => {
    const matchesSearch = searchQuery.value === '' ||
      developer.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      developer.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTag = filterTag.value === '' || (developer.tags || []).includes(filterTag.value)
    return matchesSearch && matchesTag
  })
})

const uniqueTags = computed(() => {
  const tags = new Set()
  developers.value.forEach(developer => {
    (developer.tags || []).forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

// Methods
const vote = (id) => {
  const developer = developers.value.find(d => d.id === id)
  if (developer) {
    developer.score = developer.score ? (parseFloat(developer.score.replace('.', '')) + 1000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '1.000'
  }
}

const addNewDeveloper = () => {
  const newId = Math.max(...developers.value.map(d => d.id)) + 1
  developers.value.push({
    id: newId,
    fullName: newDeveloper.value.fullName,
    username: newDeveloper.value.username,
    avatar: null,
    bio: newDeveloper.value.bio,
    score: null,
    tags: newDeveloper.value.tags,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    posts: 0
  })
  showNewUserDialog.value = false
  newDeveloper.value = { fullName: '', username: '', bio: '', tags: [] }
}

const getProgressPercentage = (score) => {
  const maxScore = Math.max(...developers.value.map(d => d.score ? parseFloat(d.score.replace('.', '')) : 0), 1000)
  return score ? Math.round((parseFloat(score.replace('.', '')) / maxScore) * 100) : 0
}

const getRankGradient = (rank) => {
  if (rank === 1) return 'from-amber-400 to-amber-500'
  if (rank === 2) return 'from-gray-200 to-gray-300'
  if (rank === 3) return 'from-purple-400 to-purple-500'
  return 'from-cyan-400 to-blue-500'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
/* Ensure background covers full viewport */
html, body, #__nuxt, .min-h-screen {
  height: 100%;
  margin: 0;
  background: linear-gradient(to bottom, #eef2ff, #dbeafe);
}

/* Hero Glitch Animation */
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

/* Other Animations */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-glitch {
  animation: glitch 0.5s ease-in-out infinite alternate;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

/* Podium Cards */
.podium-card {
  position: relative;
  background: linear-gradient(to bottom, #ffffff, #f8fafc);
  border-radius: 12px;
  padding: 24px;
  width: 220px;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.podium-card.gold {
  background: linear-gradient(to bottom, #ffffff, #fefce8);
  border-top: 4px solid #f59e0b;
  width: 260px;
  padding-top: 40px;
  box-shadow: 0 15px 30px rgba(245, 158, 11, 0.2);
}

.podium-card.silver {
  background: linear-gradient(to bottom, #ffffff, #f3f4f6);
  border-top: 4px solid #d1d5db;
}

.podium-card.bronze {
  background: linear-gradient(to bottom, #ffffff, #ede9fe);
  border-top: 4px solid #a855f7;
}

.medal-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.medal-badge.gold {
  background: linear-gradient(135deg, #fef9c3, #f59e0b);
  width: 44px;
  height: 44px;
  font-size: 22px;
}

.medal-badge.silver {
  background: linear-gradient(135deg, #f3f4f6, #d1d5db);
}

.medal-badge.bronze {
  background: linear-gradient(135deg, #ddd6fe, #a855f7);
}

.crown {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  animation: float 3s ease-in-out infinite;
}

.rank-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 12px;
}

/* Progress Bar */
.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: var(--progress);
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
  animation: progressAnimation 2s linear infinite;
  background-size: 16px 16px;
}

/* Progress Circle for Podium */
.progress-circle {
  --progress: 0%;
}

.progress-circle .bg-circle {
  fill: none;
  stroke: #e5e7eb;
}

.progress-circle .progress-circle-bar {
  fill: none;
  stroke: #22d3ee;
  stroke-linecap: round;
  stroke-dasharray: 175.9;
  stroke-dashoffset: calc(175.9 * (1 - var(--progress) / 100));
  transition: stroke-dashoffset 0.5s ease;
}

@keyframes progressAnimation {
  0% { background-position: 0 0; }
  100% { background-position: 16px 0; }
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(-50%); }
  50% { transform: translateY(-10px) translateX(-50%); }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 rgba(34, 211, 238, 0.5); }
  50% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.8); }
}
</style>