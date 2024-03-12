<template>
  <v-card
    class="pa-10 center-shadow overflow-auto"
    max-width="428"
    width="100%"
    max-height="100vh"
    rounded="xl"
  >
    <div class="text-center text-h4 font-weight-bold">Welcome Back!</div>
    <div class="text-center font-weight-regular font-weight-medium">
      Sign in to continue
    </div>
    <form class="my-10" @submit.prevent="signin()">
      <v-text-field
        id="email"
        v-model="email"
        class="mb-5"
        type="text"
        name="email"
        label="Email"
        rounded
        filled
        hide-details
      ></v-text-field>
      <v-text-field
        id="password"
        v-model="password"
        class="mb-2"
        type="password"
        name="password"
        label="Password"
        rounded
        filled
        hide-details
      ></v-text-field>
      <div class="text-right mb-5">
        <nuxt-link class="text-decoration-none grey--text" to="/forgot">
          Forgot password?
        </nuxt-link>
      </div>
      <v-expand-transition>
        <v-alert
          v-if="errMsg"
          class="py-0 d-flex align-center"
          text
          type="error"
          dense
          rounded="xl"
          height="44"
          dismissible
        >
          {{ errMsg }}
          <template #close>
            <v-btn small icon color="error" absolute right @click="errMsg = ''">
              <v-icon>$cancel</v-icon>
            </v-btn>
          </template>
        </v-alert>
      </v-expand-transition>
      <v-btn
        class="text-capitalize"
        type="submit"
        color="black"
        x-large
        rounded
        depressed
        dark
        block
        :loading="loading"
      >
        Sign In
        <template #loader>
          <span>
            <v-progress-circular
              size="25"
              indeterminate
              color="white"
            ></v-progress-circular>
          </span>
        </template>
      </v-btn>
    </form>
    <div class="text-center mb-10">
      <v-divider class="grey lighten-1"></v-divider>
      <div class="mt-n3">
        <span class="white px-2 font-weight-medium">OR</span>
      </div>
    </div>
    <div class="d-flex justify-center align-center mb-10" style="gap: 10px">
      <v-btn
        elevation="3"
        color="white"
        fab
        small
        @click="link('/api/auth/facebook')"
      >
        <v-img
          src="https://180dc.org/wp-content/uploads/2017/04/facebook-icon-512x512-1.png"
          width="50"
        ></v-img>
      </v-btn>
      <v-btn
        elevation="3"
        color="white"
        fab
        small
        @click="link('/api/auth/google')"
      >
        <v-img
          src="https://img.icons8.com/color/512/google-logo.png"
          width="30"
        ></v-img>
      </v-btn>
    </div>
    <div class="text-center">
      Don't have an account?
      <button
        class="text-decoration-none primary--text"
        @click="$emit('signup', $event)"
      >
        Sign up
      </button>
    </div>
  </v-card>
</template>

  <script>
export default {
  name: 'SigninForm',
  data: () => ({
    email: '',
    password: '',
    errMsg: '',
    loading: false,
  }),
  methods: {
    async signin() {
      this.loading = true
      try {
        await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        })
        this.$router.push('/home')
      } catch (error) {
        this.errMsg = 'Invalid email or password'
      } finally {
        this.loading = false
      }
    },
    link(link) {
      window.location.href = link
    },
  },
}
</script>