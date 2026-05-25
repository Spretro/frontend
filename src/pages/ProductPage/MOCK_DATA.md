# Mock Data Structure

All dummy data is centralized in `mockData.json` for easy replacement with real API data in production.

## File Structure

```
mockData.json
├── product (main product object)
│   ├── id
│   ├── name
│   ├── brand
│   ├── description
│   ├── price
│   ├── originalPrice
│   ├── rating
│   ├── reviews (review count)
│   ├── productCode
│   ├── origin
│   ├── manufacturer
│   ├── images (array of image URLs)
│   ├── sizes (array of size strings)
│   ├── colors (array of color objects with name and hex)
│   ├── offers (array of offer objects)
│   └── specifications (array of spec objects with label and value)
├── reviews (array of review objects)
│   ├── id
│   ├── author
│   ├── rating
│   ├── title
│   ├── comment
│   └── date
└── similarProducts (array of product objects)
    ├── id
    ├── name
    ├── price
    ├── rating
    ├── reviews
    └── image
```

## How to Replace with Real Data

### 1. **In `useProduct` hook** (`hooks/useProduct.js`)

Replace the mock API delay and data:

```javascript
// BEFORE (current):
await new Promise((resolve) => setTimeout(resolve, 500))
setProduct(mockProductData)

// AFTER (production):
const response = await fetch(`/api/products/${productId}`)
if (!response.ok) throw new Error('Failed to fetch product')
const data = await response.json()
setProduct(data)
```

### 2. **In `ProductReviews` component** (`components/ProductReviews.jsx`)

Replace mock reviews with API data:

```javascript
// In ProductPage.jsx, replace this:
<ProductReviews productId={product.id} rating={product.rating} reviews={mockData.reviews} />

// With this (after adding reviews endpoint):
const [reviews, setReviews] = useState([])
useEffect(() => {
  fetch(`/api/products/${productId}/reviews`)
    .then(r => r.json())
    .then(data => setReviews(data))
}, [productId])

<ProductReviews productId={product.id} rating={product.rating} reviews={reviews} />
```

### 3. **In `SimilarItems` component** (`components/SimilarItems.jsx`)

Replace mock similar products with API data:

```javascript
// In ProductPage.jsx, replace this:
<SimilarItems productId={product.id} products={mockData.similarProducts} />

// With this (after adding similar products endpoint):
const [similarProducts, setSimilarProducts] = useState([])
useEffect(() => {
  fetch(`/api/products/${productId}/similar`)
    .then(r => r.json())
    .then(data => setSimilarProducts(data))
}, [productId])

<SimilarItems productId={product.id} products={similarProducts} />
```

### 4. **Add to Cart** (`hooks/useProduct.js`)

Replace mock console.log with actual API call:

```javascript
// BEFORE:
console.log('Adding to cart:', { ... })

// AFTER:
const response = await fetch('/api/cart/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId,
    size: selectedSize,
    color: selectedColor,
    quantity,
  }),
})
const result = await response.json()
if (!response.ok) throw new Error(result.message)
```

## API Endpoints Required

- `GET /api/products/{productId}` - Fetch single product
- `GET /api/products/{productId}/reviews` - Fetch product reviews
- `GET /api/products/{productId}/similar` - Fetch similar products
- `POST /api/cart/add` - Add product to cart

## Component Usage

All components accept mock data as fallback:

```javascript
// ProductInfo automatically uses mock offers if not provided
<ProductInfo product={product} offers={product.offers} />

// ProductTabs automatically uses mock specifications if not provided
<ProductTabs specifications={product.specifications} />

// ProductReviews automatically uses mock reviews if empty array passed
<ProductReviews reviews={reviews.length > 0 ? reviews : mockData.reviews} />

// SimilarItems automatically uses mock products if empty array passed
<SimilarItems products={products.length > 0 ? products : mockData.similarProducts} />
```

## Update Process

1. Finalize API endpoints with backend team
2. Update `useProduct` hook with actual `/api/products/{productId}` endpoint
3. Add state management for reviews and similar products in `ProductPage.jsx`
4. Update component props to use state data instead of mock data
5. Test thoroughly with real data
6. Keep `mockData.json` for development/testing purposes

**Note:** The mock data is production-grade and mirrors the expected API response structure, making the transition seamless!
