<template>
  <div>
    <div class="text-h5 d-flex align-center mb-5" style="gap: 10px">
      <v-icon color="black">mdi-credit-card</v-icon>
      Payment Method
      <v-spacer></v-spacer>
      <v-chip>{{ $store.state.credits.length }} Payments</v-chip>
    </div>
    <add-credit @submit="addCredit" />
    <payment-card
      v-for="(credit, i) in $store.state.credits"
      :key="i"
      :credit="credit"
      @delete="$store.commit('removeCredits', i)"
    />
  </div>
</template>

<script>
import PaymentCard from '~/components/Setting/Payment/PaymentCard.vue'
import AddCredit from '~/components/Setting/Payment/AddCredit.vue'
import credit from '@/JSON/credits.json'
export default {
  components: { PaymentCard, AddCredit },
  data: () => ({
    credits: credit,
  }),
  methods: {
    addCredit(credit) {
      this.$store.commit('addCredits', {
        ...credit,
        id: this.credits.length + 1,
        name:
          Math.ceil((Math.random() * 10) / 5) === 1 ? 'Visa' : 'Master Card',
      })
    },
  },
}
</script>
