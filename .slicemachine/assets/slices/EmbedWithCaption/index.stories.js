import MyComponent from '../../../../slices/EmbedWithCaption';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/EmbedWithCaption'
}


export const _DefaultSlice = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"embed_with_caption","items":[],"primary":{"description":[{"type":"paragraph","text":"Nulla do consequat incididunt mollit proident nulla do veniam excepteur elit eiusmod labore dolor.","spans":[]}],"embed":{"url":"https://twitter.com/timbenniks/status/1304146886832594944","author_name":"Tim Benniks","author_url":"https://twitter.com/timbenniks","html":"<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">I’ve been diving deep on <a href=\"https://twitter.com/prismicio?ref_src=twsrc%5Etfw\">@prismicio</a> <a href=\"https://twitter.com/hashtag/slicemachine?src=hash&amp;ref_src=twsrc%5Etfw\">#slicemachine</a> today. I made all my own components and I used custom slices. It works like a charm with <a href=\"https://twitter.com/nuxt_js?ref_src=twsrc%5Etfw\">@nuxt_js</a>. Also: I’m coding with this view. <a href=\"https://t.co/F0I8X9gz39\">pic.twitter.com/F0I8X9gz39</a></p>&mdash; Tim Benniks (@timbenniks) <a href=\"https://twitter.com/timbenniks/status/1304146886832594944?ref_src=twsrc%5Etfw\">September 10, 2020</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n","width":550,"height":null,"type":"rich","cache_age":"3153600000","provider_name":"Twitter","provider_url":"http://www.twitter.com/","version":"1.0"}},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
