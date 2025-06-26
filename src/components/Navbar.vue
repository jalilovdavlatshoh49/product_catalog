<!-- components/Navbar.vue -->
<template>
  <nav class="bg-gray-100 dark:bg-gray-800 px-4 py-3 shadow-md">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <router-link
        to="/"
        class="text-xl font-bold text-gray-900 dark:text-white hover:opacity-80"
      >
        Catalog
      </router-link>

      <div class="flex items-center space-x-4">
        <router-link
          to="/cart"
          class="text-gray-700 dark:text-gray-200 hover:underline"
        >
          Cart ({{ cartCount }})
        </router-link>

        <button
          @click="toggleDark"
          class="text-sm bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded hover:opacity-80 transition"
        >
          {{ isDark ? 'Light' : 'Dark' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '../store/cartStore'
import { computed, ref, onMounted } from 'vue'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
</script>