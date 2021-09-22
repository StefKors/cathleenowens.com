<template>
  <div class="page">
    <Header />
    <Nuxt />
    <CursorBar rotation="rotate(0deg)" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

:root {
  --font: #3C3B43;
  --background: #F8F7F4;
}

html {
  font-family: "Work Sans", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
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
  line-height: 23px;
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
