<template>
  <div>
    <v-card
      class="center-shadow d-flex justify-center align-center overflow-hidden"
      height="192"
      width="244"
      rounded="xl"
      elevation="0"
      outlined
      :disabled="!supported"
      @click="startScan()"
    >
      <div class="text-center">
        <v-icon color="black" size="46">mdi-nfc</v-icon>
        <h3 class="mt-1">Tap NFC Tag</h3>
      </div>
      <div
        v-if="!supported"
        class="d-flex justify-center align-center"
        style="
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.9);
          position: absolute;
          backdrop-filter: blur(4px);
        "
      >
        <div class="text-center px-4">Your browser does not support NFC</div>
      </div>
    </v-card>
    <v-dialog v-model="dialog" fullscreen transition="dialog-transition">
      <v-card
        class="d-flex justify-center align-center"
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
        <div v-if="status == 1" class="text-center">
          <v-icon class="my-2" large color="red"> mdi-close-octagon </v-icon>
          <div class="text-h6">{{ failMessage }}</div>
        </div>
        <div v-else-if="status == 2" class="text-center">
          <v-icon class="my-2" large color="success"> mdi-check-bold </v-icon>
          <div class="text-h6">{{ successMessage }}</div>
        </div>
        <div v-else class="text-center">
          <v-icon class="my-2" large color="primary">
            mdi-nfc-search-variant
          </v-icon>
          <div class="text-h6">Scanning</div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'QrNfc',
  data() {
    return {
      supported: false,
      text: 'Scan QR Code or Tap NFC Tag',
      nfc: null,
      ctrl: null,
      dialog: false,

      status: 0,
      successMessage: '',
      failMessage: '',
    }
  },
  watch: {
    dialog(val) {
      if (val) {
        this.start()
      } else {
        this.cancel()
      }
    },
  },
  async mounted() {
    if ('NDEFReader' in window) {
      // eslint-disable-next-line no-undef
      this.nfc = new NDEFReader()
      this.ctrl = new AbortController()
      await this.nfc.scan({ signal: this.ctrl.signal })
      this.supported = true
    }
  },
  destroyed() {
    if (this.ctrl) {
      this.ctrl.abort()
    }
  },
  methods: {
    startScan() {
      this.dialog = true
    },
    // async writeTag() {
    //   if ('NDEFReader' in window) {
    //     // eslint-disable-next-line no-undef
    //     const ndef = new NDEFReader()
    //     try {
    //       await ndef.write({
    //         records: [{ recordType: 'url', data: 'http://pongphun.com' }],
    //       })
    //       alert('NDEF message written!')
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   } else {
    //     console.log('Web NFC is not supported.')
    //   }
    // },
    cancel() {
      this.nfc.removeEventListener('reading', this.readTag)
    },
    start() {
      this.nfc.addEventListener('reading', this.readTag)
    },
    async readTag({ message }) {
      if (
        message.records.length === 0 || // unformatted tag
        message.records[0].recordType === 'empty'
      ) {
        this.status = 1
        this.failMessage = 'Empty tag. Please try another one.'
        setTimeout(() => {
          this.status = 0
        }, 1500)
      } else {
        const deconded = await this.decoder(message)
        if (deconded.startsWith('URL: ')) {
          this.status = 2
          this.successMessage = deconded
          // if same domain name
          setTimeout(() => {
            if (deconded.includes(window.location.hostname)) {
              const path = deconded.slice(
                deconded.indexOf(window.location.hostname) +
                  window.location.hostname.length,
                deconded.length
              )
              this.$router.push(path)
            } else {
              window.location.href = deconded.replace('URL: ', '')
            }
          }, 1500)
        } else {
          this.status = 1
          this.successMessage = 'This is not a valid tag.'
          setTimeout(() => {
            this.status = 0
          }, 1500)
        }
      }
    },
    decoder(data) {
      const decoder = new TextDecoder()
      let message = ''
      for (const record of data.records) {
        switch (record.recordType) {
          case 'text':
            // eslint-disable-next-line no-case-declarations
            const textDecoder = new TextDecoder(record.encoding)
            message = `Text: ${textDecoder.decode(record.data)} (${
              record.lang
            })`
            break
          case 'url':
            message = `URL: ${decoder.decode(record.data)}`
            break
          case 'mime':
            if (record.mediaType === 'application/json') {
              message = `JSON: ${JSON.parse(decoder.decode(record.data))}`
            } else if (record.mediaType.startsWith('image/')) {
              const blob = new Blob([record.data], {
                type: record.mediaType,
              })

              const img = document.createElement('img')
              img.src = URL.createObjectURL(blob)
              img.onload = () => window.URL.revokeObjectURL(this.src)

              document.body.appendChild(img)
            } else {
              message = `Media not handled`
            }
            break
          default:
            message = `Record not handled`
        }
      }
      return message
    },
  },
}
</script>
