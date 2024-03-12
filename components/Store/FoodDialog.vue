<template>
  <v-card>
    <v-btn
      fab
      absolute
      small
      style="background-color: rgba(202, 202, 202, 0.3); right: 10px; top: 10px"
      depressed
      @click="$emit('closeDialog')"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-img :src="food.img" height="250px" cover width="500"></v-img>
    <v-card-title style="border-bottom: 2px solid #e1e1e1">
      {{ food.name }}
    </v-card-title>
    <v-card-text class="pa-6">
      <v-text-field
        v-model="orderDesc"
        clearable
        class="mt-1"
        label="รายละเอียดเพิ่มเติม"
        placeholder="เช่น ไม่เผ็ด"
        color="primary"
        outlined
        :value="orderDesc"
      ></v-text-field>
      <div class="mt-4 d-flex justify-center align-center" style="gap: 20px">
        <v-btn
          outlined
          icon
          :disabled="quantity <= 1 && !removable"
          @click="
            quantity <= 1 && removable
              ? $emit('removeFood', food.id)
              : quantity--
          "
        >
          <v-icon
            >mdi-{{
              quantity > 1 || !removable ? 'minus' : 'trash-can-outline'
            }}</v-icon
          >
        </v-btn>
        <div class="text-h5 pa-2">
          {{ quantity }}
        </div>
        <v-btn outlined icon @click="quantity++">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card-text>
    <v-card-actions class="pa-6">
      <v-btn
        class="d-flex justify-space-between align-center rounded-lg px-4"
        width="100%"
        x-large
        depressed
        color="black"
        @click="
          $emit('addFood', food, quantity, orderDesc)
          $emit('closeDialog')
        "
      >
        <span class="white--text">ใส่ในตะกร้า</span>
        <span class="primary--text">฿{{ food.price * quantity }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      required: true,
    },
    removable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    quantity: 1,
    orderDesc: '',
  }),
  watch: {
    food() {
      this.quantity = this.food.quantity
      this.orderDesc = this.food.orderDesc
    },
  },
}
</script>
