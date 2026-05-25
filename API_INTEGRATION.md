# API Integration Guide

## 🔗 Overview

This guide explains how to integrate real API endpoints into the application, replacing the current mock data.

---

## 📋 Current State

### Mock Data Location
- **File**: `src/pages/ProductPage/mockData.json`
- **Hook**: `src/pages/ProductPage/hooks/useProduct.js`
- **Status**: Using local mock data for development

### TODO Comments in Code
```javascript
// TODO: Replace with actual API call
// Example production code:
// const response = await fetch(`${API_ENDPOINTS.GET_PRODUCT}/${productId}`)
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

### Update constants.js

```javascript
// src/utils/constants.js

export const API_ENDPOINTS = {
  // Products
  GET_PRODUCT: '/api/v1/products',
  GET_SIMILAR_PRODUCTS: '/api/v1/products/:id/similar',
  
  // Cart
  ADD_TO_CART: '/api/v1/cart/add',
  GET_CART: '/api/v1/cart',
  UPDATE_CART: '/api/v1/cart/update',
  
  // Reviews
  GET_REVIEWS: '/api/v1/products/:id/reviews',
  SUBMIT_REVIEW: '/api/v1/reviews/submit',
  
  // Wishlist
  ADD_WISHLIST: '/api/v1/wishlist/add',
  GET_WISHLIST: '/api/v1/wishlist',
  REMOVE_WISHLIST: '/api/v1/wishlist/remove',
}

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
}
```

---

## 🛠️ Create API Service Layer

### New File: src/utils/api.js

```javascript
/**
 * API Service Layer
 * Centralized API communication with error handling and retry logic
 */

import { API_CONFIG, ERROR_MESSAGES } from './constants'

class ApiService {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
    this.retryCount = API_CONFIG.RETRY_COUNT
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
      throw this._handleError(error)
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

  /**
   * Handle API errors
   */
  _handleError(error) {
    if (error.message.includes('Network')) {
      return new Error(ERROR_MESSAGES.NETWORK_ERROR)
    }
    if (error.message.includes('timeout')) {
      return new Error('Request timeout. Please try again.')
    }
    return error
  }

  /**
   * Replace URL params in endpoint
   */
  _replaceParams(endpoint, params = {}) {
    let url = endpoint
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value)
    })
    return url
  }
}

export default new ApiService()
```

---

## 🔄 Update useProduct Hook

### Migration from Mock to API

```javascript
// src/pages/ProductPage/hooks/useProduct.js

import { useState, useEffect, useCallback } from 'react'
import apiService from '../../../utils/api'
import { API_ENDPOINTS, ERROR_MESSAGES } from '../../../utils/constants'

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
        setError(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
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
        setError(err.message || ERROR_MESSAGES.FETCH_ERROR)
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
    if (!selectedSize || !selectedColor) {
      setError(ERROR_MESSAGES.SIZE_COLOR_ERROR)
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
      setError(err.message || ERROR_MESSAGES.GENERIC_ERROR)
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

## 📦 Fetch Similar Products

### Update SimilarItems Component

```javascript
// src/pages/ProductPage/components/SimilarItems.jsx

import { useEffect, useState } from 'react'
import apiService from '../../../utils/api'
import { API_ENDPOINTS } from '../../../utils/constants'

export default function SimilarItems({ products = [] }) {
  const [items, setItems] = useState(products)
  const [loading, setLoading] = useState(false)

  // Fetch similar products if not provided
  useEffect(() => {
    if (items.length === 0 && productId) {
      const fetchSimilar = async () => {
        try {
          setLoading(true)
          const endpoint = `${API_ENDPOINTS.GET_SIMILAR_PRODUCTS}/${productId}`
          const data = await apiService.get(endpoint)
          setItems(data)
        } catch (error) {
          console.error('Failed to fetch similar products:', error)
        } finally {
          setLoading(false)
        }
      }
      
      fetchSimilar()
    }
  }, [productId])

  // ... rest of component
}
```

---

## 💬 Fetch Reviews

### Update ProductReviews Component

```javascript
// src/pages/ProductPage/components/ProductReviews.jsx

import { useEffect, useState } from 'react'
import apiService from '../../../utils/api'
import { API_ENDPOINTS } from '../../../utils/constants'

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
        const endpoint = `${API_ENDPOINTS.GET_REVIEWS}/${productId}`
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
      
      const response = await apiService.post(
        API_ENDPOINTS.SUBMIT_REVIEW,
        payload
      )
      
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

## 🛒 Wishlist Integration

### Create Wishlist Hook

```javascript
// src/pages/ProductPage/hooks/useWishlist.js

import { useState, useCallback } from 'react'
import apiService from '../../../utils/api'
import { API_ENDPOINTS } from '../../../utils/constants'

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState({})
  const [loading, setLoading] = useState(false)

  /**
   * Add to wishlist
   */
  const addToWishlist = useCallback(async (productId) => {
    try {
      setLoading(true)
      await apiService.post(API_ENDPOINTS.ADD_WISHLIST, { productId })
      setWishlist(prev => ({ ...prev, [productId]: true }))
    } catch (error) {
      console.error('Failed to add to wishlist:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Remove from wishlist
   */
  const removeFromWishlist = useCallback(async (productId) => {
    try {
      setLoading(true)
      await apiService.delete(`${API_ENDPOINTS.REMOVE_WISHLIST}/${productId}`)
      setWishlist(prev => ({ ...prev, [productId]: false }))
    } catch (error) {
      console.error('Failed to remove from wishlist:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { wishlist, addToWishlist, removeFromWishlist, loading }
}
```

---

## 🔐 Authentication (Future)

### Add Auth Service

```javascript
// src/utils/auth.js (Future)

export const authService = {
  async login(email, password) {
    // Login API call
  },

  async logout() {
    // Logout API call
  },

  async getProfile() {
    // Get user profile
  },

  setToken(token) {
    localStorage.setItem('authToken', token)
  },

  getToken() {
    return localStorage.getItem('authToken')
  },
}
```

### Update API Service for Auth Headers

```javascript
async request(endpoint, options = {}) {
  const token = localStorage.getItem('authToken')
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  // Rest of request logic
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
  "review": "This product exceeded my expectations.",
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
    "review": "This product exceeded my expectations.",
    "author": "John Doe",
    "createdAt": "2026-05-25T10:30:00Z"
  }
}
```

---

## 📊 Rate Limiting & Throttling

### Implement Request Debouncing

```javascript
// For search, filter operations
import { debounce } from '../utils/helpers'

const debouncedSearch = debounce(async (query) => {
  const results = await apiService.get(`/search?q=${query}`)
  setResults(results)
}, 500)
```

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
- [ ] API endpoints defined in constants
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
