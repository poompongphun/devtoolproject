<template>
  <div>Authenticating with Google...</div>
</template>

<script>
export default {
  name: 'GoogleCallback',
  async asyncData({ $auth, $axios, route, redirect, app }) {
    await $auth.loginWith('local', {
      url: `/api/auth/facebookCallback?code=${route.query.code}`,
    })
    redirect('/home')
  },
}
</script>