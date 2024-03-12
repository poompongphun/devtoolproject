<template>
  <div>
    <v-card
      class="overflow-hidden rounded-xl my-2"
      style="border: 1px solid #f2f2f2"
      elevation="0"
      @click="showFood = !showFood"
    >
      <v-card-title primary-title>
        <v-icon :style="showFood ? 'transform: rotate(180deg)' : ''">
          mdi-chevron-down
        </v-icon>
        <div class="d-flex justify-start align-center" style="gap: 5px">
          <v-avatar size="25" color="grey lighten-2">
            <v-img :src="order.user.avatar" alt="alt" />
          </v-avatar>
          <span style="font-size: 16px">{{ order.user.name }}</span>
          <span style="font-size: 12px; color: #b4b4b4"
            >Order #{{ order.id }}</span
          >
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            :color="order.status == 'NEW' ? 'primary' : 'success'"
            depressed
            small
            @click.stop="confirm()"
          >
            <v-icon left> mdi-check </v-icon>
            {{ order.status == 'NEW' ? 'รับออเดอร์' : 'เสร็จสิ้น' }}
          </v-btn>
          <v-btn color="grey" outlined depressed small @click.stop="cancel()">
            <v-icon left> mdi-close </v-icon>
            ยกเลิก
          </v-btn>
        </div>
      </v-card-title>

      <v-expand-transition>
        <div
          v-if="showFood"
          class="pa-1"
          style="width: 100%; position: relative"
          @click.stop=""
        >
          <v-divider class="mx-2" style="border-color: #f2f2f2"></v-divider>
          <table class="px-2" style="width: 100%">
            <thead>
              <tr>
                <th class="py-2">Name</th>
                <th class="py-2" style="width: 20%">Amount</th>
                <th class="py-2" style="width: 20%">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(food, i) in order.foods" :key="i">
                <td>{{ food.name }}</td>
                <td class="text-center">{{ food.amount }}</td>
                <td class="text-center">{{ food.price }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="pt-2">
                  <v-divider style="border-color: #f2f2f2"></v-divider>
                </td>
              </tr>
              <tr>
                <td class="py-2 text-left">Total</td>
                <td class="py-2 text-center">{{ totalAmount }}</td>
                <td class="py-2 text-center">
                  <template v-if="totalPrice == order.total">
                    {{ totalPrice }}
                  </template>
                  <template v-else>
                    <span
                      class="grey--text"
                      style="text-decoration: line-through; font-size: 12px"
                    >
                      {{ totalPrice }}
                    </span>
                    {{ order.total }}
                  </template>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showFood: true,
  }),
  computed: {
    totalPrice() {
      return this.order.foods.reduce(
        (acc, cur) => acc + cur.price * cur.amount,
        0
      )
    },
    totalAmount() {
      return this.order.foods.reduce((acc, cur) => acc + cur.amount, 0)
    },
  },
  methods: {
    async confirm() {
      const updateOrder = await this.$axios.patch(
        `/api/order/${this.order.id}`,
        {
          status: this.order.status === 'NEW' ? 'PENDING' : 'COMPLETED',
        }
      )
      console.log(updateOrder)
    },
    async cancel() {
      const updateOrder = await this.$axios.patch(
        `/api/order/${this.order.id}`,
        {
          status: 'CANCLED',
        }
      )
      console.log(updateOrder)
    },
  },
}
</script>
