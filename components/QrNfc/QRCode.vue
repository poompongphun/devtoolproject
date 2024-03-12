<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-transition">
    <v-card
      class="d-flex justify-center align-center text-center"
      style="
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(4px);
      "
    >
      <v-btn
        fab
        small
        depressed
        style="position: absolute; top: 10px; right: 10px; z-index: 4"
        @click="dialog = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div>
        <v-responsive class="pa-4" :aspect-ratio="1 / 1">
          <v-card
            rounded="xl"
            class="overflow-hidden d-flex flex-column justify-center align-center"
            height="300"
            width="300"
          >
            <client-only>
              <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
                <div v-if="validationSuccess" class="validation-success">
                  <v-icon class="my-2" large color="success">
                    mdi-check-bold
                  </v-icon>
                  <div class="text-h6">This is Valid</div>
                </div>

                <div v-if="validationFailure" class="validation-failure">
                  <v-icon class="my-2" large color="red">
                    mdi-close-octagon
                  </v-icon>
                  <div class="text-h6">This is not valid QR Code</div>
                </div>

                <div
                  v-if="validationPending"
                  class="validation-pending text-center"
                >
                  <v-icon class="my-2" large color="primary">
                    mdi-qrcode-scan
                  </v-icon>
                  <div class="text-h6">Scanning</div>
                </div>
              </qrcode-stream>
            </client-only>
            <!-- {{ error }}
            {{ result }} -->
          </v-card>
        </v-responsive>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'QrcodePage',
  middleware: 'auth',
  data: () => ({
    result: null,
    error: null,
    camera: 'auto',
    isValid: undefined,
    dialog: false,
  }),
  computed: {
    validationPending() {
      return this.isValid === undefined && this.camera === 'off'
    },

    validationSuccess() {
      return this.isValid === true
    },

    validationFailure() {
      return this.isValid === false
    },
  },
  watch: {
    dialog(val) {
      this.$emit('dialog', val)
      val ? this.turnCameraOn() : this.turnCameraOff()
    },
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    async onInit(promise) {
      try {
        await promise
        this.resetValidationState()
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        } else if (error.name === 'InsecureContextError') {
          this.error =
            'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
        } else {
          this.error = `ERROR: Camera error (${error.name})`
        }
      }
    },
    resetValidationState() {
      this.isValid = undefined
    },
    async onDecode(content) {
      this.result = content
      this.turnCameraOff()

      // pretend it's taking really long
      await this.timeout(1000)
      this.isValid = content.startsWith('http')

      // some more delay, so users have time to read the message
      await this.timeout(1500)

      if (this.isValid) {
        if (content.includes(window.location.hostname)) {
          const path = content.slice(
            content.indexOf(window.location.hostname) +
              window.location.hostname.length,
            content.length
          )
          this.$router.push(path)
          this.dialog = false
          this.turnCameraOff()
        } else {
          window.location.href = content
        }
      } else {
        this.turnCameraOn()
      }
    },

    turnCameraOn() {
      this.camera = 'auto'
    },

    turnCameraOff() {
      this.camera = 'off'
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },
  },
}
</script>

<style>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>
