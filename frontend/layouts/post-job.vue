<template>
  <MoleculesHeader />
  <div class="w-full bg-gray-50">
    <!-- Main Content -->
    <main class="pt-16 bg-gray-50 overflow-hidden">
      <!-- Ads Banner -->

      <div class="mx-[1rem] md:mx-16 lg:mx-32 xl:mx-[13rem] mt-4 md:mt-16 lg:mt-2">
        <!-- <img src="~/assets/images/header/banner3.webp" class="rounded-md w-full" /> -->
        <slot />
      </div>
    </main>
    <div class="bg-white">
      <MoleculesFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
