<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <article>
    <section class="content-section container">
      <prismic-rich-text
        class="title balance-text"
        :field="document.data.title"
      />
      <div class="byline">{{ document.data.byline }}</div>
      <div class="tags" :v-if="document.tags.length">
        <NuxtLink
          v-for="tag in document.tags"
          :key="tag"
          :to="`/?filter=${tag}#works`"
          >{{ tag }}</NuxtLink
        >
      </div>
      <prismic-rich-text
        class="introduction balance-text"
        :field="document.data.introduction"
      />
      <prismic-rich-text class="article" :field="document.data.article" />
    </section>
    <!-- slice won't show up if no slices are set -->
    <slice-zone
      class="images"
      v-if="document.data.slices.length > 0"
      :type="$route.params.type"
      :uid="$route.params.uid"
      :resolver="({ sliceName }) => slices[sliceName]"
    />
  </article>
</template>

<script>
import getMeta from "~/components/GetMeta"
import SliceZone from "vue-slicezone"
import ImageWithCaption from "~/slices/ImageWithCaption"
import EmbedWithCaption from "~/slices/EmbedWithCaption"
import textBalancer from "text-balancer"

export default {
  head() {
    return getMeta(this.meta)
  },
  components: {
    SliceZone,
  },
  data() {
    return {
      slices: {
        EmbedWithCaption,
        ImageWithCaption,
      },
    }
  },
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getByUID(params.type, params.uid)

    // construct the meta tag data
    const meta = {
      title: document.data.meta_title,
      description: document.data.meta_description,
      date: document.last_publication_date,
      url: "https://www.cathleenowens.com",
      social: {
        image: document.data.social_cards[0]?.social_card_image.url,
        title: document.data.social_cards[0]?.social_card_title,
        description: document.data.social_cards[0]?.social_card_description,
      },
    }

    if (document) {
      return { document, meta }
    } else {
      error({ statusCode: 404, message: "Page not found" })
    }
  },
  mounted() {
    textBalancer.balanceText()
  },
}
</script>
<style>
article {
  padding-top: 9rem;
  display: grid;
  grid-template-columns: minmax(50vw, 600px) minmax(400px, 600px);
  margin-left: 5vw;
  margin-right: 5vw;
  gap: 2rem;
}

.title {
  font-family: "Cardo", monospace;
  font-weight: bold;
  font-size: 58px;
  color: #3c3b43;
  line-height: 0.9;
}
.byline {
  margin-top: 2rem;
}
.introduction {
  font-size: 22px;
  color: var(--font);
  line-height: 28px;
  margin-top: 1rem;
}
.article {
  margin-top: 1rem;
}
.tags a {
  margin-top: 1rem;
  display: inline-block;
  font-size: 12px;
  color: var(--color);
  text-align: center;
  padding: 3px 5px;
  background: var(--color-02);
  text-decoration: none;
}

.tags {
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 0.3rem;
}
.images {
  column-count: 1;
}

@media screen and (max-width: 1200px) {
  .title {
    font-size: 48px;
    line-height: 1;
  }
  .images {
    column-count: 1;
  }
}

@media screen and (max-width: 800px) {
  article {
    grid-template-columns: 1fr;
  }

  .images img {
    width: 100%;
  }

  .title {
    font-size: 48px;
  }
}
@media screen and (max-width: 700px) {
  .title {
    font-size: 48px;
    line-height: 0.95;
  }
}

@media screen and (max-width: 500px) {
  .title {
    font-size: 36px;
    line-height: 0.95;
  }
}
</style>
