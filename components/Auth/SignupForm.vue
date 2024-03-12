<template>
  <v-card
    class="pa-10 center-shadow overflow-auto"
    max-width="428"
    width="100%"
    max-height="100vh"
    rounded="xl"
  >
    <div class="text-center text-h4 font-weight-bold">
      Welcome to <span class="primary--text">Doofat</span>
    </div>
    <div class="text-center font-weight-regular font-weight-medium">
      Create your account to continue
    </div>
    <v-form
      ref="form"
      v-model="valid"
      class="my-10 d-flex flex-column"
      style="gap: 20px"
      @submit.prevent="signup()"
    >
      <v-text-field
        id="name"
        v-model="name"
        type="text"
        name="name"
        label="Name"
        :rules="nameRules"
        rounded
        filled
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        id="email"
        v-model="email"
        type="email"
        name="email"
        label="Email"
        :rules="emailRules"
        rounded
        filled
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        id="password"
        v-model="password"
        type="password"
        name="password"
        label="Password"
        :rules="passwordRules"
        rounded
        filled
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        :rules="[
          (v) => !!v || 'Password is required',
          (v) => password === confirmPassword || 'Passwords must match',
        ]"
        rounded
        filled
        hide-details="auto"
      ></v-text-field>
      <v-expand-transition>
        <v-alert
          v-if="errMsg"
          class="py-0 d-flex align-center mb-0"
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
      <v-expand-transition>
        <v-alert
          v-if="success"
          class="py-0 d-flex align-center mb-0"
          text
          type="success"
          dense
          rounded="xl"
          height="44"
          dismissible
        >
          Account created successfully
          <template #close>
            <v-btn
              small
              icon
              color="success"
              absolute
              right
              @click="$emit('signin', $event)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
        </v-alert>
      </v-expand-transition>
      <v-btn
        class="text-capitalize white--text"
        type="submit"
        color="black"
        x-large
        rounded
        depressed
        block
        :loading="loading"
        :disabled="!valid"
      >
        Sign Up
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
    </v-form>
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
      Already have account?
      <button
        class="text-decoration-none primary--text"
        @click="$emit('signin', $event)"
      >
        Sign in
      </button>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'SignupForm',
  data: () => ({
    loading: false,
    valid: false,
    success: false,
    errMsg: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nameRules: [(v) => !!v || 'Name is required'],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length >= 6 || 'Password must be at least 6 characters',
    ],
  }),
  methods: {
    async signup() {
      this.loading = true
      this.errMsg = ''
      this.success = false
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.post('/api/auth/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          this.success = true
          this.reset()
        } catch (error) {
          this.errMsg = error.response.data.errors[0].msg
        } finally {
          this.loading = false
        }
      }
      this.loading = false
    },
    reset() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.$refs.form.resetValidation()
    },
    link(link) {
      window.location.href = link
    },
  },
}
</script>