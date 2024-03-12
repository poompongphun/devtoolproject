<template>
  <div>
    <div
      v-if="far"
      class="d-flex justify-center align-center"
      style="height: 100vh"
    >
      <div class="text-center">
        <v-icon class="my-2" x-large color="red">
          mdi-storefront-remove
        </v-icon>
        <div>Your location is too far from the store</div>
      </div>
    </div>
    <div
      v-else-if="allow"
      class="d-flex justify-center align-center"
      style="height: 100vh"
    >
      <div class="text-center">
        <v-icon class="my-2" x-large color="red"
          >mdi-map-marker-remove-outline</v-icon
        >
        <div>Can't acces your location</div>
      </div>
    </div>
    <div v-else>
      <v-parallax width="100%" height="350" :src="store.bgImg"></v-parallax>
      <my-container style="height: auto" class="pa-0">
        <div
          class="white rounded-t-xl center-shadow pa-4 pa-sm-8"
          style="position: relative; margin-top: -150px; min-height: 100vh"
        >
          <div class="d-flex align-center justify-space-between">
            <div class="flex-fill d-flex align-center">
              <v-avatar size="40" class="mr-2" color="grey">
                <v-img :src="store.logoImg" alt="avatar" />
              </v-avatar>
              <div class="flex-fill font-weight-bold" style="font-size: 32px">
                {{ store.name }}
              </div>
            </div>
            <v-btn
              class="mr-2"
              :color="
                $store.state.favorites.some((item) => item.id === store.id)
                  ? 'red'
                  : 'grey'
              "
              outlined
              fab
              x-small
              depressed
              @click="
                $store.state.favorites.some((item) => item.id === store.id)
                  ? $store.commit('removeFavorites', store)
                  : $store.commit('addFavorites', store)
              "
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-chip color="primary" outlined pill class="mt-sm-0">
              <v-icon left>mdi-account-multiple</v-icon>
              <span class="font-weight-bold">{{ orders.length }}</span>
            </v-chip>
          </div>
          <div class="text-h7 mt-4">
            {{ store.description }}
          </div>
          <div class="row mt-2">
            <div class="col-12 col-lg-8">
              <v-tabs
                v-model="selected"
                color="primary"
                show-arrows
                class="overflow-hidden"
                style="
                  position: sticky;
                  top: 64px;
                  z-index: 2;
                  border-bottom: 1px solid #e1e1e1;
                "
                height="40"
              >
                <v-tab v-for="menu in store.menus" :key="menu.id">
                  {{ menu.name }}
                </v-tab>
              </v-tabs>

              <v-tabs-items
                v-model="selected"
                class="mt-2"
                style="background-color: transparent; overflow: visible"
              >
                <v-tab-item v-for="menu in store.menus" :key="menu.id">
                  <food-card
                    v-for="food in store.menus[selected].foods"
                    :key="food.id"
                    :food="food"
                    @openDialog="
                      selectedFood = { ...food, quantity: 1, orderDesc: '' }
                      foodDialogRemovable = false
                      foodDialog = true
                    "
                  >
                  </food-card>
                </v-tab-item>
              </v-tabs-items>
            </div>

            <div v-if="$vuetify.breakpoint.lgAndUp" class="col-4 d-sm-block">
              <cart-box
                :cart="cart"
                @openFoodDialog="
                  (food) => {
                    selectedFood = food
                    foodDialogRemovable = true
                    foodDialog = true
                  }
                "
                @sendOrder="sendOrder"
              ></cart-box>
            </div>
          </div>
        </div>
        <v-dialog
          v-model="foodDialog"
          width="auto"
          max-width="500"
          content-class="rounded-xl"
        >
          <food-dialog
            :food="selectedFood"
            :removable="foodDialogRemovable"
            @closeDialog="foodDialog = false"
            @addFood="addFood"
            @removeFood="removeFood"
          >
          </food-dialog>
        </v-dialog>
        <v-btn
          v-if="!$vuetify.breakpoint.lgAndUp"
          fab
          style="z-index: 1000; position: fixed; right: 5px; bottom: 15px"
          color="black"
          @click="cartDialog = true"
        >
          <v-chip
            v-if="cart.length > 0"
            color="red"
            style="position: absolute; top: -18px; left: 35px; height: 15px"
            class="text-overline pa-1 white--text"
            >{{
              cart.length > 0
                ? cart.reduce((sum, arrVal) => (sum += arrVal.quantity), 0)
                : '0'
            }}</v-chip
          >
          <v-icon size="25" color="white">mdi-cart</v-icon>
          <v-dialog
            v-model="cartDialog"
            width="auto"
            max-width="500"
            content-class="rounded-xl"
          >
            <v-card width="500" class="pa-4 pt-0">
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
                @click="cartDialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <cart-box
                :cart="cart"
                @openFoodDialog="
                  (food) => {
                    selectedFood = food
                    foodDialogRemovable = true
                    foodDialog = true
                  }
                "
                @sendOrder="sendOrder"
              ></cart-box>
            </v-card>
          </v-dialog>
        </v-btn>
      </my-container>
    </div>
  </div>
