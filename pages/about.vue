<template>
  <article>
    <prismic-rich-text class="title balance-text" :field="about.data.title" />
    <prismic-rich-text class="" :field="about.data.about" />
    <img loading="lazy" :srcset="params(about.data.image.url, 500, 800)" />
  </article>
</template>

<script>
export default {
  async asyncData({ $prismic, params, error }) {
    const about = await $prismic.api.getSingle("about")

    // construct the meta tag data
    const meta = {
      title: about.data.meta_title,
      description: about.data.meta_description,
      date: about.last_publication_date,
      url: "https://www.cathleenowens.com",
      social: {
        image: about.data.social_cards[0]?.social_card_image.url,
        title: about.data.social_cards[0]?.social_card_title,
        description: about.data.social_cards[0]?.social_card_description,
      },
    }

    if (about) {
      return { about, meta }
    } else {
      error({ statusCode: 404, message: "Page not found" })
    }
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

<style>
.title {
  font-family: "Cardo", monospace;
  font-weight: bold;
  font-size: 72px;
  color: #3c3b43;
  line-height: 0.9;
}
</style>
