<template>
  <div>Authenticating with Google...</div>
</template>

<script>
export default {
  name: 'GoogleCallback',
  async asyncData({ $auth, $axios, route, redirect, app }) {
    await $auth.loginWith('local', {
      url: `/api/auth/googleCallback?code=${route.query.code}&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent`,
    })
    redirect('/home')
  },
}
</script>