</template>

<script>
import MyContainer from '~/components/LayoutComponents/MyContainer.vue'
import FoodCard from '~/components/Store/FoodCard.vue'
import CartBox from '~/components/Store/CartBox.vue'
import FoodDialog from '~/components/Store/FoodDialog.vue'

import creditsJSON from '~/JSON/credits.json'
let location = null
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log('User denied the request for Geolocation.')
          break
        case error.POSITION_UNAVAILABLE:
          console.log('Location information is unavailable.')
          break
        case error.TIMEOUT:
          console.log('The request to get user location timed out.')
          break
        case error.UNKNOWN_ERROR:
          console.log('An unknown error occurred.')
          break
      }
    }
  )
} else {
  console.log('Geolocation is not supported by this browser.')
}

export default {
  name: 'StorePage',
  components: {
    MyContainer,
    FoodCard,
    FoodDialog,
    CartBox,
  },
  middleware: 'auth',
  async asyncData({ params, $axios, redirect }) {
    if (location == null) {
      try {
        const store = await $axios.get(`/api/myStore/${params.store}`)
        return { store: store.data }
      } catch (error) {
        return { allow: true }
      }
    }
    try {
      const store = await $axios.get(
        `/api/myStore/${params.store}?location=${location.lat},${location.lng}`
      )
      return { store: store.data }
    } catch (error) {
      return { far: true }
    }
  },
  data: () => ({
    queue: 12,
    selected: 0,
    cart: [],
    credits: creditsJSON,
    foodDialog: false,
    selectedFood: {},
    foodDialogRemovable: false,
    cartDialog: false,
    far: false,
    allow: false,
    orders: [],
  }),
  async fetch() {
    if (this.store) {
      const orders = await this.$axios.get(
        `/api/order/${this.store.id}?status=pending,new`
      )
      this.orders = orders.data
    }
  },
  mounted() {
    if (this.store) {
      this.socket = this.$nuxtSocket({
        channel: '/',
      })
      this.socket.on(`order/mystore/${this.store.id}`, (data) => {
        this.orders = data
      })
    }
  },
  methods: {
    addFood(food, amount, userDesc) {
      const index = this.cart.findIndex((arrVal) => food.id === arrVal.id)
      if (index !== -1) {
        this.cart[index].quantity = amount
        this.cart[index].orderDesc = userDesc
      } else {
        this.cart.push({ ...food, quantity: amount, orderDesc: userDesc })
      }
    },
    removeFood(id) {
      const index = this.cart.findIndex((arrVal) => id === arrVal.id)
      if (index !== -1) {
        this.cart.splice(index, 1)
      }
      this.foodDialog = false
    },
    sendOrder() {
      const orderFoods = []
      for (let i = 0; i < this.cart.length; i++) {
        orderFoods.push({
          id: this.cart[i].id,
          name: this.cart[i].name,
          price: this.cart[i].price,
          amount: this.cart[i].quantity,
        })
      }
      this.$axios
        .post(`/api/order/${this.store.id}`, { foods: orderFoods })
        .then((res) => this.$router.push('/home'))
    },
  },
}
</script>
