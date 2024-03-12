<template>
  <v-carousel
    v-model="model"
    height="500"
    style="position: relative"
    hide-delimiter-background
    show-arrows-on-hover
    light
    :hide-delimiters="queues.length <= 1"
    :show-arrows="queues.length > 1"
  >
    <v-carousel-item v-for="(queue, i) in queues" :key="i">
      <queue-status :data="queue" />
    </v-carousel-item>
  </v-carousel>
</template>

  <script>
import QueueStatus from './QueueStatus.vue'
export default {
  components: {
    QueueStatus,
  },
  props: {
    queues: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    model: 0,
  }),
}
</script>

  <style>
</style>