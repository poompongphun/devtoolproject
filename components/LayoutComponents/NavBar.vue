<template>
  <v-app-bar
    class="d-flex justify-center"
    style="z-index: 100; opacity: 0.95; backdrop-filter: blur(4px) !important"
    color="background"
    height="64"
    fixed
    app
    elevate-on-scroll
  >
    <v-toolbar-title
      class="navbar-txt"
      style="cursor: pointer"
      @click="$router.push('/')"
    >
      Doo<span class="navbar-txt primary--text">fat</span>
    </v-toolbar-title>
  </v-app-bar>
</template>

<style>
.navbar-txt {
  font-family: 'Autour One', cursive;
  font-weight: bold;
}
</style>
