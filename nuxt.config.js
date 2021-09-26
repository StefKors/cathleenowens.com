import smConfig from "./sm.json";

if (!smConfig.apiEndpoint) {
  console.warn("Looks like Slice Machine hasn't been bootstraped already.\nCheck the `Getting Started` section of the README file :)");
}

const { getStoriesPaths } = require('slice-machine-ui/helpers/storybook')

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Cathleen Owens",
    meta: [{
      charset: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      hid: "description",
      name: "description",
      content: ""
    }],
    link: [{
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg"
    }]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [["@nuxtjs/prismic", {
    endpoint: smConfig.apiEndpoint || "https://cathleenowens.cdn.prismic.io/api/v2",
    apiOptions: {
      routes: [{
        type: "page",
        path: "/:uid"
      }]
    },
    linkResolver: function (doc) {
      if (doc.isBroken) {
        return '/not-found';
      }

      if (doc.type === 'home') {
        return '/';
      }

      if (doc.type === 'page') {
        return '/' + doc.uid;
      }

      return '/not-found';
    }
  }], ["nuxt-sm"]],
  generate: {
    fallback: true,
    ignore: [
      'components/CursorBar.vue'
    ]
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ["vue-slicezone", "nuxt-sm"]
  },
  storybook: {
    stories: [...getStoriesPaths(), /*...*/]
  }
};
