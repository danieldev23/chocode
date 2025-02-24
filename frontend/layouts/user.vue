<script setup lang="ts"></script>

<template>
  <MoleculesHeader />
  <main>
    <div class="">
      <!-- Main Content -->
      <main class="pt-16 min-h-screen bg-gray-50">
        <!-- Ads Banner -->
        <!-- <img
          src="~/assets/images/header/banner.gif"
          class="ads-banner bg-gray-200 mx-auto my-8 rounded-lg w-[100%] max-w-screen-xl"
        /> -->

        <div class="flex lg:gap-6 mx-auto w-[1326px] lg:px-4 items-center">
        <slot/>
        </div>
      </main>
    </div>
  </main>
  <MoleculesFooter />
</template>
<script>
const searchQuery = ref("");
</script>
