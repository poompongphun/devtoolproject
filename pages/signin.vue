<template>
  <div></div>
</template>
<script>
export default {
  name: 'SigninPage',
  validate({ redirect }) {
    redirect('/?signin')
  },
}
</script>