<template>
  <div class="pa-2">
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

    <div
      class="d-flex justify-center mb-5 font-weight-bold text-h5"
    >
      ยืนยันการสั่งอาหาร
    </div>
    <div
      class="d-flex flex-column justify-end mb-2"
      style="height: 25vh; max-height: 200px"
    >
      <div class="d-flex">
        <div>ยอดรวม</div>
        <div class="flex-fill text-right">{{ total }}฿</div>
      </div>
      <div class="d-flex">
        <div>ชำระเงินโดย</div>
        <div class="flex-fill d-flex justify-end align-center">
          <v-icon v-if="payment.icon == null" class="mr-1">mdi-cash</v-icon>
          <v-img
            v-else
            max-height="30"
            max-width="35"
            :src="creditImg[payment.icon]"
            contain
            class="mr-2"
          ></v-img>

          <div>
            {{ payment.title }}
          </div>
        </div>
      </div>
    </div>
    <v-btn
      block
      color="black"
      depressed
      large
      class="rounded-lg mb-2 font-weight-bold primary--text"
      @click="$emit('sendOrder')"
    >
      ยืนยัน
    </v-btn>
    <v-btn
      block
      outlined
      color="grey"
      depressed
      large
      class="rounded-lg font-weight-bold"
      @click="$emit('closeDialog')"
    >
      ยกเลิก
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    payment: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    creditImg: {
      Visa: 'https://www.brandbuffet.in.th/wp-content/uploads/2022/01/New-Iconic-Visa-Brand.png',
      'Master Card':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png',
    },
  }),
}
</script>
