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
      <div class="range-labels">
        <div>Performance Art {{ percentArt }}%</div>
        <div>Performance Anxiety {{ percentAnxiety }}%</div>
      </div>
      <input
        class="range-slider"
        type="range"
        v-model="selectedRange"
        name="range"
        id="range"
        min="0"
        :max="allClips.length - 1"
      />
    </div>
    <prismic-rich-text
      class="project-title balance-text"
      :field="homepage.data.title"
    />
    <div class="tags">
      <div
        @click="setListState(tag)"
        class="tag"
        v-for="tag in visibleWorks"
        :key="tag"
        :style="{
          opacity: filter.includes(tag) ? 1 : 0.5,
        }"
      >
        {{ tag }}
      </div>
    </div>
    <div class="artworks-list">
      <div
        class="page-link"
        v-for="page in allWorks"
        :key="page.id"
        :style="{
          opacity: filter.includes(page.type) ? 1 : 0,
        }"
        :data-site-year="page.date.getFullYear()"
      >
        <a :href="page.url" v-if="page.url.startsWith('http')">
          <span>
            {{ $prismic.asText(page.title) }}
          </span>
          <span class="grow"></span>
          <div class="details">
            <span class="date">
              {{ page.date.getFullYear() }}
            </span>
          </div>
        </a>
        <NuxtLink :to="page.url" v-else>
          <span>
            {{ $prismic.asText(page.title) }}
          </span>
          <span class="grow"></span>
          <div class="details">
            <span class="date">
              {{ page.date.getFullYear() }}
            </span>
          </div>
        </NuxtLink>
      </div>
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
    setListState(value) {
      if (value == this.$route.query.filter) {
        this.$router.push({ path: this.$route.path })
        return
      }
      this.$router.push({
        path: this.$route.path,
        query: { filter: value },
      })
    },
  },
  computed: {
    filter() {
      if (this.$route.query.filter) {
        return [this.$route.query.filter]
      }
      return this.visibleWorks
    },
    percentAnxiety() {
      return 100 - this.percentArt
    },
    percentArt() {
      return (
        (100 / (this.allClips.length + 1)) * (Number(this.selectedRange) + 1)
      )
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
    // get all artworks
    const exhibitions = await $prismic.api.query(
      $prismic.predicates.at("document.type", "exhibition")
    )
    // get all artworks
    const artworks = await $prismic.api.query(
      $prismic.predicates.at("document.type", "page")
    )

    let exhibitionUrls = exhibitions.results.map((exhibit) => {
      return {
        url: exhibit.data.website.url,
        title: exhibit.data.title,
        date: new Date(exhibit.data.date),
        id: exhibit.id,
        type: "Exhibit",
      }
    })

    let artworkUrls = artworks.results.map((artwork) => {
      return {
        url: artwork.uid,
        title: artwork.data.title,
        date: new Date(artwork.data.date) ?? new Date(),
        id: artwork.id,
        type: "Artwork",
      }
    })

    const allWorks = [...exhibitionUrls, ...artworkUrls].sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      // return 0
      return b.date - a.date
    })

    const visibleWorks = Array.from(new Set(allWorks.map((work) => work.type)))

    // get all tags
    const tags = ["Artworks", "Exhibits"]

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

    if (artworks) {
      return {
        homepage,
        artworks,
        exhibitions,
        tags,
        meta,
        visibleWorks,
        allClips,
        allWorks,
      }
    } else {
      error({ statusCode: 404, message: "Page not found" })
    }
  },
}
</script>

<style>
.range-labels {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.range-labels div + .range-labels div {
  text-align: right;
}
.range-slider {
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb,
input[type="range"]::-moz-range-thumb {
  background-color: #959efb;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 2rem;
}

input[type="range"] {
  background-color: transparent;
}

input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 5px;
  background: rgba(149, 158, 251, 0.2);
  border-radius: 3px;
}

.tags .tag {
  margin-top: 1rem;
  display: inline-block;
  font-size: 24px;
  color: #6a74eb;
  text-align: center;
  padding: 6px 10px;
  background: rgba(149, 158, 251, 0.2);
  text-decoration: none;
  user-select: none;
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s opacity;
}

.tags {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.7rem;
  cursor: pointer;
}

.artworks-list {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.page-link {
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s opacity;
}

.page-link a {
  color: rgba(60, 59, 67, 0.5);
  cursor: pointer;
  text-decoration: none;
  /* text-align: center; */
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
  font-size: 22px;
  line-height: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.grow {
  flex-grow: 1;
  border-bottom: 1px dotted;
}

.page-link .details {
  position: relative;
}

.details .date {
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s opacity;
}

.page-link a:hover {
  color: rgba(60, 59, 67, 1);
}

.project-title {
  text-align: center;
  font-family: "Wremena";
  font-weight: bold;
  font-size: 32px;
  color: #3c3b43;
  line-height: 70px;
  margin: auto;
}

.interactive {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 70vw;
  max-width: 1080px;
  margin: 5rem auto 10rem;
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
