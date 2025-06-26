<!-- components/Footer.vue -->
<template>
  <footer class="bg-gray-100 dark:bg-gray-800 text-center text-sm text-gray-700 dark:text-gray-300 py-4">
    <div class="container mx-auto">
      © {{ year }} Your Company. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>