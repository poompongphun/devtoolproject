<template>
  <v-card
    class="pa-2 d-flex overflow-hidden elevation-0 rounded-0"
    style="height: 100px; border-bottom: 1px solid #e1e1e1"
  >
    <div style="aspect-ratio: 1 / 1; height: 100%">
      <v-img :aspect-ratio="1 / 1" :src="food.img" class="rounded-lg"></v-img>
    </div>

    <div class="flex-fill d-flex overflow-hidden">
      <div class="flex-fill d-flex flex-column overflow-hidden pl-2">
        <div class="flex-fill black--text">
          {{ food.name }}
        </div>
        <div class="text-h6 primary--text">฿{{ food.price }}</div>
      </div>
      <div class="align-self-end">
        <div class="text-center">
          <v-btn
            color="transparent"
            class="elevation-0 pa-0"
            icon
            @click="$emit('openDialog', food)"
          >
            <v-icon size="30" color="grey"
              >mdi-{{ editable ? 'pencil' : 'plus-circle' }}-outline</v-icon
            >
          </v-btn>
          <v-btn
            v-if="editable"
            color="transparent"
            class="elevation-0 pa-0"
            icon
            @click="$emit('delete')"
          >
            <v-icon size="30" color="red">mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
