<template>
  <div
    v-if="product"
    class="container mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 animate-fadeIn"
  >
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full md:w-1/3 h-64 md:h-auto object-contain bg-white dark:bg-gray-800 rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />

      <div class="flex-1 flex flex-col">
        <h2
          class="text-3xl font-bold mb-4 leading-tight"
          :title="product.title"
        >
          {{ product.title }}
        </h2>

        <p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {{ product.description }}
        </p>

        <p class="text-2xl font-extrabold mb-8">
          {{ product.price }} $
        </p>

        <button
          @click="addToCart"
          class="self-start bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
          aria-label="Добавить товар в корзину"
        >
          Ба сабад
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useProductStore } from '../store/productStore'
import { useCartStore } from '../store/cartStore'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const id = parseInt(route.params.id)
const product = computed(() => productStore.products.find(p => p.id === id))

onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.loadProducts()
  }
})

const addToCart = () => {
  if (product.value) {
    cartStore.add(product.value)
  }
}
</script>

<style scoped>
/* Анимацияи fade-in барои контейнер */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease forwards;
}

/* Сабук transition барои кнопка */
button {
  transition: background-color 0.3s ease;
}

/* Дар экранҳои хурдтар, тасвирро баландии худкор диҳем */
@media (max-width: 767px) {
  img {
    height: auto !important;
  }
}
</style>