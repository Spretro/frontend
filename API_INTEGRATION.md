# API Integration Guide

## 🔗 Overview

This guide explains how to integrate real API endpoints into the application, replacing the current mock data.

---

## 📋 Current State

### Mock Data Location
- **File**: `src/data/mockProduct.js`
- **Hook**: `src/hooks/useProduct.js`
- **Status**: Using local mock data for development

### TODO Comments in Code
```javascript
// TODO(BACKEND): Replace with actual API call
// Example production code:
// const response = await fetch(`${API_BASE_URL}/products/${productId}`)
```

---

## 🚀 Setup Environment Variables

### Create .env.local

```bash
# In project root, create .env.local file
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=10000
VITE_ENABLE_LOGGING=true
```

### Access Variables in Code

```javascript
// In any file
const apiUrl = import.meta.env.VITE_API_BASE_URL
const timeout = import.meta.env.VITE_API_TIMEOUT

// In Vite config
export default defineConfig({
  define: {
    __API_URL__: JSON.stringify(process.env.VITE_API_BASE_URL)
  }
})
```

---

## 🔌 API Endpoints Configuration

### Create a small endpoint map (recommended)

```javascript
// src/lib/apiEndpoints.js

export const API_ENDPOINTS = {
  // Products
  GET_PRODUCT: '/api/v1/products',
  GET_RECOMMENDATIONS: '/api/v1/products/:id/recommendations',

  // Cart
  ADD_TO_CART: '/api/v1/cart/items',

  // Reviews
  GET_REVIEWS: '/api/v1/products/:id/reviews',
  SUBMIT_REVIEW: '/api/v1/products/:id/reviews',
};
```

---

## 🛠️ Create API Service Layer

### New File: src/lib/api.js

```javascript
/**
 * API Service Layer
 * Centralized API communication with error handling and retry logic
 */

const DEFAULT_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || 10000)

class ApiService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'
    this.timeout = DEFAULT_TIMEOUT
    this.retryCount = 3
  }

  /**
   * Generic fetch wrapper with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: this.timeout,
      ...options,
    }

    try {
      const response = await fetch(url, defaultOptions)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Request Error:', error)
      throw error
    }
  }

  /**
   * GET request
   */
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  /**
   * POST request
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * PUT request
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // Optional: add retry logic or error mapping here if needed.
}

export default new ApiService()
```

---

## 🔄 Update useProduct Hook

### Migration from Mock to API

```javascript
// src/hooks/useProduct.js

import { useState, useEffect, useCallback } from 'react'
import apiService from '../lib/api'
import { API_ENDPOINTS } from '../lib/apiEndpoints'
import { ERROR_MESSAGES } from '../lib/productUtils'

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [cartLoading, setCartLoading] = useState(false)

  /**
   * Fetch product from API
   */
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError(ERROR_MESSAGES.productNotFound)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // API call replacing mock data
        const endpoint = `${API_ENDPOINTS.GET_PRODUCT}/${productId}`
        const data = await apiService.get(endpoint)
        
        setProduct(data)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err.message || ERROR_MESSAGES.fetchError)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  /**
   * Add to cart
   */
  const addToCart = useCallback(async () => {
    if (!selectedSize) {
      setError(ERROR_MESSAGES.sizeRequired)
      return
    }
    if (!selectedColor) {
      setError(ERROR_MESSAGES.colorRequired)
      return
    }

    try {
      setCartLoading(true)
      const cartData = {
        productId,
        size: selectedSize,
        color: selectedColor,
        quantity,
      }
      
      await apiService.post(API_ENDPOINTS.ADD_TO_CART, cartData)
      // Handle success - update UI, show toast, etc.
    } catch (err) {
      setError(err.message || ERROR_MESSAGES.generic)
    } finally {
      setCartLoading(false)
    }
  }, [productId, selectedSize, selectedColor, quantity])

  return {
    product,
    loading,
    error,
    selectedSize,
    selectedColor,
    quantity,
    cartLoading,
    updateSize: setSelectedSize,
    updateColor: setSelectedColor,
    updateQuantity: setQuantity,
    incrementQuantity: () => setQuantity(q => Math.min(q + 1, 10)),
    decrementQuantity: () => setQuantity(q => Math.max(q - 1, 1)),
    addToCart,
    clearError: () => setError(null),
  }
}
```

---

## 📦 Fetch Recommendations

