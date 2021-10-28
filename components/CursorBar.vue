<template>
  <div
    class="cursor"
    v-bind:style="{
      left: toPX(x),
      top: toPX(y),
      transform: rotation,
      opacity: x != undefined || y != undefined ? 1 : 0,
    }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      x: undefined,
      y: undefined,
      rotation: "rotate(0deg)",
    }
  },
  methods: {
    toPX: function (value) {
      return `${value}px`
    },
    handler: function (event) {
      this.x = event.clientX
      this.y = event.clientY - 5000
    },
    updateRotation() {
      const parts = window.location.pathname.split("/").filter((n) => n).length
      this.rotation = `rotate(${parts * 45}deg)`
    },
  },
  watch: {
    $route() {
      this.updateRotation()
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.handler, false)
    this.updateRotation()
  },
  destroyed() {
    window.removeEventListener("mousemove", this.handler, false)
  },
}
</script>

<style>
.cursor {
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 800ms;
  transition-property: transform, opacity;
  transform-origin: center;
  position: fixed;
  background: var(--color-bright);
  box-shadow: 0 0 30px 30px var(--color-bright);
  width: 0px;
  height: 10000px;
  display: block;
  pointer-events: none;
}
</style>
