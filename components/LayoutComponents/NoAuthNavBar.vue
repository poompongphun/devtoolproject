<template>
  <v-app-bar
    style="z-index: 100"
    :color="!isTop ? 'background' : 'rgba(255, 255, 255, 0)'"
    height="64"
    fixed
    app
    elevate-on-scroll
  >
    <v-container class="d-flex">
      <v-toolbar-title
        v-ripple
        class="navbar-txt d-flex justify-center align-center px-3 rounded-xl white"
        @click="$router.push('/')"
      >
        Doo<span class="navbar-txt primary--text">fat</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
        <v-btn
          class="text-capitalize"
          :color="!isTop ? 'primary' : 'background'"
          depressed
          rounded
          @click="signUp()"
        >
          Sign up
        </v-btn>
        <v-btn
          class="text-capitalize"
          :color="!isTop ? 'background' : 'primary'"
          depressed
          rounded
          @click="signIn()"
        >
          Sign in
        </v-btn>
        <v-dialog
          v-model="dialog"
          content-class="rounded-xl overflow-auto"
          width="428"
        >
          <signin-form v-if="!signup" @signup="signUp()" />
          <signup-form v-else @signin="signIn()" />
        </v-dialog>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import SigninForm from '../Auth/SigninForm.vue'
import SignupForm from '../Auth/SignupForm.vue'
export default {
  name: 'NoAuthNavBar',
  components: { SigninForm, SignupForm },
  props: {
    isTop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialog: false,
      signup: false,
    }
  },
  watch: {
    dialog(val) {
      // if (!val) {
      //   this.$router.replace({
      //     query: { signup: undefined, signin: undefined },
      //   })
      // }
    },
  },
  created() {
    if (this.$route.query.signin !== undefined) {
      this.signIn()
    }
    if (this.$route.query.signup !== undefined) {
      this.signUp()
    }
  },
  methods: {
    change(e, val) {
      this.signup = val
    },
    signUp() {
      this.dialog = true
      this.signup = true
      // if (this.$route.query.signup !== null) {
      //   this.$router.replace({ query: { signup: null } })
      // }
    },
    signIn() {
      this.dialog = true
      this.signup = false
      // if (this.$route.query.signin !== null) {
      //   this.$router.replace({ query: { signin: null } })
      // }
    },
  },
}
</script>

<style>
.navbar-txt {
  font-family: 'Autour One', cursive;
  font-weight: bold;
}
</style>
