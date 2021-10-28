<template>
  <div class="page">
    <Header />
    <Nuxt />
    <CursorBar />
    <Footer />
  </div>
</template>

<script></script>

<style>
:root {
  --font: #3c3b43;
  --background: #f8f7f4;
  --color: #6a74eb;
  --color-02: rgba(149, 158, 251, 0.2);
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
  scroll-behavior: smooth;
  background: var(--background);
  font-size: 16px;
  color: var(--font);
  line-height: 1.4;
  padding: 40px;
}
@media screen and (max-width: 700px) {
  html {
    padding: 2rem;
  }
}
@media screen and (max-width: 500px) {
  html {
    padding: 1rem;
  }
}

.page {
  max-width: 1800px;
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
