<template>
  <v-dialog
    v-model="dialog"
    width="500"
    content-class="rounded-xl overflow-hidden"
  >
    <v-card>
      <v-card-title class="text-h5 justify-center"> Profile </v-card-title>

      <v-card-text class="text-center">
        <div class="my-5">
          <v-avatar v-if="!edit" size="100" color="white">
            <v-img :src="$auth.user.avatar" alt="res_img" />
          </v-avatar>
          <v-hover v-else v-slot="{ hover }">
            <v-avatar size="100" color="white" style="position: relative">
              <v-img :src="previewImg || $auth.user.avatar" alt="res_img" />
              <v-fade-transition>
                <div
                  v-if="hover"
                  class="d-flex align-center justify-center"
                  style="
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    background-color: rgba(255, 255, 255, 0.8);
                    cursor: pointer;
                  "
                  @click="$refs.avatarFile.click()"
                >
                  <v-icon>mdi-upload</v-icon>
                </div>
              </v-fade-transition>
              <input
                ref="avatarFile"
                type="file"
                style="display: none"
                @change="updateAvatar"
              />
            </v-avatar>
          </v-hover>
        </div>
        <div class="pt-5 d-flex flex-column" style="gap: 10px">
          <v-text-field
            v-model="name"
            type="text"
            name="name"
            label="Name"
            filled
            rounded
            hide-details
            :disabled="!edit"
          ></v-text-field>
          <v-text-field
            v-model="email"
            type="email"
            name="email"
            label="E-mail"
            filled
            rounded
            hide-details
            :disabled="!edit"
          ></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            name="password"
            label="Password"
            filled
            rounded
            hide-details
            :disabled="!edit"
          ></v-text-field>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          v-if="edit == false"
          class="text-capitalize"
          color="primary"
          text
          block
          rounded
          @click="edit = true"
        >
          Edit
        </v-btn>
        <v-btn
          v-else
          class="text-capitalize"
          color="success"
          text
          block
          rounded
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    edit: false,

    previewImg: '',
    name: '',
    email: '',
    password: '',
    avatar: null,
  }),
  watch: {
    dialog(val) {
      this.$store.commit('setProfileDialog', val)
      if (val) {
        this.reset()
        this.name = this.$auth.user.name
        this.email = this.$auth.user.email
        this.password = this.$auth.user.password
      }
    },
    '$store.state.profileDialog'() {
      this.dialog = this.$store.state.profileDialog
    },
  },
  methods: {
    updateAvatar() {
      const file = this.$refs.avatarFile.files[0]
      this.avatar = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.previewImg = reader.result
      }
    },
    async save() {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('email', this.email)
      if (this.password) {
        formData.append('password', this.password)
      }
      if (this.avatar) {
        formData.append('avatar', this.avatar)
      }
      const updateUser = await this.$axios.patch('/api/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (updateUser) {
        this.$auth.setUser({
          name: this.name,
          email: this.email,
          password: this.password,
          avatar: this.previewImg || this.$auth.user.avatar,
        })
        this.edit = false
        this.dialog = false
      }
    },
    reset() {
      this.edit = false
      this.previewImg = ''
      this.name = ''
      this.email = ''
      this.password = ''
    },
  },
}
</script>
