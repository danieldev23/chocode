<script setup lang="ts"></script>

<template>
  <MoleculesHeader />
  <main >
    <div class="bg-main-bg">
        <div class="mx-4 md:mx-16 lg:mx-32 xl:mx-48 mt-4 md:mt-8 flex flex-col md:flex-row gap-6">
          <slot />
        </div>
    </div>
  </main>
  <div class="bg-white">
    <MoleculesFooter class="bg-white" />
  </div>
</template>

