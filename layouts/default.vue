<template>
  <v-app>
    <nav-bar />
    <v-main class="pt-0">
      <Nuxt />
      <menu-bar v-if="$auth.loggedIn" />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '~/components/LayoutComponents/NavBar.vue'
import MenuBar from '~/components/LayoutComponents/MenuBar.vue'
export default {
  name: 'DefaultLayout',
  components: { NavBar, MenuBar },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.v-application {
  [class*='text-'] {
    font-family: "Noto Sans Thai", sans-serif !important;
  }
  font-family: "Noto Sans Thai", sans-serif !important;
}
</style>
