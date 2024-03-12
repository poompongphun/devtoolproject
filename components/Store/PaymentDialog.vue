<template>
  <div>
    <div class="text-h5 d-flex align-center mb-5" style="gap: 10px">
      <v-btn
        fab
        absolute
        small
        style="
          background-color: rgba(202, 202, 202, 0.3);
          right: 10px;
          top: 10px;
        "
        depressed
        @click="$emit('closeDialog')"
      >
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
      <v-icon color="black">mdi-credit-card</v-icon>
      <div
        class="font-weight-bold d-flex justify-start align-center"
        style="gap: 5px"
      >
        Payment Method
        <span style="font-size: 16px; color: rgb(133, 133, 133)"
          >({{ credits.length }} Payments)</span
        >
      </div>
      <v-spacer></v-spacer>
    </div>
    <v-list>
      <v-list-item-group v-model="selectedPayment" color="primary" mandatory>
        <v-list-item
          v-for="(credit, i) in credits"
          :key="i"
          class="pa-0 rounded-lg overflow-hidden my-2"
        >
          <div
            style="width: 100%; border: 1px solid #ededed; height: 80px"
            class="rounded-lg d-flex align-center"
          >
            <payment-card
              :background="false"
              :credit="credit"
              :removable="false"
              @delete="credits.splice(i, 1)"
            />
          </div>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import PaymentCard from '~/components/Setting/Payment/PaymentCard.vue'
// import credit from '@/JSON/credits.json'
export default {
  components: { PaymentCard },
  data: () => ({
    // credits: [{ holderName: 'เงินสด', number: 'เงินสด' }].concat(credit),
    selectedPayment: 0,
  }),
  computed: {
    credits() {
      return [{ holderName: 'เงินสด', number: 'เงินสด' }].concat(
        this.$store.state.credits
      )
    },
  },
  watch: {
    selectedPayment() {
      const payment = this.credits[this.selectedPayment]
      this.$emit('setPaymentMethod', payment)
    },
  },
  methods: {
    addCredit(credit) {
      this.credits.push({
        ...credit,
        id: this.credits.length + 1,
        name:
          Math.ceil((Math.random() * 10) / 5) === 1 ? 'Visa' : 'Master Card',
      })
    },
  },
}
</script>
