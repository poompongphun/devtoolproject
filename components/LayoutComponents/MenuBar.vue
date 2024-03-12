<template>
  <div class="menu">
    <v-card
      class="mb-4 mx-2 px-3 py-2 d-flex justify-center align-center flex-wrap center-shadow chlid"
      style="gap: 6px; border-radius: 100px;"
    >
      <v-avatar
        v-ripple
        color="primary"
        size="40"
        style="cursor: pointer"
        @click="$store.commit('setProfileDialog', !$store.state.profileDialog)"
      >
        <v-img :src="$auth.user.avatar" alt="avatar" />
      </v-avatar>
      <div
        class="mx-1"
        style="border: 1px solid #c6c6c6; height: 30px; width: 2px"
      ></div>
      <v-btn to="/home" color="black" depressed small fab>
        <v-icon :color="$route.name === 'home' ? 'primary' : 'white'">
          mdi-home
        </v-icon>
      </v-btn>
      <v-btn to="/myStore" color="black" depressed small fab>
        <v-icon
          :color="
            $route.name === 'myStore' || $route.name === 'myStore-id'
              ? 'primary'
              : 'white'
          "
        >
          mdi-storefront
        </v-icon>
      </v-btn>
      <v-btn
        color="black"
        depressed
        small
        fab
        @click="$refs.QRCode.openDialog()"
      >
        <v-icon :color="dialog ? 'primary' : 'white'"> mdi-qrcode-scan </v-icon>
      </v-btn>
      <v-btn to="/setting" color="black" depressed small fab>
        <v-icon :color="$route.name === 'setting' ? 'primary' : 'white'">
          mdi-cog
        </v-icon>
      </v-btn>
    </v-card>
    <profile-dialog />
    <QRCode ref="QRCode" @dialog="setDialog" />
  </div>
</template>

<script>
import ProfileDialog from '@/components/LayoutComponents/ProfileDialog.vue'
import QRCode from '@/components/QrNfc/QRCode.vue'
export default {
  name: 'MenuBar',
  components: {
    ProfileDialog,
    QRCode,
  },
  data() {
    return {
      dialog: false,
    }
  },
  mounted() {
    this.$store.commit('setQRcode', this.$refs.QRCode)
  },
  methods: {
    setDialog(val) {
      this.dialog = val
    },
  },
}
</script>

<style lang="scss">
.menu {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  align-items: center;
  width: 100%;
  pointer-events: none;
}
.menu .chlid {
  pointer-events: auto;
}
</style>
