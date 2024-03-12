<template>
  <v-card class="pa-4" width="500">
    <v-btn
      plain
      icon
      color="black"
      style="position: absolute; top: 15px; left: 15px; z-index: 4"
      @click="$emit('closeDialog')"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div class="text-center text-h5 font-weight-bold mt-2">
      {{ isEdit ? 'แก้ไขรายการอาหาร' : 'เพื่มรายการอาหาร' }}
    </div>
    <v-form v-model="formValid" class="mt-4">
      <div class="d-flex">
        <div style="position: relative">
          <v-icon
            color="black"
            style="position: absolute; bottom: 10px; right: 0px; z-index: 4"
            >mdi-image-edit-outline</v-icon
          >
          <v-btn
            outlined
            tile
            class="rounded-lg pa-0 mr-2 overflow-hidden"
            height="150"
            color="grey"
            @click="
              $refs.imageSelect.value = null
              $refs.imageSelect.click()
            "
          >
            <input
              ref="imageSelect"
              type="file"
              style="display: none"
              @change="selectImage()"
            />
            <div>
              <v-img
                width="150"
                :aspect-ratio="1 / 1"
                :src="foodImage"
                class="rounded-lg"
              ></v-img>
            </div>
          </v-btn>
        </div>
        <div class="flex-fill">
          <v-text-field
            v-model="foodTitle"
            :rules="foodTitleRules"
            :counter="120"
            clearable
            label="ชื่ออาหาร"
            color="primary"
            outlined
            required
            :value="foodTitle"
          ></v-text-field>
          <v-text-field
            v-model="foodPrice"
            :rules="foodPriceRules"
            clearable
            label="ราคาอาหาร (บาท)"
            color="primary"
            outlined
            required
            :value="foodPrice"
          ></v-text-field>
        </div>
      </div>
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
      @click="$emit('closeDialog')"
    >
      ยกเลิก
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    foodTitle: '',
    foodPrice: '',
    foodImage: '',
    uploadImage: null,
    formValid: false,
    foodTitleRules: [
      (v) => !!v || 'อาหารต้องมีชื่อ',
      (v) => (v !== null && v.length <= 120) || 'ชื่อต้องไม่เกิน 120 ตัวอักศร',
    ],
    foodPriceRules: [
      (v) => !!v || 'อาหารต้องมีราคา',
      (v) =>
        (!Number.isNaN(Number(v)) && Number(v) % 1 === 0) ||
        'ต้องเป็นตัวเลขและเป็นจำนวนเต็ม',
    ],
    loading: false,
  }),
  watch: {
    food() {
      this.foodTitle = this.food.name
      this.foodPrice = this.food.price
      this.foodImage = this.food.img
    },
  },
  mounted() {
    this.foodTitle = this.food.name
    this.foodPrice = this.food.price
    this.foodImage = this.food.img
  },
  methods: {
    openWithFood() {
      this.foodTitle = this.food.name
      this.foodPrice = this.food.price
      this.foodImage = this.food.img
    },
    selectImage() {
      const file = this.$refs.imageSelect.files[0]
      this.uploadImage = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.foodImage = reader.result
      }
    },
    async sendRequest() {
      const formData = new FormData()
      formData.append('name', this.foodTitle)
      formData.append('price', Number(this.foodPrice))
      if (this.uploadImage) {
        formData.append('img', this.uploadImage)
        this.loading = true
      }
      let updateFood
      if (this.isEdit) {
        updateFood = await this.$axios.patch(
          `/api/myStore/${this.food.storeId}/menu/${this.food.menuId}/food/${this.food.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      } else {
        updateFood = await this.$axios.post(
          `/api/myStore/${this.food.storeId}/menu/${this.food.menuId}/food`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      }

      if (updateFood) {
        setTimeout(
          () => {
            this.$emit('updateFood')
            this.loading = false
            this.$emit('closeDialog')
            this.uploadImage = null
          },
          this.uploadImage ? 2500 : 250
        )
      }
    },
  },
}
</script>
