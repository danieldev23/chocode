<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-950 to-cyan-500 text-white overflow-hidden">
      <div class="container mx-auto px-4 py-16">
        <!-- Header -->
        <header class="text-center mb-16 relative">
          <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight animate-glow flex items-center justify-center gap-3">
            <AwardIcon class="w-12 h-12 text-cyan-300 animate-pulse" />
            Code Legends Leaderboard
          </h1>
          <p class="text-gray-300 mt-3 text-lg animate-fade-in">Honoring the brightest coding minds</p>
        </header>
  
        <!-- Podium for Top 3 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          <div v-for="(developer, index) in topThree" :key="developer.id"
               :class="['relative group transform transition-all duration-500 hover:-translate-y-2', 
                        index === 0 ? 'md:order-2 md:-translate-y-10' : index === 1 ? 'md:order-1' : 'md:order-3',
                        index === 0 ? 'scale-110 z-10' : 'scale-100']"
               class="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/30 
                      shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-slide-up">
            <div class="flex items-center gap-4">
              <div class="relative">
                <img :src="developer.avatar || 'https://via.placeholder.com/80'"
                     class="w-20 h-20 rounded-full object-cover border-4 transition-transform duration-300 group-hover:scale-110"
                     :class="index === 0 ? 'border-cyan-300' : index === 1 ? 'border-gray-300' : 'border-amber-300'"
                     alt="Developer avatar" />
                <span class="absolute -top-3 -right-3 bg-cyan-500 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full">
                  {{ index === 0 ? '1st' : index === 1 ? '2nd' : '3rd' }}
                </span>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-cyan-100">{{ developer.fullName }}</h2>
                <p class="text-gray-300 text-sm">@{{
                  developer.username.length > 12 ? developer.username.slice(0, 12) + '...' : developer.username
                }}</p>
                <p class="text-sm text-gray-400">Score: <span class="font-semibold text-cyan-300">{{ developer.score || 'N/A' }}</span></p>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <CalendarIcon class="w-5 h-5 text-cyan-300" />
              Joined: {{ formatDate(developer.created_at) }}
            </div>
          </div>
        </div>
  
        <!-- Other Developers -->
        <div class="grid gap-4 max-w-3xl mx-auto">
          <div v-for="(developer, index) in otherDevelopers" :key="developer.id"
               class="bg-gray-900/40 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 
                      border border-cyan-500/20 shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] 
                      transform transition-all duration-300 animate-slide-in hover:-translate-y-1"
               :style="{ animationDelay: `${index * 0.15}s` }">
            <span class="text-xl font-bold text-cyan-300 w-10 text-center">
              {{ index + 4 }}
            </span>
            <img :src="developer.avatar || 'https://via.placeholder.com/64'"
                 class="w-14 h-14 rounded-full object-cover border-2 border-cyan-400 transition-transform duration-300 hover:scale-110"
                 alt="Developer avatar" />
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white">{{ developer.fullName }}</h3>
              <p class="text-gray-300 text-sm">@{{
                developer.username.length > 10 ? developer.username.slice(0, 10) + '...' : developer.username
              }}</p>
            </div>
            <div class="text-right">
              <p class="text-base font-bold text-cyan-300">
                {{ developer.score ? developer.score : 'N/A' }} <span class="text-xs">pts</span>
              </p>
              <p v-if="developer.active" class="text-green-300 text-sm flex items-center gap-1">
                <CheckCircleIcon class="w-4 h-4" /> Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { AwardIcon, CalendarIcon, CheckCircleIcon } from 'lucide-vue-next'
  
  const developers = [
    { "id": 1, "username": "305955602", "fullName": "Huy Đặng Quốc", "active": true, "score": "20.000", "level": null, "avatar": "https://lh3.googleusercontent.com/a/ACg8ocIPZmtqHKB3G1sXJIeblWjNN0m-QTPxD9AeNJgd31oAGjE6AA8=s96-c", "bio": null, "created_at": "2025-05-21T16:04:43.381Z", "updated_at": "2025-05-25T18:17:32.854Z" },
    { "id": 5, "username": "441884169", "fullName": "Huy Dev", "active": true, "score": "15.000", "level": null, "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJ2tsNly6pKGxhoXGZQXlO2OiA-JkPFVh8avFFMyFYgKCoTkA_a=s96-c", "bio": null, "created_at": "2025-05-24T06:16:44.530Z", "updated_at": "2025-05-28T16:10:00.666Z" },
    { "id": 6, "username": "420314974056174", "fullName": "Đặng Quốc Huy", "active": true, "score": "10.000", "level": null, "avatar": null, "bio": null, "created_at": "2025-05-24T21:00:00.736Z", "updated_at": "2025-05-24T21:00:00.736Z" },
    { "id": 7, "username": "382729337", "fullName": "Đặng Quốc Huy", "active": true, "score": null, "level": null, "avatar": "https://lh3.googleusercontent.com/a/ACg8ocL-ZcyFDa3dySGN3Cr-CLyGrONcIs12kT8Ue21WT7iJxVSZTRaV=s96-c", "bio": null, "created_at": "2025-05-25T17:47:16.937Z", "updated_at": "2025-05-26T17:01:00.753Z" },
    { "id": 8, "username": "574038891", "fullName": "Đặng Quốc Huy", "active": true, "score": null, "level": null, "avatar": "https://lh3.googleusercontent.com/a/ACg8ocK8fgrE5ODLQkq_sYZfXz38gyIPRY39u8U18nTD15adiS_Qzem8=s96-c", "bio": null, "created_at": "2025-06-07T08:45:36.645Z", "updated_at": "2025-06-07T08:45:36.645Z" },
    { "id": 9, "username": "517497901", "fullName": "Huy Hacker", "active": true, "score": null, "level": null, "avatar": "https://lh3.googleusercontent.com/a/ACg8ocIJObxTJqC60Byg3jxoa8wDgk-PhrgxK8600RbZfrXsZWrfT7M=s96-c", "bio": null, "created_at": "2025-06-07T10:31:42.951Z", "updated_at": "2025-06-07T10:31:42.951Z" }
  ]
  
  // Sort developers by score (null scores go to the bottom)
  const sortedDevelopers = computed(() => {
    return [...developers].sort((a, b) => {
      const scoreA = a.score ? parseFloat(a.score.replace('.', '')) : -Infinity
      const scoreB = b.score ? parseFloat(b.score.replace('.', '')) : -Infinity
      return scoreB - scoreA
    })
  })
  
  const topThree = computed(() => sortedDevelopers.value.slice(0, 3))
  const otherDevelopers = computed(() => sortedDevelopers.value.slice(3))
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  </script>
  
  <style scoped>
  /* Ensure the gradient background applies to the full viewport */
  html, body, #__nuxt, .min-h-screen {
    height: 100%;
    margin: 0;
    background: linear-gradient(to bottom, #020617, #06b6d4);
  }
  
  /* Animation styles */
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 5px rgba(6, 182, 212, 0.5); }
    50% { text-shadow: 0 0 20px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.4); }
  }
  
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
  
  .animate-glow {
    animation: glow 3s ease-in-out infinite;
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
  </style>