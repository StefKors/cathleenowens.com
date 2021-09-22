```
const allWithTag = await $prismic.api.query(
  $prismic.predicates.at('document.tags', ['WebToPrint'])
);
```