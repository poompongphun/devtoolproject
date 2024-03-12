<template>
  <div
    class="d-flex flex-column justify-center align-center flex-md-row"
    style="gap: 32px"
  >
    <v-card
      class="center-shadow d-flex justify-center align-center overflow-hidden"
      height="192"
      width="244"
      rounded="xl"
      elevation="0"
      outlined
      @click="scanQRCode()"
    >
      <div class="text-center">
        <v-icon color="black" size="46">mdi-qrcode</v-icon>
        <h3 class="mt-1">Scan QR Code</h3>
      </div>
    </v-card>
    <h2 class="primary--text">OR</h2>
    <NFC />
  </div>
</template>

<script>
import NFC from './NFC.vue'
export default {
  name: 'QrNfc',
  components: { NFC },
  data() {
    return {
      text: 'Scan QR Code or Tap NFC Tag',
    }
  },
  methods: {
    scanQRCode() {
      this.$store.state.qrCode.openDialog()
    },
  },
}
</script>
