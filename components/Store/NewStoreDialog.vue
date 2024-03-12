<template>
  <v-dialog
    v-model="dialog"
    content-class="rounded-xl overflow-auto"
    max-width="450"
    width="100%"
  >
    <v-card class="py-16 px-8">
      <div class="text-h4 text-center font-weight-bold">
        {{ title }}
      </div>
      <div class="d-flex flex-column my-16" style="gap: 15px">
        <v-text-field
          v-model="name"
          name="name"
          label="Store Name"
          rounded
          filled
          hide-details
        ></v-text-field>
        <v-textarea
          v-model="description"
          name="name"
          label="Description"
          rounded
          filled
          rows="3"
          hide-details
        ></v-textarea>
      </div>
      <v-btn color="black" class="primary--text" dark block rounded depressed x-large @click="submit"
        >Create</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Create New Store',
    },
  },
  data: () => ({
    dialog: false,
    name: '',
    description: '',
  }),
  methods: {
    openDialog() {
      this.dialog = true
    },
    submit() {
      this.$emit('submit', {
        name: this.name,
        description: this.description,
      })
      this.dialog = false
      this.reset()
    },
    reset() {
      this.name = ''
      this.description = ''
    },
  },
}
</script>
