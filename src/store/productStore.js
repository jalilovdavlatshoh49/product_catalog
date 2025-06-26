import { defineStore } from 'pinia'
import { fetchProducts } from '../services/productService'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    filtered: [],
    loading: false,
    error: null,
  }),

  actions: {
    async loadProducts() {
      this.loading = true
      this.error = null
      try {
        const data = await fetchProducts()
        this.products = data
        this.filtered = data
      } catch (error) {
        this.error = "❌ Ошибка загрузки продуктов"
        console.error(this.error, error)
      } finally {
        this.loading = false
      }
    },

    filterBy({ price, brand, category }) {
      this.filtered = this.products.filter(p => {
        return (
          (!price || p.price <= price) &&
          (!brand || p.brand === brand) &&
          (!category || p.category === category)
        )
      })
    },

    resetFilter() {
      this.filtered = [...this.products]
    }
  },

  getters: {
    filteredCount: (state) => state.filtered.length,

    uniqueBrands: (state) => {
      const brands = state.products.map(p => p.brand)
      return [...new Set(brands)].filter(Boolean)
    },

    uniqueCategories: (state) => {
      const categories = state.products.map(p => p.category)
      return [...new Set(categories)].filter(Boolean)
    }
  }
})