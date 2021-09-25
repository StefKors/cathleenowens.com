<template>
  <div class="page">
    <Header />
    <Nuxt />
    <CursorBar :rotation="rotation" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotation: "rotate(0deg)",
    }
  },
  methods: {
    updateRotation() {
      const parts = window.location.pathname.split("/").filter((n) => n).length
      this.rotation = `rotate(${(parts + 1) * 45}deg)`
    },
  },
  mounted() {
    this.updateRotation()
  },
  watch: {
    $route() {
      this.updateRotation()
    },
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");

:root {
  --font: #3c3b43;
  --background: #f8f7f4;
}

html {
  font-family: "Work Sans", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;

  background: var(--background);
  font-size: 16px;
  color: var(--font);
  line-height: 1.4;
  padding: 40px;
}

.page {
  max-width: 1200px;
  margin: auto;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

img {
  width: 100%;
}
</style>
