<template>
  <div class="fill-height">
    <div
      class="d-flex justify-center align-center overflow-hidden"
      style="height: 100vh; position: relative"
    >
      <div
        class="primary circle zoomIn cornerToCurrentPosition"
        style="
          top: calc(0px - (var(--size) / 3));
          right: calc(0px - (var(--size) / 3));
        "
        :style="{
          '--size': $vuetify.breakpoint.smAndDown
            ? '350px'
            : $vuetify.breakpoint.mdAndDown
            ? '450px'
            : '550px',
        }"
      ></div>
      <div
        class="primary circle zoomIn cornerToCurrentPosition2"
        style="
          bottom: calc(0px - (var(--size) / 3));
          left: calc(0px - (var(--size) / 3));
        "
        :style="{
          '--size': $vuetify.breakpoint.smAndDown
            ? '350px'
            : $vuetify.breakpoint.mdAndDown
            ? '450px'
            : '550px',
        }"
      ></div>
      <div class="text-center px-5 topToCenter">
        <div
          class="black--text text-center"
          :class="{
            'text-h2': $vuetify.breakpoint.smAndDown,
            'text-h1': $vuetify.breakpoint.mdAndUp,
          }"
          style="font-family: 'Autour One', cursive !important"
        >
          Doofat
        </div>
        <div
          style="
            font-family: 'Autour One', cursive !important;
            letter-spacing: 10px;
          "
        >
          Make Your Meal Easier
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LangingPage',
  layout: 'noauth',
  validate({ store, redirect }) {
    if (store.state.auth.loggedIn) {
      redirect('/home')
    }
    return true
  },
}
</script>

<style>
.circle {
  --size: 100px;
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: white;
}

.zoomIn {
  animation: zoomIn 0.5s ease-in-out;
}

@keyframes zoomIn {
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.cornerToCurrentPosition {
  animation: cornerToCurrentPosition 1s ease-in-out;
}
.cornerToCurrentPosition2 {
  animation: cornerToCurrentPosition2 1.5s ease-in-out;
}
@keyframes cornerToCurrentPosition {
  0% {
    transform: translate(100%, -100%);
  }
  50% {
    transform: translate(0, 0);
  }
}
@keyframes cornerToCurrentPosition2 {
  0% {
    transform: translate(-100%, 100%);
  }
  50% {
    transform: translate(0, 0);
  }
}

.topToCenter {
  animation: topToCenter 1s ease-in-out;
}

@keyframes topToCenter {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(0);
    opacity: 0.5;
  }
}
</style>
