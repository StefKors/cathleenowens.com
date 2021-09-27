<template>
  <div>
    <Gooey intensity="weak" />
    <article class="about">
      <div class="column">
        <div class="title balance-text">
          {{ $prismic.asText(about.data.title) }}
        </div>
        <prismic-rich-text class="" :field="about.data.about" />
      </div>
      <img loading="lazy" :srcset="params(about.data.image.url, 500, 800)" />
    </article>
  </div>
</template>

<script>
import Gooey from "../components/Gooey.vue"
export default {
  components: { Gooey },
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
.about .title {
  font-family: "Cardo", monospace;
  font-weight: bold;
  font-size: 72px;
  color: #3c3b43;
  line-height: 0.9;
}

.about .column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 1;
}

.about {
  padding-top: 9rem;
  display: grid;
  grid-template-columns: minmax(auto, 600px) minmax(400px, 600px);
  margin-left: 5vw;
  margin-right: 5vw;
  gap: 2rem;
}

@media screen and (max-width: 700px) {
  .about {
    grid-template-columns: 1fr;
  }
}

.about img {
  z-index: -1;
}
</style>
