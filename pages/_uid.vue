<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <article>
    <section class="content-section container">
      <prismic-rich-text class="title" :field="document.data.title" />
      <div class="byline">{{ document.data.byline }}</div>
      <div class="tags" :v-if="document.tags.length">
        <NuxtLink
          v-for="tag in document.tags"
          :key="tag"
          :to="`/filter/${tag}`"
          >{{ tag }}</NuxtLink
        >
      </div>
      <prismic-rich-text class="introduction" :field="document.data.introduction" />
      <prismic-rich-text class="article" :field="document.data.article" />
    </section>
    <section>
      <slice-zone
        type="page"
        :uid="$route.params.uid"
        :resolver="({ sliceName }) => slices[sliceName]"
      />
    </section>
  </article>
</template>

<script>
import SliceZone from "vue-slicezone";
import ImageWithCaption from "~/components/ImageWithCaption";
import textBalancer from 'text-balancer'

export default {
  components: {
    SliceZone,
  },
  data() {
    return {
      slices: {
        ImageWithCaption,
      },
    };
  },
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getByUID("page", params.uid);
    if (document) {
      return { document };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  mounted() {
    textBalancer.balanceText(".title")
  }
};
</script>
<style scoped>
article {
  padding-top: 9rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 5vw;
  margin-right: 5vw;
}
.title {
  font-family: "Wremena";
  font-weight: bold;
  font-size: 82px;
  color: #3C3B43;
  line-height: 80px;
}
.byline {
  margin-top: 2rem;
}
.introduction {
  font-size: 26px;
  color: var(--font);
  line-height: 32px;
  margin-top: 1rem;
}
.article {
  margin-top: 1rem;
}
.tags a {
  margin-top: 1rem;
  background: rgba(119, 119, 255, 0.329);
  display: inline-block;
  font-size: 12px;
  color: #6a74eb;
  text-align: center;
  padding: 3px 5px;
  background: rgba(149,158,251,0.20);
  text-decoration: none;
}
</style>