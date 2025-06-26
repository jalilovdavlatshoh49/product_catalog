<template>
  <aside class="hidden md:flex flex-col h-screen w-48 fixed left-0 top-0 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 shadow-lg">
    <div class="p-4 text-xl font-bold text-gray-900 dark:text-white">
      Shop
    </div>
    <nav class="flex-1 flex flex-col space-y-2 px-4">
      <router-link to="/" class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
        </svg>
        <span>Catalog</span>
      </router-link>

      <router-link to="/cart" class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition relative">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h12M9 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"/>
        </svg>
        <span>Cart</span>
        <span v-if="cartCount > 0" class="absolute top-0 right-0 transform translate-x-3 -translate-y-2 bg-red-600 text-white text-[10px] rounded-full px-1.5 py-0.5 animate-pulse">
          {{ cartCount }}
        </span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { useCartStore } from '../store/cartStore'
import { computed } from 'vue'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
</script>
