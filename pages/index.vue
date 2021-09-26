<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
  <div class="homepage">
    <div v-if="this.allClips" class="interactive">
      <transition :name="transition" mode="out-in">
        <video
          :key="selectedRange"
          :src="this.allClips[this.selectedRange].clip.url"
          ref="videoPlayer"
          class="slider shadow"
          playsinline
          muted
          controls
          autoplay
          disablepictureinpicture
          disableremoteplayback
          loop
          preload="auto"
          crossorigin="anonymous"
          type="video/mp4"
        >
          <track
            label="English"
            kind="subtitles"
            srclang="en"
            :src="this.allClips[this.selectedRange].subtitle.url"
            default
          />
        </video>
      </transition>
      <input
        class="range-slider"
        type="range"
        v-model="selectedRange"
        name="range"
        id="range"
        min="0"
        :max="allClips.length"
      />
    </div>
    <prismic-rich-text
      class="project-title balance-text"
      :field="homepage.data.title"
    />
    <div class="tags">
      <div class="tag" v-for="tag in tags" :key="tag">
        {{ tag }}
      </div>
    </div>
    <div class="pages-list">
      <NuxtLink
        class="page-link"
        v-for="page in pages.results"
        :key="page.id"
        :to="page.url"
      >
        <prismic-rich-text :field="page.data.title" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import getMeta from "~/components/GetMeta"
import textBalancer from "text-balancer"

export default {
  head() {
    return getMeta(this.meta)
  },
  data() {
    return {
      selectedRange: 0,
      playerHeight: "auto",
      transition: "slide-next",
    }
  },
  methods: {
    toPX: function (value) {
      return `${value}px`
    },
  },
  watch: {
    selectedRange(val, prevVal) {
      if (val > prevVal) {
        // animate next
        this.transition = "slide-next"
      } else {
        // animate prev
        this.transition = "slide-prev"
      }
    },
  },
  mounted() {
    textBalancer.balanceText()

    const video = this.$refs.videoPlayer

    video.addEventListener("loadstart", (event) => {
      const height = video.clientHeight
      this.playerHeight = this.toPX(height)
    })

    video.addEventListener("playing", (event) => {
      this.playerHeight = "auto"
    })
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

    // store the complete array of clips in a helper
    const allClips = homepage.data.slider

    if (pages) {
      return { homepage, pages, tags, meta, allClips }
    } else {
      error({ statusCode: 404, message: "Page not found" })
    }
  },
}
</script>

<style scoped>
.range-slider {
  /* margin-top */
}

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

.pages-list {
  margin-top: 2rem;
  font-size: 18px;
  line-height: 32px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.page-link {
  color: rgba(60, 59, 67, 0.5);
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
}

.page-link:hover {
  color: rgba(60, 59, 67, 1);
}

.project-title {
  text-align: center;
  font-family: "Wremena";
  font-weight: bold;
  font-size: 32px;
  color: #3c3b43;
  line-height: 70px;
  margin: 0 auto;
}

.interactive {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 70vw;
  max-width: 1080px;
  margin: 5rem auto 5rem;
}

.interactive video {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 1.5;
  max-width: 1080px;
  max-height: 720px;
}

.slide-next-enter-active,
.slide-next-leave-active {
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 200ms;
}
.slide-next-enter,
.slide-next-leave-active {
  opacity: 0;
}
.slide-next-enter {
  transform: translateX(31px);
}
.slide-next-leave-active {
  transform: translateX(-31px);
}

.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 200ms;
}
.slide-prev-enter,
.slide-prev-leave-active {
  opacity: 0;
}
.slide-prev-enter {
  transform: translateX(-31px);
}
.slide-prev-leave-active {
  transform: translateX(31px);
}
</style>
