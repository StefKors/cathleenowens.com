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

<style>
.embed iframe {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
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
