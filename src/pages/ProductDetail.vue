<template>
  <div
    v-if="product"
    ref="productContainer"
    class="container mx-auto p-4 sm:p-6 lg:p-8 pt-16  <!-- Ислоҳ: масофаи табии байни навбар ва сурат -->
           bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 animate-fancyFadeIn"
  >
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full md:w-1/3 h-64 md:h-auto object-contain bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />

      <div class="flex-1 flex flex-col animate-slideUpDelay">
        <h2
          class="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
          :title="product.title"
        >
          {{ product.title }}
        </h2>

        <p class="mb-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {{ product.description }}
        </p>

        <p class="text-2xl font-extrabold mb-8">
          {{ product.price }} $
        </p>

        <button
          @click="addToCart"
          class="self-start bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white font-semibold px-8 py-3 rounded-md transition-all duration-300"
          aria-label="Ба сабад илова кунед"
        >
          Ба сабад
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, nextTick } from 'vue'
import { useProductStore } from '../store/productStore'
import { useCartStore } from '../store/cartStore'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const productContainer = ref(null)

const id = parseInt(route.params.id)
const product = computed(() => productStore.products.find(p => p.id === id))

onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.loadProducts()
  }

  await nextTick()

  if (productContainer.value) {
    productContainer.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
})

const addToCart = () => {
  if (product.value) {
    cartStore.add(product.value)
  }
}
</script>

<style scoped>
@keyframes fancyFadeIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-fancyFadeIn {
  animation: fancyFadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes slideUpDelay {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUpDelay {
  animation: slideUpDelay 0.6s ease 0.3s forwards;
  opacity: 0;
}

button {
  transition: all 0.3s ease;
}

@media (max-width: 767px) {
  img {
    height: auto !important;
  }
}
</style>
