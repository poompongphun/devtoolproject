<template>
  <div>
    <div class="text-h5 d-flex align-center mb-5" style="gap: 10px">
      <v-icon color="black">mdi-history</v-icon>
      Order History
      <v-spacer></v-spacer>
      <v-chip>{{ orders.length }} Orders</v-chip>
    </div>
    <order-card
      v-for="(order, i) in orders"
      :key="i"
      :order="order"
    ></order-card>
  </div>
</template>

<script>
import OrderCard from './OrderCard.vue'
// import order from '@/JSON/orders.json'
export default {
  components: {
    OrderCard,
  },
  data: () => ({
    orders: [],
  }),
  async mounted() {
    const orderHis = await this.$axios.get(
      '/api/order?status=completed,cancled'
    )
    this.orders = orderHis.data
  },
}
</script>
