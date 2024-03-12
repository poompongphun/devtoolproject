<template>
  <v-card
    class="mt-2 overflow-hidden elevation-0 d-flex rounded-0"
    style="border-bottom: 1px solid #e1e1e1"
  >
    <div>
      <v-chip label outlined class="px-1 text-bold mr-2" style="height: 20px">{{
        food.quantity
      }}</v-chip>
    </div>
    <div class="flex-fill d-flex flex-column">
      <div class="flex-fill">
        <div>{{ food.name }}</div>
        <div
          v-if="food.orderDesc !== null && food.orderDesc !== ''"
          class="text-caption"
        >
          -{{ food.orderDesc }}
        </div>
      </div>
      <div>
        <v-btn
          color="primary"
          text
          elevation="0"
          class="pa-0"
          @click="$emit('openDialog')"
          >แก้ไข <v-icon size="20">mdi-pencil-outline</v-icon></v-btn
        >
      </div>
    </div>
    <div>฿{{ food.price * food.quantity }}</div>
  </v-card>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      required: true,
    },
  },
}
</script>
