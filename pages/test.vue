<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Nuxt</h1>
    </div>
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
export default {
  name: 'TestPage',
  async mounted() {
    await this.$nextTick()


    // eslint-disable-next-line no-undef, no-unused-vars
    const gmap = new google.maps.Map(this.$refs.map, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    })
  },
}
</script>

<style>
#map {
  height: 50vh;
  width: 100vw;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
