<template>
  <div>
    <v-card
      class="overflow-hidden rounded-xl my-2"
      elevation="0"
      @click="showFood = !showFood"
    >
      <v-card-title primary-title>
        {{ order.store.name }}
        <v-spacer></v-spacer>
        <div class="text-h6 success--text">
          ฿{{ order.total }}
          <v-icon :style="showFood ? 'transform: rotate(180deg)' : ''">
            mdi-chevron-down
          </v-icon>
        </div>
      </v-card-title>
      <v-expand-transition>
        <div v-if="showFood" class="px-5" @click.stop="">
          <v-card
            class="pa-2"
            rounded="lg"
            color="grey lighten-4"
            elevation="0"
            width="100%"
          >
            <div v-for="(food, i) in order.foods" :key="i" class="d-flex">
              {{ food.name }}
              <v-spacer></v-spacer>
              {{ food.price }}
            </div>
          </v-card>
        </div>
      </v-expand-transition>
      <v-card-actions style="gap: 5px">
        <v-chip>
          <v-icon left> mdi-clock-outline </v-icon>
          {{ order.createdAt.split('T')[0] }}
        </v-chip>
        <v-chip>
          <v-icon left> mdi-clock-check-outline </v-icon>
          {{ order.completedAt.split('T')[0] }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-chip
          class="text-uppercase"
          :color="order.status == 'COMPLETED' ? 'green' : 'red'"
          outlined
        >
          {{ order.status }}
        </v-chip>
      </v-card-actions>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showFood: false,
  }),
}
</script>
