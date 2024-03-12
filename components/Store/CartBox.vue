<template>
  <div class="overflow-hidden" style="position: sticky; top: 64px; z-index: 2">
    <div
      class="text-center pa-2 font-weight-bold d-flex justify-center align-center"
      style="border-bottom: 1px solid #e1e1e1; height: 40px"
      :style="{
        'font-size': $vuetify.breakpoint.mdAndDown ? '24px' : '16px',
        'height': $vuetify.breakpoint.mdAndDown ? '60px' : '40px',
      }"
    >
      ตะกร้า
    </div>
    <div
      class="overflow-auto pt-0"
      style="max-height: max(calc(100vh - 30rem), 200px); min-height: 200px"
    >
      <cart-card
        v-for="food in cart"
        :key="food.id"
        :food="food"
        @openDialog="$emit('openFoodDialog', food)"
      >
      </cart-card>
    </div>
    <div class="mt-2">
      <v-btn
        color="grey"
        outlined
        class="black--text justify-start pa-2 rounded-lg"
        style="border-color: #ededed; width: 100%; height: auto"
        @click="paymentDialog = true"
      >
        <div class="flex-fill">
          <div class="text-left text-body-1">ชำระเงินโดย</div>
          <div class="d-flex mt-2" style="width: 100%">
            <v-icon v-if="selectedPayment.icon == null" class="mr-1"
              >mdi-cash</v-icon
            >
            <v-img
              v-else
              max-height="25"
              max-width="30"
              :src="creditImg[selectedPayment.icon]"
              contain
              class="mr-1"
            ></v-img>

            <div class="flex-fill text-left d-flex align-center">
              {{ selectedPayment.title }}
            </div>
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </div>
        <v-dialog
          v-model="paymentDialog"
          width="auto"
          max-width="500"
          content-class="rounded-xl"
        >
          <v-card class="pa-4" width="500">
            <payment-dialog
              @closeDialog="paymentDialog = false"
              @setPaymentMethod="setPaymentMethod"
            >
            </payment-dialog>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-btn
        :disabled="cart.length <= 0"
        large
        color="black"
        class="d-flex py-2 px-3 mt-4 rounded-lg"
        style="width: 100%"
        @click="confirmDialog = true"
      >
        <v-chip
          color="white"
          label
          class="px-1 primary--text font-weight-bold mr-2 d-flex align-center justify-center"
          style="height: 20px"
        >
          {{ itemCount }}
        </v-chip>
        <div class="flex-fill text-left white--text">สั่งเลย</div>
        <div class="primary--text font-weight-bold">฿{{ orderTotal }}</div>
        <v-dialog
          v-model="confirmDialog"
          width="auto"
          max-width="500"
          content-class="rounded-xl"
        >
          <v-card class="pa-4" width="400">
            <confirm-order-dialog
              :total="orderTotal"
              :payment="selectedPayment"
              @closeDialog="confirmDialog = false"
              @sendOrder="sendOrder()"
            >
            </confirm-order-dialog>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </div>
</template>

<script>
import CartCard from '~/components/Store/CartCard.vue'
import PaymentDialog from '~/components/Store/PaymentDialog.vue'
import ConfirmOrderDialog from '~/components/Store/ConfirmOrderDialog.vue'
export default {
  components: {
    CartCard,
    PaymentDialog,
    ConfirmOrderDialog,
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    selectedPayment: { title: 'เงินสด', icon: null },
    paymentDialog: false,
    confirmDialog: false,
    creditImg: {
      Visa: 'https://www.brandbuffet.in.th/wp-content/uploads/2022/01/New-Iconic-Visa-Brand.png',
      'Master Card':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png',
    },
  }),
  computed: {
    orderTotal() {
      return this.cart.length > 0
        ? this.cart.reduce(
            (sum, arrVal) => (sum += arrVal.price * arrVal.quantity),
            0
          )
        : 0
    },
    itemCount() {
      return this.cart.length > 0
        ? this.cart.reduce((sum, arrVal) => (sum += arrVal.quantity), 0)
        : '0'
    },
  },
  methods: {
    setPaymentMethod(credit) {
      this.selectedPayment.title = credit.number
      this.selectedPayment.icon = credit.name
    },
    sendOrder() {
      this.$emit('sendOrder')
    },
  },
}
</script>
