<template>
  <div>
    <v-card
      class="d-flex justify-center align-center"
      min-height="100"
      rounded="xl"
      color="grey lighten-5"
      elevation="0"
    >
      <v-btn
        v-if="!showAdd"
        color="primary"
        class="text-none"
        rounded
        elevation="0"
        @click="showAdd = true"
      >
        <v-icon left>mdi-plus</v-icon>
        <span>Add Payment Method</span>
      </v-btn>
      <v-card
        v-else
        class="pa-4"
        color="grey lighten-5"
        elevation="0"
        width="100%"
      >
        <v-form ref="form">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="holderName"
                name="holder_name"
                label="Holder Name"
                filled
                rounded
                hide-details="auto"
                :rules="nameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="number"
                name="card_number"
                label="Card Number"
                filled
                rounded
                hide-details="auto"
                :rules="numberRules"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="expire"
                name="expire_date"
                label="Expire Date"
                filled
                rounded
                type="date"
                hide-details="auto"
                :rules="dateRules"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="cvv"
                name="cvv"
                label="CVV"
                filled
                rounded
                hide-details="auto"
                :rules="cvvRules"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-btn color="success" block rounded depressed @click="submit">
                Save
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="secondary"
                outlined
                block
                rounded
                depressed
                @click="showAdd = false"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    showAdd: false,
    holderName: '',
    number: '',
    expire: '',
    cvv: '',

    nameRules: [(v) => !!v || 'Name is required'],
    numberRules: [
      (v) => !!v || 'Number is required',
      (v) => v.length === 16 || 'Number must be 16 characters',
    ],
    dateRules: [(v) => !!v || 'Expire Date is required'],
    cvvRules: [
      (v) => !!v || 'CVV is required',
      (v) => v.length === 3 || 'CVV must be 3 characters',
      (v) => !isNaN(v) || 'CVV must be number',
    ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', {
          holderName: this.holderName,
          number: this.number,
          expire: this.expire,
          cvv: this.cvv,
        })
        this.reset()
        this.showAdd = false
      }
    },
    reset() {
      this.holderName = ''
      this.number = ''
      this.expire = ''
      this.cvv = ''
    },
  },
}
</script>
