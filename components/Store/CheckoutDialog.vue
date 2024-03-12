<template>
  <v-card width="100%" class="white center-shadow pa-4 rounded-xl">
    <div class="text-h3 text-center text-decoration-underline">Checkout</div>
    <div class="d-md-flex pa-0" style="min-height: 200px">
      <div class="col-md-6 pa-0 mt-2">
        <div class="text-h4">Order From</div>
        <div class="d-flex mt-2">
          <v-avatar size="150">
            <img :src="store.avatar" alt="avatar" />
          </v-avatar>
          <div class="flex-fill pl-2">
            <div class="text-h5">{{ store.name }}</div>
            <div class="mt-2 text-h7 hidden-line" style="--line: 4">
              {{ store.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 d-flex flex-column mt-2 pa-0">
        <div class="text-h4">Payment Method</div>
        <v-card
          class="overflow-auto rounded-xl elevation-3 mt-2 flex-fill"
          style="max-height: 200px"
        >
          <v-list class="pa-0">
            <v-list-item-group mandatory color="primary">
              <v-list-item v-for="credit in credits" :key="credit.id">
                <payment-card
                  :credit="credit"
                  style="width: 100%"
                ></payment-card>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
    </div>
    <div class="text-h4 mt-2">Items</div>
    <v-card
      class="overflow-auto pa-4 pt-0 rounded-xl elevation-5 mt-2"
      style="height: max(calc(100vh - 50rem), 400px)"
    >
      <food-card
        v-for="food in cartItems"
        :key="food.id"
        :food="food"
        :show-add-cart="false"
        :with-quantity="true"
      >
      </food-card>
    </v-card>
    <div class="d-flex mt-4">
      <div
        class="success--text flex-fill text-h4 align-center d-flex text-decoration-underline"
      >
        Total
        {{
          cartItems.reduce((sum, val) => (sum += val.price * val.quantity), 0)
        }}
        ฿
      </div>
      <v-btn color="success" class="rounded-lg text-h6 pa-6 text-capitalize"
        >Confirm Order</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import PaymentCard from '~/components/Setting/Payment/PaymentCard.vue'
import FoodCard from '~/components/Store/FoodCard.vue'
export default {
  components: {
    PaymentCard,
    FoodCard,
  },
  props: {
    store: {
      type: Object,
      required: true,
    },
    credits: {
      type: Array,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
  },
}
</script>
