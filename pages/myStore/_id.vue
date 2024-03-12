<template>
  <div>
    <v-parallax
      width="100%"
      height="350"
      :src="store.bgImg"
      style="filter: blur(2px); object-position: center"
    ></v-parallax>
    <my-container style="height: auto" class="pa-0">
      <div
        class="white rounded-t-xl center-shadow pa-4 pa-sm-8"
        style="position: relative; margin-top: -150px; min-height: 100vh"
      >
        <div class="d-flex align-center justify-space-between">
          <div class="flex-fill d-flex align-center">
            <v-avatar
              size="40"
              class="mr-2"
              color="grey"
              style="cursor: pointer"
              @click="$router.push(`/store/${store.id}`)"
            >
              <v-img :src="store.logoImg" alt="avatar" />
            </v-avatar>
            <div class="flex-fill font-weight-bold" style="font-size: 32px">
              {{ store.name }}
            </div>
          </div>
          <NfcQrCode />
        </div>
        <div class="text-h7 mt-4">
          {{ store.description }}
        </div>
        <div class="mt-4 d-flex" style="gap: 10px">
          <v-btn
            color="primary"
            outlined
            rounded
            class="mt-2 mt-sm-0 text-none"
            @click="$refs.EditStoreDialog.openDialog()"
          >
            <v-icon left>mdi-storefront-edit</v-icon>
            <span>แก้ไขร้าน</span>
          </v-btn>
          <v-btn
            color="primary"
            outlined
            rounded
            class="mt-2 mt-sm-0 text-none"
            @click="editMenuDialog = true"
          >
            <v-icon left>mdi-food-fork-drink</v-icon>
            <span>แก้ไขอาหาร</span>
            <v-dialog
              v-model="editMenuDialog"
              width="auto"
              max-width="650"
              content-class="rounded-xl"
              scrollable
            >
              <v-card width="750" class="pa-4 pt-0 overflow-hidden">
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
                  @click="editMenuDialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <div class="text-center text-h5 font-weight-bold mt-4 mb-4">
                  เมนูอาหาร
                </div>
                <div>
                  <div
                    class="d-flex align-center"
                    style="border-bottom: 1px solid #e1e1e1"
                  >
                    <v-btn
                      small
                      color="black"
                      class="white--text mr-1"
                      depressed
                      @click="$refs.addEditMenuDialog.openDialog()"
                    >
                      <v-icon left> mdi-plus </v-icon>
                      เพิ่มเมนู
                    </v-btn>
                    <div style="width: calc(100% - 93px)">
                      <v-tabs
                        v-model="selectedMenu"
                        color="primary"
                        show-arrows
                        height="40"
                      >
                        <v-tab
                          v-for="menu in store.menus"
                          :key="menu.id"
                          class="text-none"
                        >
                          {{ menu.name }}
                          <v-btn
                            x-small
                            icon
                            color="grey"
                            @click.stop="
                              $refs.addEditMenuDialog.openDialog(
                                (isEdit = true),
                                (menuTitle = menu.name),
                                (menuId = menu.id)
                              )
                            "
                          >
                            <v-icon size="20">mdi-pencil-outline</v-icon>
                          </v-btn>
                          <v-btn
                            x-small
                            icon
                            color="red"
                            @click.stop="
                              $refs.confirmDialog.openDialog(
                                `ยืนยันการลบเมนู \&quot;${menu.name}\&quot;`,
                                () => {
                                  deleteMenu(menu.id)
                                }
                              )
                            "
                          >
                            <v-icon size="20">mdi-trash-can-outline</v-icon>
                          </v-btn>
                        </v-tab>
                      </v-tabs>
                    </div>
                  </div>

                  <v-tabs-items
                    v-model="selectedMenu"
                    style="
                      background-color: transparent;
                      overflow: auto;
                      height: 60vh;
                      max-height: 60vh;
                    "
                    class="mt-0"
                  >
                    <v-tab-item v-for="menu in store.menus" :key="menu.id">
                      <div class="d-flex justify-end mt-2" style="gap: 5px">
                        <v-btn
                          color="black"
                          class="white--text"
                          rounded
                          depressed
                          @click="openAddFoodDialog()"
                        >
                          เพื่มอาหาร
                        </v-btn>
                      </div>
                      <food-card
                        v-for="food in menu.foods"
                        :key="food.id"
                        :food="food"
                        :editable="true"
                        @openDialog="(food) => openEditFoodDialog(food)"
                        @delete="
                          $refs.confirmDialog.openDialog(
                            `ยืนยันการลบอาหาร \&quot;${food.name}\&quot;`,
                            () => {
                              deleteFood(food.id)
                            }
                          )
                        "
                      >
                      </food-card>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </v-card>
            </v-dialog>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            rounded
            class="mt-2 mt-sm-0 text-none"
            color="red"
            @click="deleteStore"
          >
            <v-icon left>mdi-storefront-remove</v-icon>
            ลบร้าน
          </v-btn>
        </div>
        <store-order :id="store.id" />
      </div>
    </my-container>
    <v-dialog
      v-model="editFoodDialog"
      width="auto"
      max-width="500"
      content-class="rounded-xl"
    >
      <edit-food-dialog
        ref="editFoodDialog"
        :food="selectedFood"
        :is-edit="editFoodDialogEdit"
        @closeDialog="editFoodDialog = false"
        @updateFood="update()"
      />
    </v-dialog>
    <add-edit-menu-dialog
      ref="addEditMenuDialog"
      :store-id="store.id"
      @update="update()"
    >
    </add-edit-menu-dialog>
    <confirm-dialog ref="confirmDialog"> </confirm-dialog>
    <edit-store-dialog
      ref="EditStoreDialog"
      :store="store"
      @update="updateStore"
    />
  </div>
