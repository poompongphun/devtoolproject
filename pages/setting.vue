<template>
  <my-container
    class="mt-15 d-flex flex-column"
    style="min-height: calc(100vh - 60px); height: auto"
  >
    <div class="text-center d-flex justify-center align-center my-6">
      <div
        class="d-flex flex-column justify-center align-center"
        style="gap: 15px"
      >
        <v-avatar size="100" color="grey lighten-4">
          <v-img :src="$auth.user.avatar" alt="avatar" />
        </v-avatar>
        <div>
          <div class="text-h4 mt-2 font-weight-medium">
            {{ $auth.user.name }}
          </div>
          <div class="secondary--text">
            {{ $auth.user.email }}
          </div>
        </div>
        <v-btn color="black" class="primary--text" rounded depressed large @click="$store.commit('setProfileDialog', !$store.state.profileDialog)">
          Edit Profile
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="5" md="3">
        <v-list>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              class="rounded-lg overflow-hidden"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="rounded-lg overflow-hidden red--text"
              @click="$auth.logout()"
            >
              <v-list-item-icon>
                <v-icon color="red">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-divider
        class="my-8"
        :vertical="$vuetify.breakpoint.smAndUp"
      ></v-divider>
      <v-col cols="12" sm="7" md="9" class="pa-9">
        <v-expand-transition>
          <div
            v-if="selectedItem == null"
            class="d-flex justify-center align-center"
            style="height: 100%"
          >
            <span class="grey--text lighten-1">Setting Page</span>
          </div>
        </v-expand-transition>
        <v-tabs-items
          v-if="selectedItem != null"
          v-model="selectedItem"
          vertical
          style="min-height: 100%"
        >
          <v-tab-item style="height: 100%">
            <order-history></order-history>
          </v-tab-item>
          <v-tab-item style="height: 100%">
            <favorite-res></favorite-res>
          </v-tab-item>
          <v-tab-item style="height: 100%">
            <payment-method></payment-method>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </my-container>
</template>

<script>
import MyContainer from '~/components/LayoutComponents/MyContainer.vue'
import FavoriteRes from '~/components/Setting/Restaurant/FavoriteRes.vue'
import OrderHistory from '~/components/Setting/Order/OrderHistory.vue'
import PaymentMethod from '~/components/Setting/Payment/PaymentMethod.vue'
export default {
  name: 'SettingPage',
  components: { MyContainer, FavoriteRes, OrderHistory, PaymentMethod },
  middleware: 'auth',
  data: () => ({
    selectedItem: null,
    tab: null,
    items: [
      {
        icon: 'mdi-history',
        text: 'Order History',
      },
      {
        icon: 'mdi-heart',
        text: 'Favorite Restaurant',
      },
      {
        icon: 'mdi-credit-card',
        text: 'Payment Method',
      },
    ],
  }),
}
</script>