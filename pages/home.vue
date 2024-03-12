<template>
  <my-container>
    <div
      class="fill-height d-flex flex-column align-center"
      :class="{
        'justify-center': orders.length == 0,
        'pt-13': orders.length !== 0,
      }"
      :style="{ gap: '50px' }"
    >
      <div
        v-if="orders.length > 0"
        style="
          width: 100%;
          background: url(https://storage.googleapis.com/doofat_bucket/default/defaultBg.jpg);
        "
      >
        <div
          style="
            background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 5%, rgba(255,255,255,0.9) 95%, rgba(255,255,255,1) 100%);
          "
        >
          <all-queues :queues="orders" />
          <v-divider class="mt-8"></v-divider>
        </div>
      </div>
      <qr-nfc-card />
    </div>
  </my-container>
</template>

<script>
import QrNfcCard from '~/components/QrNfc/QrNfcCard.vue'
import MyContainer from '~/components/LayoutComponents/MyContainer.vue'
import AllQueues from '~/components/Queue/AllQueues.vue'

export default {
  name: 'IndexPage',
  components: { MyContainer, QrNfcCard, AllQueues },
  middleware: 'auth',
  data() {
    return {
      socket: null,
      orders: [],
    }
  },
  async mounted() {
    const orders = await this.$axios.get('/api/order?status=pending,new')
    this.orders = orders.data
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    const storeIds = []
    await orders.data.forEach(async (order) => {
      if (!storeIds.includes(order.storeId)) {
        storeIds.push(order.storeId)
        await this.socket.on(`order/store/${order.storeId}`, (data) => {
          this.updateQueue(data, order.storeId)
        })
      }
      await this.socket.on(`order/${order.id}`, (data) => {
        this.updateData(data)
      })
    })
  },
  methods: {
    updateData(data) {
      const index = this.orders.findIndex((order) => order.id === data.id)
      this.orders[index].status = data.status
    },
    updateQueue(data, storeId) {
      this.orders.forEach((order, i) => {
        if (order.storeId === storeId) {
          order.store.orders = data
        }
      })
    },
  },
}
</script>
