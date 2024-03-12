<template>
  <v-dialog
    v-model="dialog"
    content-class="overflow-hidden rounded-xl"
    max-width="500"
    transition="dialog-transition"
  >
    <v-card max-width="500" elevation="0">
      <v-card-title primary-title>
        <div class="d-flex justify-center align-center" style="gap: 5px">
          {{ order.store.name }}
          <span style="font-size: 14px; color: rgb(134, 134, 134)">
            #{{ order.id }}
          </span>
        </div>
        <v-spacer></v-spacer>
        <div class="text-h6 success--text">฿{{ order.total }}</div>
      </v-card-title>
      <div class="px-5" @click.stop="">
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
      <v-card-actions style="gap: 5px">
        <v-chip>
          <v-icon left> mdi-clock-outline </v-icon>
          {{ order.createdAt.split('T')[0] }}
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
  </v-dialog>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    openDialog() {
      this.dialog = true
    },
  },
}
</script>

<style></style>
