const fallback = {
  title: "Cathleen Owens",
  description: "homepage.data.meta_description",
  date: "homepage.last_publication_date",
  url: "https://www.cathleenowens.com",
  tags: ["Artworks", "Exhibitions", "Publications", "Organizer"],
  social: {
    image: "https://www.cathleenowens.com/social.png",
    title: "Works by Cathleen Owens",
    description: "homepagedata.social_cards[0]?.social_card_description",
  },
}

export default (meta) => {
  return {
    title: meta.title || fallback.title,
    meta: [
      {
        hid: "description",
        name: "description",
        content: (meta.description) || description,
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: (meta?.url) || fallback.url,
      },
      {
        hid: "og:title",
        property: "og:title",
        content: (meta?.title) || fallback.title,
      },
      {
        hid: "og:description",
        property: "og:description",
        content: (meta?.description) || fallback.description,
      },
      {
        hid: "og:image",
        property: "og:image",
        content: (meta?.social?.image) || fallback.social.image,
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: (meta?.url) || fallback.url,
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: (meta && meta.title) || title,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: (meta && meta.description) || description,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: (meta?.social?.image) || fallback.social.image,
      },
      {
        property: "article:published_time",
        content: (meta?.date) || fallback.date,
      },
      {
        property: "article:modified_time",
        content: (meta?.date) || fallback.date,
      },
      { name: "twitter:label1", content: "Works by" },
      { name: "twitter:data1", content: "Cathleen Owens" },
      { name: "twitter:label2", content: "Grouped in" },
      {
        name: "twitter:data2",
        content: meta?.tags.length ? meta?.tags.toString() : fallback.tags.toString(),
      },
    ],
    link: [
      {
        hid: "canonical",
        rel: "canonical",
        href: (meta?.url) || fallback.url
      },
    ],
  }
};