</template>

<script>
import MyContainer from '~/components/LayoutComponents/MyContainer.vue'
import FoodCard from '~/components/Store/FoodCard.vue'
import EditFoodDialog from '~/components/Store/EditFoodDialog.vue'
import StoreOrder from '~/components/Store/StoreOrder.vue'
import AddEditMenuDialog from '~/components/Store/AddEditMenuDialog.vue'
import ConfirmDialog from '~/components/Store/ConfirmDialog.vue'
import NfcQrCode from '~/components/Store/NfcQrCode.vue'
import EditStoreDialog from '~/components/Store/EditStoreDialog.vue'

export default {
  name: 'StorePage',
  components: {
    MyContainer,
    FoodCard,
    EditFoodDialog,
    StoreOrder,
    NfcQrCode,
    AddEditMenuDialog,
    ConfirmDialog,
    EditStoreDialog,
  },
  middleware: 'auth',
  async asyncData({ params, $axios, error, $auth }) {
    try {
      const res = await $axios.get(`/api/myStore/${params.id}`)
      if ($auth.user.id !== res.data.userId) {
        throw new Error('Unathorized')
      }
      return { store: res.data }
    } catch (e) {
      error({ statusCode: 401, message: 'Unathorized' })
    }
  },
  data: () => ({
    selectedMenu: null,
    editMenuDialog: false,
    editFoodDialog: false,
    editFoodDialogEdit: false,
    selectedFood: null,
  }),
  // async mounted() {
  //   try {
  //     await this.$nextTick()

  //     // eslint-disable-next-line no-new, no-undef
  //     new google.maps.Map(this.$refs.map, {
  //       center: { lat: -34.397, lng: 150.644 },
  //       zoom: 8,
  //     })
  //     console.log(this.$refs.map)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  methods: {
    openEditFoodDialog(food) {
      this.editFoodDialogEdit = true
      this.selectedFood = food
      if (this.$refs.editFoodDialog !== undefined) {
        this.$refs.editFoodDialog.openWithFood()
      }
      this.editFoodDialog = true
    },
    openAddFoodDialog() {
      this.editFoodDialogEdit = false
      this.selectedFood = {
        name: '',
        price: '',
        img: 'https://storage.googleapis.com/doofat_bucket/default/defaultFood.jpg',
        storeId: this.store.id,
        menuId: this.store.menus[this.selectedMenu].id,
      }
      if (this.$refs.editFoodDialog !== undefined) {
        this.$refs.editFoodDialog.openWithFood()
      }
      this.editFoodDialog = true
    },
    async update() {
      await this.$nuxt.refresh()
    },
    async deleteMenu(menuId) {
      await this.$axios
        .delete(`/api/myStore/${this.store.id}/menu/${menuId}`)
        .then((res) =>
          setTimeout(() => {
            this.update()
          }, 250)
        )
    },
    async deleteFood(foodId) {
      await this.$axios
        .delete(`/api/myStore/${this.store.id}/food/${foodId}`)
        .then((res) =>
          setTimeout(() => {
            this.update()
          }, 250)
        )
    },
    updateStore(val) {
      this.store = {
        menus: this.store.menus,
        ...val,
      }
    },
    deleteStore() {
      this.$refs.confirmDialog.openDialog(
        `ยืนยันการลบร้าน "${this.store.name}"`,
        async () => {
          await this.$axios.delete(`/api/myStore/${this.store.id}`)
          this.$router.push('/myStore')
        }
      )
    },
  },
}
</script>
