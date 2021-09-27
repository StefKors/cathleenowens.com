<template>
  <section class="section">
    <prismic-embed class="embed" :field="slice.primary.embed" />
    <prismic-rich-text class="caption" :field="slice.primary.description" />
  </section>
</template>

<script>
export default {
  name: "EmbedWithCaption",
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.embed {
  width: 100%;
}
.caption {
  color: #6a74eb;
}

@media (max-width: 767px) {
  .content-section {
    margin-bottom: 2rem;
  }
}
</style>
