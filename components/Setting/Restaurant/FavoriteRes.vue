<template>
  <div>
    <div class="text-h5 d-flex align-center mb-5" style="gap: 10px">
      <v-icon color="black">mdi-heart</v-icon>
      Favorite Restaurant
      <v-spacer></v-spacer>
      <v-chip>{{ restaurants.length }} Restaurants</v-chip>
    </div>
    <restaurant-card
      v-for="(res, i) in $store.state.favorites"
      :key="i"
      :restaurant="res"
      @favorite="$store.commit('removeFavorites', res)"
    />
  </div>
</template>

<script>
import RestaurantCard from './RestaurantCard.vue'
import favorite from '@/JSON/favorites.json'
export default {
  components: { RestaurantCard },
  data: () => ({
    restaurants: favorite,
  }),
}
</script>
