import smConfig from "./sm.json";

if (!smConfig.apiEndpoint) {
  console.warn("Looks like Slice Machine hasn't been bootstraped already.\nCheck the `Getting Started` section of the README file :)");
}

const { getStoriesPaths } = require('slice-machine-ui/helpers/storybook')
{/* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cardo:wght@700&family=Work+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">  */}

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
    }, {
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
    }, {
      rel: "preconnect",
      crossorigin: true,
      href: "https://fonts.gstatic.com"
    }, {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Cardo:wght@700&family=Work+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
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
        path: "/page/:uid"
      }, {
        type: "artwork",
        path: "/artwork/:uid"
      }, {
        type: "exhibition",
        path: "/exhibition/:uid"
      }, {
        type: "publication",
        path: "/publication/:uid"
      }]
    },
    linkResolver: function (doc) {
      if (doc.isBroken) {
        return '/not-found';
      }

      if (doc.type === 'home') {
        return '/';
      }

      if (['page', 'artwork', 'publication', 'exhibition'].includes(doc.type)) {
        return '/' + doc.type + '/' + doc.uid;
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
