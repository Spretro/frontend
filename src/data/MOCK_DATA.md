# Product Page Mock Data

All Product Page mock data lives in `src/data/mockProduct.js`.

Every mock block is marked with:

```js
// MOCK DATA START
// TODO(BACKEND): Replace with ...
// MOCK DATA END
```

Current backend replacement points:

- `mockProduct`: replace with `GET /products/:id`
- `mockReviews`: replace with `GET /products/:id/reviews`
- `mockRecommendations.sameBrandProducts`: replace with `GET /products/:id/recommendations?section=same-brand`
- `mockRecommendations.similarProducts`: replace with `GET /products/:id/recommendations?section=similar`
- `mockRecommendations.customersAlsoLike`: replace with `GET /products/:id/recommendations?section=customers-also-like`
- `mockRecommendations.recommendedBySpretro`: replace with `GET /products/:id/recommendations?section=spretro`
- `useProduct`: replace the mock fetch delay and assignment with the Product API
- `useProduct.addToCart`: replace the simulated cart write with `POST /cart/items`
- `RecommendationSection.handleRecommendationAddToCart`: replace the simulated card add action with `POST /cart/items`
- `ProductReviews.handleSubmitReview`: replace the simulated review submit with `POST /products/:id/reviews`

Expected product variant shape:

```js
colorVariants: [
  {
    id: "olive-green",
    name: "Olive Green",
    image: "https://...",
  },
]
```

Products without `colorVariants` should omit the field or return an empty array.
