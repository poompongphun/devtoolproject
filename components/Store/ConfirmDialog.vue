<template>
  <v-dialog
    v-model="dialog"
    width="auto"
    max-width="350"
    content-class="rounded-xl"
  >
    <v-card class="pa-4" width="500">
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
      <div class="text-center text-h6 font-weight-bold mb-3">
        คุณแน่ใจหรือไม่
      </div>
      <v-divider></v-divider>
      <div class="text-center mt-4 mb-8">
        {{ title }}
      </div>
      <v-row dense class="pb-0">
        <v-col cols="6">
          <v-btn
            block
            color="red"
            depressed
            class="rounded-lg white--text font-weight-bold"
            :loading="loading"
            @click="confirm()"
          >
            ยืนยัน
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            outlined
            color="grey"
            class="rounded-lg font-weight-bold"
            @click="dialog = false"
          >
            ยกเลิก
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    title: '',
    confirmFunction: null,
    loading: false,
  }),
  methods: {
    openDialog(title, confirmFunction) {
      this.title = title
      this.confirmFunction = confirmFunction
      this.dialog = true
    },
    async confirm() {
      this.loading = true
      await this.confirmFunction()
      this.loading = false
      this.dialog = false
    },
  },
}
</script>
