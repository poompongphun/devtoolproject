<template>
  <v-dialog
    v-model="dialog"
    width="auto"
    max-width="500"
    content-class="rounded-xl"
  >
    <v-card class="pa-4" width="500">
      <v-btn
        plain
        icon
        color="black"
        style="position: absolute; top: 15px; left: 15px; z-index: 4"
        @click="dialog = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="text-center text-h5 font-weight-bold mt-2">
        {{ isEdit ? 'แก้ไขเมนู' : 'เพื่มเมนู' }}
      </div>
      <v-form v-model="formValid" class="mt-4">
        <v-text-field
          v-model="menuTitle"
          :rules="menuTitleRules"
          :counter="25"
          clearable
          label="ชื่อเมนู"
          color="primary"
          outlined
          required
          :value="menuTitle"
        ></v-text-field>
      </v-form>
      <v-btn
        block
        color="primary"
        large
        depressed
        class="font-weight-bold rounded-lg mb-2"
        :disabled="!formValid"
        :loading="loading"
        @click="sendRequest()"
      >
        ยืนยัน
      </v-btn>
      <v-btn
        block
        outlined
        color="grey"
        large
        class="font-weight-bold rounded-lg"
        @click="dialog = false"
      >
        ยกเลิก
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    storeId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    menuTitle: '',
    menuId: null,
    formValid: false,
    menuTitleRules: [
      (v) => !!v || 'เมนูต้องมีชื่อ',
      (v) =>
        (v !== null && v.length <= 25) || 'ชื่อเมนูต้องไม่เกิน 25 ตัวอักศร',
    ],
    loading: false,
    isEdit: false,
  }),
  methods: {
    openDialog(isEdit = false, menuTitle = null, menuId = null) {
      this.isEdit = isEdit
      if (isEdit) {
        this.menuTitle = menuTitle
        this.menuId = menuId
      } else {
        this.menuTitle = ''
      }
      this.dialog = true
    },
    async sendRequest() {
      this.loading = true
      if (this.isEdit) {
        await this.$axios
          .patch(`/api/myStore/${this.storeId}/menu/${this.menuId}`, {
            name: this.menuTitle,
          })
          .then((res) =>
            setTimeout(() => {
              this.$emit('update')
              this.loading = false
              this.dialog = false
            }, 250)
          )
      } else {
        await this.$axios
          .post(`/api/myStore/${this.storeId}/menu`, {
            name: this.menuTitle,
          })
          .then((res) =>
            setTimeout(() => {
              this.$emit('update')
              this.loading = false
              this.dialog = false
            }, 250)
          )
      }
    },
  },
}
</script>
