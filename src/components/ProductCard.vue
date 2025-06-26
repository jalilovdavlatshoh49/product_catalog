<template>
  <router-link :to="`/product/${product.id}`" class="block">
    <div
      class="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300
             bg-white dark:bg-gray-800
             border-gray-300 dark:border-gray-700"
    >
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-40 sm:h-48 md:h-56 object-contain bg-white dark:bg-gray-900"
        loading="lazy"
      />
      <div class="p-4">
        <h3
          class="font-semibold mb-1 line-clamp-2 text-gray-900 dark:text-gray-100"
          :title="product.title"
        >
          {{ product.title }}
        </h3>
        <p class="text-lg font-bold text-gray-800 dark:text-gray-200">
          {{ product.price }} $
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>