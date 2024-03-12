<template>
  <v-dialog v-model="dialog" width="auto" scrollable content-class="rounded-xl">
    <v-card width="600">
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
        @click="dialog = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="text-h5 font-weight-bold text-center py-4">แก้ไขร้าน</div>
      <v-card-text class="pa-0 ma-0 px-4">
        <v-form ref="form" @submit="submit()">
          <div style="position: relative">
            <v-icon
              color="black"
              size="25"
              style="
                position: absolute;
                bottom: -10px;
                right: -10px;
                z-index: 4;
              "
            >
              mdi-image-edit-outline
            </v-icon>
            <v-btn
              outlined
              tile
              block
              class="pa-0 mr-2 rounded-xl overflow-hidden"
              height="200"
              color="grey"
              @click="
                $refs.bgSelect.value = null
                $refs.bgSelect.click()
              "
            >
              <v-img
                :src="bg"
                height="200"
                width="1"
                class="rounded-lg"
              ></v-img>
              <input
                ref="bgSelect"
                type="file"
                style="display: none"
                @change="selectBg()"
              />
            </v-btn>
          </div>
          <div class="d-flex mt-4 align-center" style="gap: 10px">
            <v-btn
              outlined
              icon
              x-large
              class="pa-0 mr-2"
              color="grey"
              style="position: relative"
              @click="
                $refs.logoSelect.value = null
                $refs.logoSelect.click()
              "
            >
              <v-icon
                color="black"
                size="25"
                style="
                  position: absolute;
                  bottom: -12px;
                  right: -12px;
                  z-index: 4;
                "
              >
                mdi-image-edit-outline
              </v-icon>
              <v-avatar>
                <v-img :src="logo" alt="avatar" />
              </v-avatar>
              <input
                ref="logoSelect"
                type="file"
                style="display: none"
                @change="selectLogo()"
              />
            </v-btn>
            <v-text-field
              v-model="name"
              name="name"
              label="Name"
              :rules="nameRules"
            ></v-text-field>
          </div>
          <v-textarea
            v-model="description"
            name="description"
            label="Description"
            rows="1"
          ></v-textarea>
          <v-text-field
            v-model="location"
            name="location"
            label="Location"
            readonly
            hint="if empty everyone can view store"
            clearable
            :append-icon="showMap ? 'mdi-map-marker' : 'mdi-map-marker-off'"
            @click:append="showMap = !showMap"
            @click:clearable="clear()"
          >
          </v-text-field>
          <v-text-field
            v-model="range"
            type="number"
            name="range"
            hint="if 0, range will be unlimited"
            label="Range (meter)"
            :disabled="!location"
            @input="updateCircle(latLng)"
          >
          </v-text-field>
          <div
            v-show="showMap"
            id="map"
            ref="map"
            style="height: 300px; width: 100%"
          ></div>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-0 pa-4">
        <v-btn
          block
          depressed
          class="rounded-lg white--text"
          color="black"
          :loading="loading"
            :disabled="$refs.form ? !$refs.form.validate() : true"
          @click="submit()"
        >
          บันทึก
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    name: '',
    description: '',
    location: '',
    range: 0,
    logo: null,
    uploadLogo: null,
    bg: null,
    uploadBg: null,

    loading: false,
    showMap: false,
    latLng: null,
    map: null,
    markers: null,
    circle: null,

    nameRules: [(v) => !!v || 'Name is required'],
  }),
  watch: {
    showMap(val) {
      if (val) {
        this.initMap()
      }
    },
    location(val) {
      if (!val) {
        this.clear()
      }
    },
  },
  methods: {
    openDialog() {
      this.name = this.store.name
      this.description = this.store.description
      this.location = this.store.location
      this.range = this.store.range
      this.logo = this.store.logoImg
      this.bg = this.store.bgImg

      this.dialog = true
    },
    getMapElement() {
      return this.$refs.map
    },
    initMap() {
      // eslint-disable-next-line no-undef, no-unused-vars
      const gmap = new google.maps.Map(this.$refs.map, {
        center: { lat: 13.7546431, lng: 100.4992776 },
        zoom: this.location ? 14 : 8,
      })
      this.map = gmap

      if (this.location) {
        const [lat, lng] = this.location.split(',')
        // eslint-disable-next-line no-undef, no-unused-vars
        this.latLng = new google.maps.LatLng(lat, lng)
        this.placeMarker(this.latLng)
        this.updateCircle(this.latLng)
      }

      this.map.addListener('click', (event) => {
        this.latLng = event.latLng
        this.updateCircle(this.latLng)
        this.placeMarker(this.latLng)
        const clickedLat = this.latLng.lat()
        const clickedLng = this.latLng.lng()
        this.location = `${clickedLat},${clickedLng}`
      })
    },
    placeMarker(latLng) {
      if (this.marker) {
        this.marker.setMap(null)
      }

      // eslint-disable-next-line no-undef, no-unused-vars
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
      })

      // Center the map on the marker position
      this.map.setCenter(latLng)
    },
    updateCircle(latLng) {
      if (this.circle) {
        this.circle.setMap(null)
      }
      // eslint-disable-next-line no-undef, no-unused-vars
      this.circle = new google.maps.Circle({
        map: this.map,
        center: latLng,
        radius: Number(this.range), // Radius in meters
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      })

      this.map.setCenter(latLng)
    },
    clear() {
      if (this.map) {
        this.latLng = null
        this.markers = null
        this.circle = null
        this.marker?.setMap(null)
        this.circle?.setMap(null)
      }
      this.location = ''
      this.range = 0
    },
    selectLogo() {
      const file = this.$refs.logoSelect.files[0]
      this.uploadLogo = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.logo = reader.result
      }
    },
    selectBg() {
      const file = this.$refs.bgSelect.files[0]
      this.uploadBg = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.bg = reader.result
      }
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('description', this.description)
        formData.append('location', this.location)
        formData.append('range', this.range)
        if (this.uploadLogo) {
          formData.append('logoImg', this.uploadLogo)
        }
        if (this.uploadBg) {
          formData.append('bgImg', this.uploadBg)
        }
        const update = await this.$axios.patch(
          `api/myStore/${this.store.id}`,
          formData
        )
        if (update) {
          setTimeout(
            () => {
              this.$emit('update', update.data)
              this.uploadLogo = null
              this.uploadBg = null
              this.loading = false
              this.dialog = false
            },
            this.uploadLogo || this.uploadBg ? 2500 : 250
          )
        }
      }
    },
  },
}
</script>
