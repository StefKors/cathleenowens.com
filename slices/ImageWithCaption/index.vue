<template>
  <section class="content-section container">
    <img loading="lazy" :srcset="params(slice.primary.Image.url, 500, 800)" />
    <prismic-rich-text class="caption" :field="slice.primary.description" />
  </section>
</template>

<script>
export default {
  name: "ImageWithCaption",
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
  methods: {
    formatUrl(url, width = "auto", height = "auto", scale = 1) {
      return `${url},fit=crop&w=${width * scale}&h=${height * scale} ${scale}x`
    },
    params(url, width = "auto", height = "auto") {
      const size1 = this.formatUrl(url, width, height, 1)
      const size2 = this.formatUrl(url, width, height, 1.5)
      const size3 = this.formatUrl(url, width, height, 2)
      return `${size1}, ${size2}, ${size3}`
    },
  },
}
</script>

<style scoped>
.content-section img {
}

.caption {
  color: var(--color);
}

@media (max-width: 767px) {
  .content-section {
    margin-bottom: 2rem;
  }
}
</style>
