<template>
  <div>
    <v-tabs
      v-model="selected"
      color="primary"
      show-arrows
      class="overflow-hidden mt-4"
      style="
        position: sticky;
        top: 64px;
        z-index: 2;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
      "
      grow
      height="40"
    >
      <v-tab style="width: 50%">
        <div
          :style="`font-size: 16px; ${selected == 0 ? '' : 'color: #A7A7A7;'}`"
        >
          ออเดอร์ใหม่
          <v-chip x-small color="red" class="pa-2 white--text">
            {{ newOrders.length > 9 ? '9+' : newOrders.length }}
          </v-chip>
        </div>
      </v-tab>
      <v-tab style="width: 50%">
        <div
          :style="`font-size: 16px; ${selected == 1 ? '' : 'color: #A7A7A7;'}`"
        >
          คิว
          <v-chip x-small color="red" class="pa-2 white--text">
            {{ pendingOrders.length > 9 ? '9+' : pendingOrders.length }}
          </v-chip>
        </div>
      </v-tab>
    </v-tabs>

    <v-tabs-items
      v-model="selected"
      style="background-color: transparent; overflow: visible"
    >
      <v-tab-item>
        <StoreOrderCard
          v-for="(order, i) in newOrders"
          :key="i"
          :order="order"
        />
        <div v-if="newOrders.length == 0">
          <v-card
            class="d-flex justify-center align-center"
            elevation="0"
            height="200"
          >
            <span class="grey--text" style="font-size: 16px">ไม่มีออเดอร์</span>
          </v-card>
        </div>
      </v-tab-item>
      <v-tab-item>
        <StoreOrderCard
          v-for="(order, i) in pendingOrders"
          :key="i"
          :order="order"
        />
        <div v-if="pendingOrders.length == 0">
          <v-card
            class="d-flex justify-center align-center"
            elevation="0"
            height="200"
          >
            <span class="grey--text" style="font-size: 16px">ไม่มีออเดอร์</span>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import StoreOrderCard from '@/components/Store/Order/StoreOrderCard'
export default {
  name: 'StoreOrder',
  components: {
    StoreOrderCard,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: null,
      orders: [],
      socket: null,
    }
  },
  async fetch() {
    const orders = await this.$axios.get(
      `/api/order/${this.id}?status=pending,new`
    )
    this.orders = orders.data
  },
  computed: {
    newOrders() {
      return this.orders.filter((order) => order.status === 'NEW')
    },
    pendingOrders() {
      return this.orders.filter((order) => order.status === 'PENDING')
    },
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    this.socket.on(`order/mystore/${this.id}`, (data) => {
      if (
        data.filter((order) => order.status === 'NEW').length !==
          this.newOrders.length &&
        data.length !== this.orders.length
      ) {
        this.notifyMe()
      }
      this.orders = data
    })
  },
  methods: {
    notifyMe() {
      if (!('Notification' in window)) {
        // Check if the browser supports notifications
        alert('This browser does not support desktop notification')
      } else if (Notification.permission === 'granted') {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notification = new Notification('There are orders updated!')
        console.log(notification)
        // …
      } else if (Notification.permission !== 'denied') {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
          // If the user accepts, let's create a notification
          if (permission === 'granted') {
            const notification = new Notification('There are orders updated!')
            console.log(notification)
            // …
          }
        })
      }
    },
  },
}
</script>
