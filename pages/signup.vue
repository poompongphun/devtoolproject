<template>
  <div></div>
</template>
<script>
export default {
  name: 'SignupPage',
  validate({ redirect }) {
    redirect('/?signup')
  },
}
</script>