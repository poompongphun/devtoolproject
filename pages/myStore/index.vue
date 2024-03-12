<template>
  <my-container
    class="mt-15"
    style="min-height: calc(100vh - 60px); height: auto"
  >
    <h2 class="d-flex align-center" style="gap: 10px">
      <v-icon size="27" color="black">mdi-storefront</v-icon>
      My Store ({{ stores.length }})
      <v-spacer></v-spacer>
      <v-btn
        class="primary--text"
        color="black"
        rounded
        large
        depressed
        @click="$refs.newStoreDialog.openDialog()"
      >
        <v-icon color="primary" left>mdi-plus</v-icon>
        New Store
      </v-btn>
    </h2>
    <v-divider class="mt-2 mb-8"></v-divider>
    <v-row class="fill-height">
      <v-col
        v-for="(store, i) in stores"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <store-card :store="store" />
      </v-col>
      <v-col
        v-if="stores.length == 0"
        class="text-center font-weight-medium py-16"
      >
        <span class="pa-3 rounded-lg grey lighten-4">Not found your store</span>
      </v-col>
    </v-row>
    <new-store-dialog
      ref="newStoreDialog"
      :title="
        stores.length == 0 ? 'ไม่มีร้านใช่ไหมสร้างเลย' : 'Create New Store'
      "
      @submit="submit"
    />
  </my-container>
</template>

<script>
import MyContainer from '~/components/LayoutComponents/MyContainer.vue'
import StoreCard from '~/components/Store/StoreCard.vue'
import NewStoreDialog from '~/components/Store/NewStoreDialog.vue'

export default {
  name: 'StorePage',
  components: { MyContainer, StoreCard, NewStoreDialog },
  middleware: 'auth',
  async asyncData({ $axios }) {
    const stores = await $axios.get(`/api/myStore/`)
    return { stores: stores.data }
  },
  mounted() {
    if (this.stores.length === 0) this.$refs.newStoreDialog.openDialog()
  },
  methods: {
    submit(data) {
      this.$axios
        .post('/api/myStore', {
          name: data.name,
          description: data.description,
        })
        .then((res) => this.$router.push(`/myStore/${res.data.id}`))
    },
  },
}
</script>
