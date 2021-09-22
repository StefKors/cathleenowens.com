<template>
  <section class='content-section container'>
    <prismic-image :field="slice.primary.Image"/>
    <prismic-rich-text :field="slice.primary.description"/>
  </section>
</template>

<script>
export default {
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
.content-section img {
  max-width: 50vw;
}
@media (max-width: 767px) {
  .content-section {
    margin-bottom: 2rem;
  }
}
</style>