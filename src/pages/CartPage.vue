<template>
  <div
    class="container mx-auto p-6 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl
           bg-white dark:bg-gray-900 rounded-lg shadow-md"
  >
    <h2
      class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 select-none"
      tabindex="0"
      aria-label="Сабади харид"
    >
      Сабади харид
    </h2>

    <div
      v-if="!animatedItems.length"
      class="text-center text-gray-600 dark:text-gray-400 italic"
      tabindex="0"
      aria-live="polite"
    >
      Сабад холӣ аст.
    </div>

    <transition-group name="fade" tag="div" class="space-y-6" v-else>
      <div
        v-for="item in animatedItems"
        :key="item.product.id"
        class="flex flex-wrap items-center gap-4 p-3 rounded-md
               bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      >
        <img
          :src="item.product.image"
          :alt="item.product.title"
          class="w-16 h-16 object-contain bg-white rounded-md border border-gray-300 dark:border-gray-600"
          loading="lazy"
          draggable="false"
        />
        <div class="flex-1 min-w-[120px]">
          <p
            class="font-semibold text-gray-900 dark:text-gray-100"
            tabindex="0"
          >
            {{ item.product.title }}
          </p>
          <p
            class="text-gray-700 dark:text-gray-300"
            tabindex="0"
          >
            {{ item.qty }} × {{ item.product.price }} $
          </p>
        </div>
        <button
          class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600
                 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1 transition"
          @click="remove(item.product.id)"
          :aria-label="`Хориҷ кардани ${item.product.title}`"
        >
          Хориҷ
        </button>
      </div>
    </transition-group>

    <div
      v-if="animatedItems.length"
      class="text-right text-xl font-bold text-gray-900 dark:text-gray-100 select-none mt-4"
      tabindex="0"
      aria-live="polite"
    >
      Ҷамъ: {{ totalPrice }} $
    </div>

    <button
      class="mt-6 w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md
             hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400
             transition disabled:opacity-50 disabled:cursor-not-allowed"
      @click="checkout"
      :disabled="!animatedItems.length"
      aria-disabled="!animatedItems.length"
    >
      Фармоиш додан
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cartStore'
import { computed, ref } from 'vue'

const cartStore = useCartStore()
const totalPrice = computed(() => cartStore.totalPrice)

// Копия барои аниматсия
const animatedItems = ref([...cartStore.items])

const remove = id => {
  cartStore.remove(id)
  animatedItems.value = animatedItems.value.filter(item => item.product.id !== id)
}

const checkout = () => {
  alert('Фармоиш қабул шуд! 😊')
  animatedItems.value = []
  setTimeout(() => {
    cartStore.clear()
  }, 300)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
