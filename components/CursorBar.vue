<template>
  <div
    class="cursor"
    v-bind:style="{
      left: toPX(x),
      top: toPX(y),
      width: toPX(width),
      height: toPX(height),
      transform: rotation,
    }"
  >
    {{ x }} {{ y }}
  </div>
</template>

<script>
export default {
  props: ["rotation"],
  data() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  },
  methods: {
    toPX: function (value) {
      return `${value}px`;
    },
    handler: function (event) {
      this.height = 23;
      this.width = 10000;
      this.x = event.pageX - (this.width / 2);
      this.y = event.pageY - (this.height / 2);
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.handler, false);
    setTimeout(() => {
      // console.log(this.params.length)
      this.rotation = "rotate(90deg)"
    }, 3000);
  },
  destroyed() {
    window.removeEventListener("mousemove", this.handler, false);
  },
};
</script>

<style>
.cursor {
  transition: cubic-bezier(0.165, 0.84, 0.44, 1)  800ms transform;
  transform-origin: center;
  position: fixed;
  background: #959efb;
  box-shadow: 0 0 30px 30px #959efb;

  display: block;
  pointer-events: none;
}
</style>