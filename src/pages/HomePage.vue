<template>
  <section
    class="container mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 min-h-screen"
    aria-live="polite"
  >
    <div class="mb-6">
      <FilterBar />
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-700 dark:text-gray-300 font-medium">
      Loading...
    </div>

    <div
      v-else
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <ProductCard
        v-for="(p, i) in store.filtered"
        :key="p.id"
        :product="p"
        :style="{ '--index': `${i}` }"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '../store/productStore'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const store = useProductStore()
const loading = ref(false)

onMounted(async () => {
  if (!store.products.length) {
    loading.value = true
    await store.loadProducts()
    loading.value = false
  }
})
</script>

<style scoped>
/* Агар мехоҳед, hover ва анимацияҳоро дар ин ҷо нест кунед ва дар ProductCard.vue гузоред */

.grid > * {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.5s forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

/* Агар hover эффект дар ProductCard.vue илова шудааст, инро нест кунед */
/*
.grid > *:hover {
  transform: translateY(-5px) scale(1.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}
*/

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>