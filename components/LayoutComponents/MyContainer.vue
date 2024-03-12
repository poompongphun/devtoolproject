<template>
  <v-container class="my-container">
    <slot></slot>
  </v-container>
</template>

<style>
.my-container {
  max-width: 1264px;
  min-height: calc(100vh);
  height: 100%;
}
</style>