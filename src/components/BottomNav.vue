<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 shadow-md md:hidden">
    <div class="flex justify-around items-center h-16">
      <router-link to="/" class="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition">
        <svg class="w-6 h-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
        </svg>
        <span class="text-xs">Catalog</span>
      </router-link>

      <router-link to="/cart" class="relative flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition">
        <svg class="w-6 h-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h12M9 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"/>
        </svg>
        <span class="text-xs">Cart</span>
        <span v-if="cartCount > 0" class="absolute -top-1.5 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">
          {{ cartCount }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '../store/cartStore'
import { computed } from 'vue'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
</script>
