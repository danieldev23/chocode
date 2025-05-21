<template>
  <div class=" mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem] mt-20 bg-slate-50 text-slate-800 font-sans">
    <!-- Hero Section with Parallax Effect -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-800 text-white rounded-md">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full grid grid-cols-10 grid-rows-10">
          <div v-for="i in 100" :key="i" class="border border-white/10"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-4 py-16 relative z-10">
        <div class="max-w-4xl mx-auto text-center mb-16">
          <h1 class="text-6xl font-extrabold mb-6 glitch-text">
            Community<span class="text-yellow-300">Stars</span>
          </h1>
          <p class="text-xl text-indigo-100 mb-8">
            Celebrating the brightest minds and most valuable contributors in our community
          </p>
          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <span class="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-300/30 text-indigo-100 flex items-center">
              <Award class="mr-2 h-4 w-4" />
              Top Contributors
            </span>
            <span class="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-300/30 text-purple-100 flex items-center">
              <Users class="mr-2 h-4 w-4" />
              Community Builders
            </span>
            <span class="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-300/30 text-pink-100 flex items-center">
              <Star class="mr-2 h-4 w-4" />
              Recognition Program
            </span>
          </div>
          <el-button type="primary" class="hero-button" @click="showNewUserDialog = true">
            <div class="flex items-center">
              <UserPlus class="mr-2" />
              Nominate a Star
            </div>
          </el-button>
        </div>
      </div>
      
      <!-- Wave divider -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg class="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#f8fafc" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#f8fafc" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f8fafc"></path>
        </svg>
      </div>
    </section>

    <!-- Podium Section -->
    <section class="container mx-auto -mt-20 mb-20 z-20 relative">
      <div class="flex flex-wrap justify-center items-end gap-4 md:gap-10">
        <!-- Second Place -->
        <div class="order-2 md:order-1 transform transition-all duration-300 hover:scale-105">
          <div class="podium-card silver">
            <div class="medal-badge silver">2</div>
            <div class="relative z-10">
              <img :src="sortedByVotes[1]?.avatar || defaultAvatar" :alt="sortedByVotes[1]?.fullName" 
                   class="mx-auto h-24 w-24 rounded-full object-cover border-4 border-white shadow-xl">
              <h3 class="mt-4 text-xl font-bold">{{ sortedByVotes[1]?.fullName || 'Runner Up' }}</h3>
              <p class="text-blue-500 font-semibold">{{ sortedByVotes[1]?.votes || 0 }} votes</p>
              <div class="flex justify-center mt-3">
                <el-progress type="circle" :percentage="getProgressPercentage(sortedByVotes[1]?.votes)" 
                            :width="60" stroke-width="6" :show-text="false" 
                            :color="'#3b82f6'"></el-progress>
              </div>
            </div>
          </div>
        </div>
        
        <!-- First Place -->
        <div class="order-1 md:order-2 transform transition-all duration-300 hover:scale-105 -mt-12">
          <div class="podium-card gold">
            <div class="medal-badge gold">1</div>
            <div class="crown">
              <Crown class="h-8 w-8 text-yellow-500" />
            </div>
            <div class="relative z-10">
              <img :src="sortedByVotes[0]?.avatar || defaultAvatar" :alt="sortedByVotes[0]?.fullName" 
                   class="mx-auto h-32 w-32 rounded-full object-cover border-4 border-white shadow-xl">
              <h3 class="mt-4 text-2xl font-bold">{{ sortedByVotes[0]?.fullName || 'Champion' }}</h3>
              <p class="text-yellow-500 font-semibold">{{ sortedByVotes[0]?.votes || 0 }} votes</p>
              <div class="flex justify-center mt-3">
                <el-progress type="circle" :percentage="getProgressPercentage(sortedByVotes[0]?.votes)" 
                            :width="80" stroke-width="6" :show-text="false" 
                            :color="'#eab308'"></el-progress>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Third Place -->
        <div class="order-3 transform transition-all duration-300 hover:scale-105">
          <div class="podium-card bronze">
            <div class="medal-badge bronze">3</div>
            <div class="relative z-10">
              <img :src="sortedByVotes[2]?.avatar || defaultAvatar" :alt="sortedByVotes[2]?.fullName" 
                   class="mx-auto h-24 w-24 rounded-full object-cover border-4 border-white shadow-xl">
              <h3 class="mt-4 text-xl font-bold">{{ sortedByVotes[2]?.fullName || 'Bronze Star' }}</h3>
              <p class="text-orange-500 font-semibold">{{ sortedByVotes[2]?.votes || 0 }} votes</p>
              <div class="flex justify-center mt-3">
                <el-progress type="circle" :percentage="getProgressPercentage(sortedByVotes[2]?.votes)" 
                            :width="60" stroke-width="6" :show-text="false" 
                            :color="'#f97316'"></el-progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs and Filters -->
    <section class="container mx-auto mb-8">
      <div class="bg-white rounded-xl shadow-xl p-6">
        <div class="flex flex-wrap justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Community Rankings</h2>
          <div class="flex space-x-4">
            <el-input 
              placeholder="Search users" 
              v-model="searchQuery"
              class="max-w-xs"
            >
              <template #prefix>
                <Search />
              </template>
            </el-input>
            <el-select v-model="filterTag" placeholder="Filter by tag" clearable>
              <el-option label="All Tags" value=""></el-option>
              <el-option v-for="tag in uniqueTags" :key="tag" :label="tag" :value="tag"></el-option>
            </el-select>
          </div>
        </div>

        <el-tabs v-model="activeTab" class="custom-tabs">
          <el-tab-pane label="Single-Vote Ranking" name="single">
            <div class="flex items-center mb-4 text-sm text-slate-500">
              <Info class="mr-2 h-4 w-4" />
              Rankings are based on individual votes from community members
            </div>
          </el-tab-pane>
          <el-tab-pane label="Overall Ranking" name="overall">
            <div class="flex items-center mb-4 text-sm text-slate-500">
              <Info class="mr-2 h-4 w-4" />
              Rankings consider all contributions including votes, posts, and other activities
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>

    <!-- User List -->
    <section class="container mx-auto pb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="user in filteredUsers" :key="user.id" 
             class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:translate-y-px group">
          <div class="h-3 bg-gradient-to-r" :class="getRankClass(user.rank)"></div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center">
                <div class="rank-badge" :class="`${getRankClassText(user.rank)} rounded-full` ">{{ user.rank }}</div>
                <img :src="user.avatar || defaultAvatar" :alt="user.fullName" 
                     class="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <div class="ml-4">
                  <h3 class="text-lg font-bold">{{ user.fullName }}</h3>
                  <p class="text-sm text-slate-500">{{ user.bio || `@${user.username}` }}</p>
                </div>
              </div>
              <el-tooltip content="Vote for this user" placement="top" effect="light">
                <el-button 
                  @click="vote(user.id)" 
                  :type="user.id === 3 ? 'primary' : 'default'"
                  :class="user.id === 3 ? 'animate-pulse' : ''"
                  class="vote-button"
                  circle
                >
                  <ThumbsUp />
                </el-button>
              </el-tooltip>
            </div>
            
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-slate-700">Votes</span>
                <span class="text-sm font-semibold">{{ user.votes }}</span>
              </div>
              <el-progress 
                :percentage="getProgressPercentage(user.votes)" 
                :color="getProgressColor(user.rank)"
                :show-text="false"
                :stroke-width="8"
                class="custom-progress"
              ></el-progress>
            </div>
            
            <div class="flex flex-wrap gap-2 mt-4">
              <el-tag 
                v-for="tag in user.tags" 
                :key="tag" 
                effect="light"
                class="user-tag"
                :color="getTagColor(tag)"
              >
                {{ tag }}
              </el-tag>
            </div>
            
            <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
              <div class="flex items-center">
                <MessageSquare class="h-4 w-4 text-slate-400 mr-2" />
                <span class="text-sm text-slate-500">{{ Math.floor(Math.random() * 50) }} posts</span>
              </div>
              <div class="flex items-center">
                <Calendar class="h-4 w-4 text-slate-400 mr-2" />
                <span class="text-sm text-slate-500">Joined {{ getRandomDate() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="text-center py-20">
        <SearchX class="h-16 w-16 mx-auto text-slate-300 mb-4" />
        <h3 class="text-xl font-bold text-slate-600 mb-2">No users found</h3>
        <p class="text-slate-500">Try adjusting your search or filters</p>
      </div>
    </section>
    
    <!-- New User Dialog -->
    <el-dialog
      v-model="showNewUserDialog"
      title="Nominate a Star"
      width="500px"
    >
      <el-form label-position="top">
        <el-form-item label="Full Name">
          <el-input v-model="newUser.fullName" placeholder="Enter full name"></el-input>
        </el-form-item>
        <el-form-item label="Username">
          <el-input v-model="newUser.username" placeholder="Enter username"></el-input>
        </el-form-item>
        <el-form-item label="Bio">
          <el-input type="textarea" v-model="newUser.bio" placeholder="Short bio"></el-input>
        </el-form-item>
        <el-form-item label="Tags">
          <el-select v-model="newUser.tags" multiple placeholder="Select tags">
            <el-option label="Developer" value="Developer"></el-option>
            <el-option label="Community" value="Community"></el-option>
            <el-option label="User" value="User"></el-option>
            <el-option label="Hacker" value="Hacker"></el-option>
            <el-option label="Designer" value="Designer"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showNewUserDialog = false">Cancel</el-button>
          <el-button type="primary" @click="addNewUser">Submit Nomination</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { 
  Award, 
  Users, 
  Star, 
  UserPlus, 
  ThumbsUp, 
  Search, 
  Info, 
  Crown, 
  MessageSquare, 
  Calendar, 
  SearchX 
} from 'lucide-vue-next';
import defaultAvatar from '@/assets/images/header/default-avatar.png';

// Data
const users = ref([
  {
    id: 3,
    fullName: "Huy Dev",
    username: "539810025",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJ2tsNly6pKGxhoXGZQXlO2OiA-JkPFVh8avFFMyFYgKCoTkA_a=s96-c",
    bio: "Passionate developer and community contributor",
    votes: 100,
    tags: ["Developer", "Community"],
  },
  {
    id: 4,
    fullName: "Huy Hacker",
    username: "428948642",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIJObxTJqC60Byg3jxoa8wDgk-PhrgxK8600RbZfrXsZWrfT7M=s96-c",
    bio: "Security researcher and community activist",
    votes: 80,
    tags: ["Hacker", "Community"],
  },
  {
    id: 5,
    fullName: "Dang Quoc Huy",
    username: "585548636",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKFvzb4-CS9vEf2KB30mQRcM2Mp4BWV-Q3VCi2LkZK1CWA8Zarg=s96-c",
    bio: "Regular contributor and helpful community member",
    votes: 60,
    tags: ["User", "Community"],
  },
  {
    id: 6,
    fullName: "Đặng Quốc Huy",
    username: "454218794",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLeOWxZtb2DDl-qxvss97cQtqGa1St-N4IZPCCfUAJMM9M_bMo=s96-c",
    bio: "Active forum participant and question answerer",
    votes: 40,
    tags: ["User", "Community"],
  },
  {
    id: 7,
    fullName: "Huy Developer",
    username: "995300929169599",
    avatar: null,
    bio: "Backend specialist and API wizard",
    votes: 20,
    tags: ["Developer", "Community"],
  },
  {
    id: 8,
    fullName: "Đặng Quốc Huy",
    username: "640061513",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocK8fgrE5ODLQkq_sYZfXz38gyIPRY39u8U18nTD15adiS_Qzem8=s96-c",
    bio: "New member with great potential",
    votes: 10,
    tags: ["User", "Community"],
  },
  {
    id: 9,
    fullName: "Quoc Huy",
    username: "quoc_huy",
    avatar: null,
    bio: "Designer and UI/UX specialist",
    votes: 15,
    tags: ["Designer", "Community"],
  },
  {
    id: 10,
    fullName: "Huy Nguyen",
    username: "huy_nguyen",
    avatar: null,
    bio: "Mobile developer and ReactNative enthusiast",
    votes: 25,
    tags: ["Developer", "Mobile"],
  },
]);

// State
const activeTab = ref("single");
const searchQuery = ref("");
const filterTag = ref("");
const showNewUserDialog = ref(false);
const newUser = ref({
  fullName: "",
  username: "",
  bio: "",
  tags: [],
});

// Computed
const sortedByVotes = computed(() => {
  return [...users.value]
    .sort((a, b) => b.votes - a.votes)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
});

const filteredUsers = computed(() => {
  return sortedByVotes.value.filter(user => {
    // Filter by search query
    const matchesSearch = searchQuery.value === "" || 
      user.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // Filter by tag
    const matchesTag = filterTag.value === "" || user.tags.includes(filterTag.value);
    
    return matchesSearch && matchesTag;
  });
});

const uniqueTags = computed(() => {
  const tags = new Set();
  users.value.forEach(user => {
    user.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
});

// Methods
const vote = (userId) => {
  const user = users.value.find((u) => u.id === userId);
  if (user) {
    user.votes += 1;
  }
};

const addNewUser = () => {
  const newId = Math.max(...users.value.map(u => u.id)) + 1;
  users.value.push({
    id: newId,
    fullName: newUser.value.fullName,
    username: newUser.value.username,
    avatar: null,
    bio: newUser.value.bio,
    votes: 0,
    tags: newUser.value.tags,
  });
  
  showNewUserDialog.value = false;
  newUser.value = {
    fullName: "",
    username: "",
    bio: "",
    tags: [],
  };
};

const getProgressPercentage = (votes) => {
  const maxVotes = Math.max(...users.value.map(u => u.votes));
  return Math.round((votes / maxVotes) * 100);
};

const getProgressColor = (rank) => {
  if (rank === 1) return '#eab308';
  if (rank === 2) return '#3b82f6';
  if (rank === 3) return '#f97316';
  return '#6366f1';
};

const getRankClass = (rank) => {
  if (rank === 1) return 'from-yellow-400 to-amber-500';
  if (rank === 2) return 'from-blue-400 to-blue-500';
  if (rank === 3) return 'from-orange-400 to-orange-500';
  return 'from-indigo-400 to-purple-500';
};

const getRankClassText = (rank) => {
  if (rank === 1) return 'bg-yellow-500';
  if (rank === 2) return 'bg-blue-500';
  if (rank === 3) return 'bg-orange-500';
  return 'bg-indigo-500';
};

const getTagColor = (tag) => {
  const colors = {
    'Developer': '#8b5cf6',
    'Community': '#3b82f6',
    'User': '#10b981',
    'Hacker': '#ec4899',
    'Designer': '#f97316',
    'Mobile': '#14b8a6'
  };
  return colors[tag] || '#6366f1';
};

const getRandomDate = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[Math.floor(Math.random() * months.length)];
  const year = 2022 + Math.floor(Math.random() * 3);
  return `${month} ${year}`;
};

// Lifecycle
onMounted(() => {
  // Simulate animation setup
  // In a real Nuxt app, you'd use proper lifecycle hooks
});
</script>

<style>
/* Custom Styles - In a real Nuxt app, these would be in separate files */
.hero-button {
  background: linear-gradient(to right, #4f46e5, #7e22ce);
  border: none;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
}

.hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5);
}

.glitch-text {
  position: relative;
  text-shadow: 0 0 8px rgba(255,255,255,0.4);
}

.podium-card {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  width: 220px;
  text-align: center;
  overflow: hidden;
}

.podium-card.gold {
  background: linear-gradient(to bottom, #ffffff, #fffbeb);
  border-top: 4px solid #eab308;
  width: 260px;
  padding-top: 40px;
  box-shadow: 0 15px 30px rgba(234, 179, 8, 0.2);
}

.podium-card.silver {
  background: linear-gradient(to bottom, #ffffff, #f1f5f9);
  border-top: 4px solid #3b82f6;
}

.podium-card.bronze {
  background: linear-gradient(to bottom, #ffffff, #fff7ed);
  border-top: 4px solid #f97316;
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.medal-badge.gold {
  background: linear-gradient(135deg, #fde047, #eab308);
  width: 44px;
  height: 44px;
  font-size: 22px;
}

.medal-badge.silver {
  background: linear-gradient(135deg, #e2e8f0, #3b82f6);
}

.medal-badge.bronze {
  background: linear-gradient(135deg, #fed7aa, #f97316);
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

.custom-tabs :deep(.el-tabs__nav) {
  border-radius: 8px;
  overflow: hidden;
}

.custom-tabs :deep(.el-tabs__item) {
  padding: 12px 20px;
  font-weight: 600;
}

.custom-tabs :deep(.el-tabs__active-bar) {
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(to right, #4f46e5, #7e22ce);
}

.custom-progress :deep(.el-progress-bar__inner) {
  border-radius: 8px;
  background-image: linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent);
  background-size: 16px 16px;
  animation: progressAnimation 2s linear infinite;
}

.user-tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.vote-button {
  position: relative;
  transition: all 0.3s ease;
}

.vote-button:hover {
  transform: scale(1.1);
}

@keyframes progressAnimation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 16px 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-10px) translateX(-50%);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
span.el-tag__content {
    color: white;
}
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 rgba(79, 70, 229, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(79, 70, 229, 0.8);
  }
}
</style>