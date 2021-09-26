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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"image_with_caption","items":[],"primary":{"description":[{"type":"paragraph","text":"Et nisi sint ea veniam veniam in Lorem anim ex et do pariatur velit nisi irure. Qui officia incididunt exercitation elit aliqua do commodo ea Lorem non fugiat excepteur consectetur officia.","spans":[]}],"Image":{"dimensions":{"width":500,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=500&h=500&fit=crop"}},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
