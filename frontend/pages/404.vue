<template>
  <div class="error-container">
    <!-- Cute illustration container -->
    <div class="illustration-container">
      <!-- Cloud elements -->
      <div class="cloud cloud-left"></div>
      <div class="cloud cloud-right"></div>
      
      <!-- Lost character -->
      <div class="character">
        <!-- Character body -->
        <div class="character-body">
          <!-- Face -->
          <div class="face">
            <!-- Eyes -->
            <div class="eyes">
              <div class="eye">
                <div class="pupil"></div>
              </div>
              <div class="eye">
                <div class="pupil"></div>
              </div>
            </div>
            
            <!-- Mouth (sad) -->
            <div class="mouth"></div>
          </div>
          
          <!-- Blush -->
          <div class="blush blush-left"></div>
          <div class="blush blush-right"></div>
          
          <!-- Ears -->
          <div class="ear ear-left"></div>
          <div class="ear ear-right"></div>
        </div>
      </div>
    </div>
    
    <!-- Error message -->
    <h1 class="error-code">404</h1>
    <h2 class="error-title">Không tìm thấy trang</h2>
    <p class="error-message">
      Oops! Có vẻ như bạn đã lạc đường. Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
    </p>
    
    <!-- Button to go back home -->
    <NuxtLink to="/" class="home-button bg-secondary-gradient">
      <svg xmlns="http://www.w3.org/2000/svg" class="home-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Về trang chủ
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// Set custom meta for 404 page
useHead({
  title: 'Không tìm thấy trang - 404',
  meta: [
    { name: 'description', content: 'Trang không tìm thấy' }
  ]
})
</script>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes cloudFloat {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes blink {
  0% {
    transform: scaleY(1);
  }
  18% {
    transform: scaleY(1);
  }
  20% {
    transform: scaleY(0.1);
  }
  22% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(-35deg);
  }
  100% {
    transform: rotate(-45deg);
  }
}

@keyframes wiggleRight {
  0% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(35deg);
  }
  100% {
    transform: rotate(45deg);
  }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1rem;
}

.illustration-container {
  position: relative;
  margin-bottom: 2rem;
  animation: float 4s ease-in-out infinite;
}

.cloud {
  position: absolute;
  background-color: #dbeafe;
  border-radius: 9999px;
}

.cloud-left {
  top: -3rem;
  left: -4rem;
  width: 4rem;
  height: 2.5rem;
  animation: cloudFloat 7s ease-in-out infinite;
}

.cloud-right {
  top: -1.5rem;
  right: -3rem;
  width: 3rem;
  height: 2rem;
  animation: cloudFloat 5s ease-in-out infinite reverse;
}

.character {
  position: relative;
}

.character-body {
  width: 10rem;
  height: 10rem;
  background-color: #fce7f3;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: pulse 3s ease-in-out infinite;
}

.face {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.eyes {
  display: flex;
  margin-bottom: 0.5rem;
}

.eye {
  width: 1rem;
  height: 1rem;
  background-color: #1f2937;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  animation: blink 4s infinite;
}

.pupil {
  width: 0.25rem;
  height: 0.25rem;
  background-color: white;
  border-radius: 9999px;
}

.mouth {
  width: 2rem;
  height: 2rem;
  border-bottom: 4px solid #1f2937;
  border-radius: 9999px;
  margin-top: 0.5rem;
}

.blush {
  position: absolute;
  width: 1.5rem;
  height: 0.75rem;
  background-color: #fbcfe8;
  border-radius: 9999px;
  opacity: 0.8;
}

.blush-left {
  left: 1.5rem;
  top: 5rem;
}

.blush-right {
  right: 1.5rem;
  top: 5rem;
}

.ear {
  position: absolute;
  width: 2rem;
  height: 3rem;
  background-color: #fce7f3;
  border-radius: 9999px;
}

.ear-left {
  left: -1rem;
  top: 3rem;
  transform: rotate(-45deg);
  animation: wiggle 2s ease-in-out infinite;
}

.ear-right {
  right: -1rem;
  top: 3rem;
  transform: rotate(45deg);
  animation: wiggleRight 2s ease-in-out infinite;
}

.error-code {
  font-size: 3.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  animation: float 3s ease-in-out infinite;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #FF7979;
  margin-bottom: 1.5rem;
}

.error-message {
  color: #4b5563;
  text-align: center;
  max-width: 28rem;
  margin-bottom: 2rem;
}

.home-button {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #ec4899;
  color: white;
  border-radius: 9999px;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.3s;
}

.home-button:hover {
  background-color: #db2777;
  transform: scale(1.05);
}

.home-icon {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.5rem;
}
</style>