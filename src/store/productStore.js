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
        console.log('✅ Продуктҳо боргирӣ шуданд:', data)
      } catch (error) {
        this.error = "❌ Хатогӣ ҳангоми боркунии маҳсулот"
        console.error(this.error, error)
      } finally {
        this.loading = false
      }
    },

    filterBy({ price, brand, category }) {
      this.filtered = this.products.filter(p => {
        const matchPrice = !price || p.price <= price
        // Азбаски бренд нест, ин шартро ҳамеша TRUE мегузорем
        const matchBrand = true
        const matchCategory = !category || p.category === category
        return matchPrice && matchBrand && matchCategory
      })

      console.log('🔍 Маҳсулотҳои филтршуда:', this.filtered)
    },

    resetFilter() {
      this.filtered = [...this.products]
      console.log('♻️ Филтрҳо тоза шуданд')
    }
  },

  getters: {
    filteredCount: (state) => state.filtered.length,

    uniqueBrands: (state) => {
      // Агар лозим набошад, метавонед онро нест кунед ё ҳамин тавр бигузоред
      return [...new Set(state.products.map(p => p.brand))].filter(Boolean).sort()
    },

    uniqueCategories: (state) => {
      return [...new Set(state.products.map(p => p.category))].filter(Boolean).sort()
    }
  }
})
