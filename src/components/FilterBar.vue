<template>
  <div
    class="p-4 rounded-lg mb-6
           bg-gray-100 dark:bg-gray-800
           shadow-md
           transition-colors duration-300
           max-w-full
           "
  >
    <div
      class="flex flex-wrap gap-4
             justify-start
             sm:justify-between
             items-center
             "
    >
      <input
        type="number"
        v-model.number="price"
        placeholder="Макс. нарх"
        class="border
               border-gray-300 dark:border-gray-600
               rounded
               px-3 py-2
               w-full sm:w-auto
               max-w-xs
               bg-white dark:bg-gray-700
               text-gray-900 dark:text-gray-100
               placeholder-gray-400 dark:placeholder-gray-500
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
               transition
               "
      />

      <select
        v-model="brand"
        class="border
               border-gray-300 dark:border-gray-600
               rounded
               px-3 py-2
               w-full sm:w-auto
               max-w-xs
               bg-white dark:bg-gray-700
               text-gray-900 dark:text-gray-100
               transition
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
               "
      >
        <option value="" disabled selected>Бренд</option>
        <option v-for="b in brands" :key="b">{{ b }}</option>
      </select>

      <select
        v-model="category"
        class="border
               border-gray-300 dark:border-gray-600
               rounded
               px-3 py-2
               w-full sm:w-auto
               max-w-xs
               bg-white dark:bg-gray-700
               text-gray-900 dark:text-gray-100
               transition
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
               "
      >
        <option value="" disabled selected>Категория</option>
        <option v-for="c in categories" :key="c">{{ c }}</option>
      </select>

      <button
        @click="apply"
        class="bg-blue-600 dark:bg-blue-500
               hover:bg-blue-700 dark:hover:bg-blue-600
               text-white
               px-6 py-2
               rounded
               font-semibold
               transition
               shadow
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
               max-w-full
               sm:max-w-none
               "
      >
        Филтр
      </button>

      <button
        @click="reset"
        class="bg-gray-300 dark:bg-gray-600
               hover:bg-gray-400 dark:hover:bg-gray-500
               text-gray-800 dark:text-gray-200
               px-6 py-2
               rounded
               font-semibold
               transition
               shadow
               focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1
               max-w-full
               sm:max-w-none
               "
      >
        Тоза
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useProductStore } from '../store/productStore'

const store = useProductStore()
const price = ref('')
const brand = ref('')
const category = ref('')

const brands = ref([])
const categories = ref([])

watchEffect(() => {
  brands.value = [...new Set(store.products.map(p => p.brand))].sort()
  categories.value = [...new Set(store.products.map(p => p.category))].sort()
})

const apply = () => {
  store.filterBy({ price: price.value, brand: brand.value, category: category.value })
}

const reset = () => {
  price.value = ''
  brand.value = ''
  category.value = ''
  store.filtered = store.products
}
</script>