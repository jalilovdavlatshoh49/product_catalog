<template>
  <div
    class="p-4 rounded-lg mb-6
           bg-gray-100 dark:bg-gray-800
           shadow-md
           transition-colors duration-300
           max-w-full"
  >
    <div class="flex flex-wrap gap-4 justify-start sm:justify-between items-center">
      <!-- Нарх -->
      <input
        type="number"
        v-model.number="price"
        :disabled="store.loading"
        placeholder="Макс. нарх"
        class="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full sm:w-auto max-w-xs
               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
               placeholder-gray-400 dark:placeholder-gray-500
               focus:outline-none focus:ring-2 focus:ring-blue-500
               transition disabled:opacity-50"
      />

      <!-- Категория -->
      <select
        v-model="category"
        :disabled="store.loading || categories.length === 0"
        class="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full sm:w-auto max-w-xs
               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
               transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <option disabled value="">Категория</option>
        <option v-if="categories.length === 0" disabled>Категория дастрас нест</option>
        <option v-for="c in categories" :key="c">{{ c }}</option>
      </select>

      <!-- Spinner ҳангоми боркунӣ -->
      <div v-if="store.loading" class="flex items-center justify-center w-10 h-10">
        <svg class="animate-spin h-6 w-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>

      <!-- Тугмаҳои Филтр ва Тоза -->
      <transition name="fade" mode="out-in">
        <div v-if="!store.loading" class="flex gap-3">
          <button
            @click="apply"
            class="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white
                   px-6 py-2 rounded font-semibold transition shadow
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Филтр
          </button>

          <button
            @click="reset"
            class="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500
                   text-gray-800 dark:text-gray-200 px-6 py-2 rounded font-semibold
                   transition shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Тоза
          </button>
        </div>
      </transition>
    </div>

    <!-- Агар натиҷаҳо нест -->
    <transition name="fade" mode="out-in">
      <div
        v-if="!store.loading && store.filtered.length === 0"
        class="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm"
      >
        Ягон маҳсулот мувофиқи филтр ёфт нашуд.
      </div>
    </transition>

    <!-- Хатогӣ -->
    <div v-if="store.error" class="text-center text-red-600 dark:text-red-400 mt-4 font-semibold">
      {{ store.error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../store/productStore'

const store = useProductStore()

const price = ref('')
const category = ref('')

const categories = computed(() => store.uniqueCategories)

const apply = () => {
  store.filterBy({
    price: price.value,
    brand: '',          // бренд нест, пас '' мегузорем
    category: category.value
  })
}

const reset = () => {
  price.value = ''
  category.value = ''
  store.resetFilter()
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
