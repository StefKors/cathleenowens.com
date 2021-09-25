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
      mock: { "variation": "default-slice", "name": "Default slice", "slice_type": "image_with_caption", "items": [], "primary": { "description": [{ "type": "paragraph", "text": "Ullamco laborum eu ullamco amet dolor fugiat irure.", "spans": [] }], "Image": { "dimensions": { "width": 900, "height": 500 }, "alt": "Placeholder image", "copyright": null, "url": "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=900&h=500&fit=crop" } }, "id": "_DefaultSlice" }
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
