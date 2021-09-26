<template>
  <div class="page">
    <Header />
    <Nuxt />
    <CursorBar />
  </div>
</template>

<script></script>

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

.shadow {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
}
</style>
