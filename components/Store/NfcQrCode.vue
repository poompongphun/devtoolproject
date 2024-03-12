<template>
  <div>
    <div
      class="d-flex justify-center align-center grey lighten-3 px-3 rounded-xl"
      style="max-width: 198px"
    >
      <div v-if="$vuetify.breakpoint.mdAndUp" class="px-2 font-weight-bold">
        Share with
      </div>
      <v-btn
        color="black"
        icon
        rounded
        class="mt-sm-0 text-none pa-0"
        :disabled="!supported"
        @click="nfDialog = true"
      >
        <v-icon>mdi-nfc</v-icon>
      </v-btn>
      <v-btn
        color="black"
        icon
        rounded
        class="mt-sm-0 text-none pa-0"
        @click="qrDialog = true"
      >
        <v-icon>mdi-qrcode</v-icon>
      </v-btn>
    </div>
    <v-dialog
      v-model="qrDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="pa-4" rounded="xl">
        <div>
          <v-img
            :src="`https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${getUrl()}`"
            width="100%"
          ></v-img>
          <v-btn
            class="mt-4"
            color="success"
            text
            depressed
            block
            :href="`https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${getUrl()}`"
            target="_blank"
            download
          >
            <v-icon left>mdi-download</v-icon>
            Download
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="nfDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="pa-4 text-center py-15" rounded="xl" width="100%">
        <template v-if="status == 1">
          <v-icon x-large color="red"> mdi-close-octagon </v-icon>
          <div class="grey--text mt-2">Write Failed!</div>
        </template>
        <template v-else-if="status == 2">
          <v-icon x-large color="success"> mdi-check-bold </v-icon>
          <div class="grey--text mt-2">Tag written!</div>
        </template>
        <template v-else>
          <v-icon x-large>mdi-nfc-variant</v-icon>
          <div class="grey--text mt-2">Tap your tag to write</div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qrDialog: false,
      nfDialog: false,
      supported: false,
      nfc: null,
      ctrl: null,
      status: 0,
    }
  },
  watch: {
    nfDialog(val) {
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
    getUrl() {
      return window.location.href.replace('myStore', 'store')
    },
    cancel() {
      this.nfc.removeEventListener('reading', this.writeTag)
    },
    start() {
      this.nfc.addEventListener('reading', this.writeTag)
    },
    async writeTag() {
      try {
        await this.nfc.write({
          records: [
            {
              recordType: 'url',
              data: window.location.href.replace('myStore', 'store'),
            },
          ],
        })
        this.status = 2
        setTimeout(() => {
          this.nfDialog = false
          this.status = 0
        }, 1500)
      } catch (error) {
        this.status = 1
        setTimeout(() => {
          this.status = 0
        }, 1500)
      }
    },
  },
}
</script>
