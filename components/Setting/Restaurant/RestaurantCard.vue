<template>
  <div>
    <v-card
      class="overflow-hidden rounded-xl my-2"
      elevation="0"
      color="grey lighten-4"
      height="150"
      :style="`background-image: url(${restaurant.bgImg});
        background-size: cover;
        background-position: center;`"
      @click="$router.push(`/store/${restaurant.id}`)"
    >
      <v-card
        class="d-flex justify-space-between align-center pa-2"
        width="100%"
        height="100%"
        tile
        color="rgba(255,255,255,0.8)"
        style="backdrop-filter: blur(2px)"
      >
        <div
          class="fill-height text-left d-flex align-center px-5"
          style="max-width: 80%; width: 100%"
        >
          <v-avatar size="70" color="white">
            <v-img :src="restaurant.logoImg" alt="res_img" />
          </v-avatar>
          <div class="ml-5 d-flex flex-column justify-start align-start">
            <div class="text-h5 font-weight-medium">
              {{ restaurant.name }}
            </div>
            <div class="secondary--text hidden-line">
              {{ restaurant.description }}
            </div>
          </div>
        </div>
        <div class="px-2">
          <v-btn color="red" icon @click.stop="$emit('favorite', $event)">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showFood: false,
  }),
  methods: {
    goTo() {
      console.log('Redirect')
    },
  },
}
</script>
