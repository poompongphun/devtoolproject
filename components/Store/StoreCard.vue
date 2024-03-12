<template>
  <v-card
    class="overflow-hidden"
    color="grey lighten-4"
    elevation="0"
    rounded="xl"
    :style="`background-image: url(${store.bgImg});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;`"
      outlined
    @click="() => $router.push(`/myStore/${store.id}`)"
  >
    <v-responsive :aspect-ratio="1 / 1">
      <v-card
        elevation="0"
        class="d-flex justify-start align-end"
        height="100%"
        width="100%"
        color="rgba(255,255,255,0)"
      >
        <div
          class="pa-2 text-left d-flex align-center"
          style="
            width: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 0px;
            backdrop-filter: blur(1px);
          "
        >
          <v-avatar class="rounded-lg" tile size="50" color="grey lighten-4">
            <v-img :src="store.logoImg" alt="res_img" />
          </v-avatar>
          <div class="ml-2 d-flex flex-column justify-start align-start">
            <div class="text-h6 font-weight-medium">{{ store.name }}</div>
            <div
              class="secondary--text hidden-line subtitle-2"
              style="--line: 1"
            >
              {{ store.description }}
            </div>
          </div>
        </div>
      </v-card>
    </v-responsive>
  </v-card>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
</style>