<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <div class="homepage">
    <div class="interactive">
      <video
        class="slider shadow"
        controls
        autoplay
        disablepictureinpicture
        disableremoteplayback
        loop
        playsinline
        preload="auto"
        muted
        v-for="slide in homepage.data.slider"
        :key="slide.clip.size"
        :src="slide.clip.url"
      ></video>
      <input type="range" name="range" id="range" />
    </div>
    <h1>All Work by Cathleen Owens</h1>
    <div class="tags">
      <div class="tag" v-for="tag in tags" :key="tag">
        {{ tag }}
      </div>
    </div>
    <div class="pages">
      <NuxtLink
        class="page"
        v-for="page in pages.results"
        :key="page.id"
        :to="page.url"
      >
        <prismic-rich-text class="title" :field="page.data.title" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import getMeta from "~/components/GetMeta"

export default {
  head() {
    return getMeta(this.meta)
  },
  async asyncData({ $prismic, params, error }) {
    // get homepage data
    const homepage = await $prismic.api.getSingle("home")
    // get all pages
    const pages = await $prismic.api.query(
      $prismic.predicates.at("document.type", "page")
    )

    // get all tags
    const tags = await $prismic.api.tags

    // construct the meta tag data
    const meta = {
      title: homepage.data.meta_title,
      description: homepage.data.meta_description,
      date: homepage.last_publication_date,
      url: "https://www.cathleenowens.com",
      tags: tags,
      social: {
        image: homepage.data.social_cards[0]?.social_card_image.url,
        title: homepage.data.social_cards[0]?.social_card_title,
        description: homepage.data.social_cards[0]?.social_card_description,
      },
    }

    if (pages) {
      return { homepage, pages, tags, meta }
    } else {
      error({ statusCode: 404, message: "Page not found" })
    }
  },
}
</script>

<style scoped>
.tags .tag {
  margin-top: 1rem;
  background: rgba(119, 119, 255, 0.329);
  display: inline-block;
  font-size: 24px;
  color: #6a74eb;
  text-align: center;
  padding: 6px 10px;
  background: rgba(149, 158, 251, 0.2);
  text-decoration: none;
}

.tags {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.7rem;
}

.pages {
  font-size: 32px;
  text-align: center;
}

.page {
  color: rgba(60, 59, 67, 0.5);
  cursor: pointer;
  text-decoration: none;
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
}

.page:visited {
  color: rgba(106, 116, 235, 1);
}

.page:hover {
  color: rgba(60, 59, 67, 1);
}

.interactive {
  display: flex;
  flex-direction: column;
  width: 70vw;
  max-width: 1400px;
  margin: 5rem auto 2rem;
}

.interactive video {
  width: 100%;
  border-radius: 8px;
}
</style>
