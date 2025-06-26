import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: /** @type {Array<{ product: object, qty: number }>} */ ([]),
  }),

  getters: {
    totalItems(state) {
      return state.items.reduce((sum, i) => sum + i.qty, 0)
    },

    totalPrice(state) {
      return state.items.reduce((sum, i) => sum + i.qty * i.product.price, 0)
    },

    // Барои UI: мисол, оё сабад холӣ аст?
    isEmpty(state) {
      return state.items.length === 0
    }
  },

  actions: {
    add(product) {
      const existing = this.items.find(i => i.product.id === product.id)
      if (existing) {
        existing.qty++
      } else {
        this.items.push({ product, qty: 1 })
      }
    },

    remove(productId) {
      this.items = this.items.filter(i => i.product.id !== productId)
    },

    updateQty(productId, qty) {
      if (qty <= 0) {
        this.remove(productId)
        return
      }
      const item = this.items.find(i => i.product.id === productId)
      if (item) {
        item.qty = qty
      }
    },

    clear() {
      this.items = []
    },
  },
})