### Update RecommendationSection Component

```javascript
// src/components/sections/RecommendationSection.jsx

import { useEffect, useState } from 'react'
import apiService from '../../lib/api'
import { API_ENDPOINTS } from '../../lib/apiEndpoints'

export default function RecommendationSection({ productId, productBrand = '' }) {
  const [recommendations, setRecommendations] = useState({
    sameBrandProducts: [],
    similarProducts: [],
    customersAlsoLike: [],
    recommendedBySpretro: [],
  })

  useEffect(() => {
    if (!productId) return

    const fetchRecommendations = async () => {
      try {
        const endpoint = API_ENDPOINTS.GET_RECOMMENDATIONS.replace(':id', productId)
        const data = await apiService.get(endpoint)
        setRecommendations(data)
      } catch (error) {
        console.error('Failed to fetch recommendations:', error)
      }
    }

    fetchRecommendations()
  }, [productId])

  // ... render with recommendations
}
```

---

## 💬 Fetch Reviews

### Update ProductReviews Component

```javascript
// src/components/sections/ProductReviews.jsx

import { useEffect, useState } from 'react'
import apiService from '../../lib/api'
import { API_ENDPOINTS } from '../../lib/apiEndpoints'

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  /**
   * Fetch product reviews
   */
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const endpoint = API_ENDPOINTS.GET_REVIEWS.replace(':id', productId)
        const data = await apiService.get(endpoint)
        setReviews(data)
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchReviews()
    }
  }, [productId])

  /**
   * Submit new review
   */
  const submitReview = async (reviewData) => {
    try {
      const payload = {
        productId,
        ...reviewData,
      }
      
      const endpoint = API_ENDPOINTS.SUBMIT_REVIEW.replace(':id', productId)
      const response = await apiService.post(endpoint, payload)
      
      // Add new review to list
      setReviews([response, ...reviews])
      return true
    } catch (error) {
      console.error('Failed to submit review:', error)
      return false
    }
  }

  return (
    // Component JSX with submitReview handler
  )
}
```

---

## 🚨 Error Handling Best Practices

### API Error Responses

```javascript
// Expected API error format
{
  success: false,
  error: {
    code: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
    details: 'Product ID 123 does not exist'
  }
}
```

### Handle in Component

```javascript
try {
  const data = await apiService.get(endpoint)
  if (data.success === false) {
    throw new Error(data.error.message)
  }
  setProduct(data)
} catch (error) {
  setError(error.message)
}
```

---

## 🔄 Request/Response Formatting

### Request Format
```javascript
POST /api/v1/reviews/submit
Content-Type: application/json

{
  "productId": "1307441",
  "rating": 5,
  "title": "Great product!",
  "comment": "This product exceeded my expectations.",
  "author": "John Doe"
}
```

### Response Format
```javascript
{
  "success": true,
  "data": {
    "id": "review123",
    "productId": "1307441",
    "rating": 5,
    "title": "Great product!",
    "comment": "This product exceeded my expectations.",
    "author": "John Doe",
    "createdAt": "2026-05-25T10:30:00Z"
  }
}
```

---

---

## 🧪 Testing API Integration

### Mock API Calls in Tests

```javascript
// Use msw (Mock Service Worker)
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/v1/products/:id', (req, res, ctx) => {
    return res(ctx.json({ id: req.params.id, name: 'Test' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## 📈 Performance & Caching

### Add Response Caching

```javascript
class ApiService {
  constructor() {
    this.cache = new Map()
  }

  async get(endpoint) {
    if (this.cache.has(endpoint)) {
      return this.cache.get(endpoint)
    }

    const data = await this.request(endpoint, { method: 'GET' })
    this.cache.set(endpoint, data)
    return data
  }

  clearCache() {
    this.cache.clear()
  }
}
```

---

## 📝 Checklist for API Integration

- [ ] Environment variables configured
- [ ] API endpoints defined in apiEndpoints
- [ ] API service layer created
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Response format validated
- [ ] Authentication implemented (if needed)
- [ ] Retry logic added
- [ ] Rate limiting considered
- [ ] Tests written for API calls
- [ ] Documentation updated

---

## 🔗 Related Resources

- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST API Best Practices](https://restfulapi.net/)
- [Error Handling in JavaScript](https://javascript.info/try-catch)

---

**Version**: 1.0.0
**Last Updated**: May 2026
