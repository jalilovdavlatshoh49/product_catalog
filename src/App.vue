<template>
  <div
    class="min-h-screen flex flex-col
           bg-white text-black
           dark:bg-gray-900 dark:text-white
           transition-colors duration-300 md:pl-48 pb-20 md:pb-0"
  >
    <Navbar />
    <Sidebar />

    <main class="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <router-view />
    </main>

    <Footer />
    <BottomNav />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
import BottomNav from './components/BottomNav.vue'
</script>

<style scoped>
/* Transition сабук барои тағйироти рангҳо ва фон */
div {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Танзими фарқияти хат ва ҳошия барои қисми асосӣ */
main {
  min-height: calc(100vh - 120px); /* Ҷуброни Navbar ва Footer */
  padding: 1.5rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.4s ease, color 0.4s ease;
}

/* Танзими линкҳо ва тугмаҳо бо эффектҳои hover ва focus */
a, button {
  transition: color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

a:hover, button:hover,
a:focus-visible, button:focus-visible {
  outline: none;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
  color: #3b82f6; /* Tailwind blue-500 */
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.375rem; /* Rounded md */
}

/* Анимацияи сабук fade-in ҳангоми боркунӣ */
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
  animation: fadeIn 0.5s ease forwards;
}

/* Танзимот барои экранҳои хурд */
@media (max-width: 640px) {
  main {
    padding: 1rem !important;
  }
}
</style>
