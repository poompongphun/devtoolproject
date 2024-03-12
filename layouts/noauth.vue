<template>
  <v-app>
    <no-auth-nav-bar :is-top="isTop" />
    <v-main class="pt-0">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NoAuthNavBar from '~/components/LayoutComponents/NoAuthNavBar.vue'
export default {
  name: 'DefaultLayout',
  components: { NoAuthNavBar },
  data: () => ({
    isTop: true,
    loading: true,
  }),
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => {
        this.$nuxt.$loading.finish()
        this.loading = false
        this.$store.commit('setLoading', this.loading)
      }, 500)
    })
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isTop = !(window.scrollY > 0)
    },
  },
}
</script>

<style lang="scss">
.v-application {
  [class*='text-'] {
    font-family: 'Noto Sans Thai', sans-serif !important;
  }
  font-family: 'Noto Sans Thai', sans-serif !important;
}
</style>
