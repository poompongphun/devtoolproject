<template>
  <div style="height: 100%">
    <div
      class="d-flex flex-column justify-space-between align-center"
      style="height: 100%"
    >
      <div class="mt-5 text-center">
        <div
          class="text-h6 font-weight-bold"
          style="margin-bottom: -7px !important"
        >
          จำนวนคิว
        </div>
        <div class="primary--text text-h4 font-weight-bold">
          {{ data.store.name }}
        </div>
      </div>

      <v-btn
        color="black"
        height="120"
        width="120"
        depressed
        fab
        x-large
        @click="$refs.OrderDialog.openDialog()"
      >
        <span
          v-if="myQueue.length >= 0 && status <= 3"
          class="text-h3 primary--text"
        >
          {{ myQueue.length }}
        </span>
        <v-icon v-else-if="status == 4" color="primary" size="50">
          mdi-pot-steam
        </v-icon>
        <v-icon v-else-if="status == 5" color="primary" size="50">
          mdi-check-bold
        </v-icon>
      </v-btn>

      <div class="text-center" style="width: 100%; margin: 40px 0px">
        <div
          v-if="$vuetify.breakpoint.smAndDown"
          class="text-h5 font-weight-medium primary--text upAndDown"
        >
          {{ allStatus[status - 1] }}
        </div>
        <v-stepper
          v-model="status"
          elevation="0"
          alt-labels
          style="background: none"
        >
          <v-stepper-header>
            <template v-for="(sts, i) in allStatus">
              <v-stepper-step
                :key="`${i}-step`"
                :class="{
                  upAndDown: status == i + 1 && $vuetify.breakpoint.mdAndUp,
                }"
                :step="i + 1"
                :complete="status > i + 1"
              >
                <span
                  :class="{
                    'primary--text':
                      status == i + 1 && $vuetify.breakpoint.mdAndUp,
                  }"
                  style="text-shadow: none"
                >
                  {{ sts }}
                </span>
              </v-stepper-step>

              <v-divider
                v-if="i < allStatus.length - 1"
                :key="`${i}-divi`"
                :class="{ primary: status >= i + 2 }"
              ></v-divider>
            </template>
          </v-stepper-header>
        </v-stepper>
      </div>
    </div>

    <OrderDialog ref="OrderDialog" :order="data" />
  </div>
</template>

<script>
import OrderDialog from './OrderDialog.vue'
export default {
  name: 'QueueStatus',
  components: {
    OrderDialog,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    allStatus: [
      'สั่งออเดอร์',
      'ยืนยันออเดอร์',
      'รอคิว',
      'กำลังทำอาหาร',
      'เสร็จสิ้น',
    ],
  }),
  computed: {
    status() {
      return this.data.status === 'NEW'
        ? 2
        : this.data.status === 'PENDING' && this.myQueue.length === 0
        ? 4
        : this.data.status === 'PENDING'
        ? 3
        : this.data.status === 'COMPLETED'
        ? 5
        : 1
    },
    myQueue() {
      const index = this.data.store.orders.findIndex(
        (order) => order.id === this.data.id
      )
      const queue = this.data.store.orders.slice(
        0,
        index === -1 ? this.data.store.orders.length : index
      )
      return queue
    },
  },
}
</script>

<style>
.upAndDown {
  animation: upAndDown 0.7s ease-in-out infinite;
}
@keyframes upAndDown {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
