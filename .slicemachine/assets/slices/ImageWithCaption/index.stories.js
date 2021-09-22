import MyComponent from '../../../../slices/ImageWithCaption';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ImageWithCaption'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"image_with_caption","items":[],"primary":{"title":[{"type":"heading1","text":"Enhance intuitive experiences","spans":[]}],"description":[{"type":"paragraph","text":"Tempor ad voluptate incididunt cillum reprehenderit mollit. Ipsum excepteur ad magna deserunt eiusmod sint quis veniam dolor amet incididunt qui.","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
