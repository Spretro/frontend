# Coding Standards & Guidelines

## 📋 Overview

This document defines coding standards, conventions, and best practices for the Spretro Frontend project. All team members should follow these guidelines to maintain code quality and consistency.

---

## 🎯 Code Quality Principles

### 1. Readability First
- Clear, self-documenting code
- Meaningful variable and function names
- Comments for complex logic
- Consistent formatting

### 2. Single Responsibility
- One component = one purpose
- One function = one task
- Small, focused files
- Easy to test and maintain

### 3. DRY (Don't Repeat Yourself)
- Extract reusable logic to utilities
- Use custom hooks for repeated patterns
- Create shared components
- Avoid code duplication

### 4. KISS (Keep It Simple, Stupid)
- Avoid over-engineering
- Use straightforward solutions
- Prefer clarity over cleverness
- Document complex decisions

---

## 📝 Naming Conventions

### Components

**PascalCase** for component names:
```jsx
// ✅ Good
export default function ProductGallery() { }
function ImageCarousel() { }
export const ProductCard = () => { }

// ❌ Bad
export default function product_gallery() { }
function imageCarousel() { }
export const productCard = () => { }
```

### Functions & Variables

**camelCase** for functions and variables:
```javascript
// ✅ Good
const handleSizeChange = () => { }
const isValidEmail = () => { }
let currentProduct = null
const submitForm = async () => { }

// ❌ Bad
const HandleSizeChange = () => { }
const is_valid_email = () => { }
let current_product = null
```

### Constants

**UPPER_SNAKE_CASE** for constants:
```javascript
// ✅ Good
const MAX_QUANTITY = 10
const API_ENDPOINT = 'https://api.example.com'
const DEFAULT_IMAGE = 'https://placeholder.com'

// ❌ Bad
const maxQuantity = 10
const apiEndpoint = 'https://api.example.com'
```

### Hooks

**useXxx** pattern for custom hooks:
```javascript
// ✅ Good
export const useProduct = () => { }
export const useFetch = () => { }
export const useLocalStorage = () => { }

// ❌ Bad
export const getProduct = () => { }
export const fetchData = () => { }
```

### Event Handlers

**on** prefix + descriptive name:
```javascript
// ✅ Good
const onSizeChange = (size) => { }
const onAddToCart = () => { }
const onFormSubmit = (e) => { }

// ❌ Bad
const sizeChange = (size) => { }
const addCart = () => { }
const submit = (e) => { }
```

### Private Functions

**_** prefix for private/internal functions:
```javascript
// ✅ Good
const _validateForm = () => { }
const _calculateDiscount = () => { }

// ❌ Bad
const validateForm = () => { }
const calculateDiscount = () => { }
```

---

## 📐 File Organization

### Directory Structure

```
feature/
├── components/
│   ├── ComponentName.jsx
│   └── SubComponent.jsx
├── hooks/
│   └── useFeature.js
├── utils/
│   └── featureHelpers.js
└── index.js (optional barrel export)
```

### Component File Size

- **Small components**: < 150 lines
- **Medium components**: 150-300 lines
- **Large components**: > 300 lines (consider splitting)

### File Naming

```
// Components
ProductGallery.jsx
ProductCard.jsx
LoadingSpinner.jsx

// Hooks
useProduct.js
useFetch.js
useLocalStorage.js

// Utils
constants.js
helpers.js
validators.js
```

---

## 🔤 Code Formatting

### Indentation

- Use **2 spaces** for indentation
- Never mix spaces and tabs
- Configure IDE to auto-format

### Line Length

- Aim for **80-120 characters** per line
- Break long lines at logical points
- Use template literals for strings

### Imports

```javascript
// ✅ Good - Group by type
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Heart } from 'lucide-react'

import ProductCard from '../components/ProductCard'
import { formatCurrency } from '../utils/helpers'
import { PRODUCT_CONSTANTS } from '../utils/constants'

// ❌ Bad - Random order
import ProductCard from '../components/ProductCard'
import React from 'react'
import { formatCurrency } from '../utils/helpers'
import { Star } from 'lucide-react'
```

### Export Statements

```javascript
// ✅ Good - Named export
export const MyComponent = () => { }
export const useMyHook = () => { }

// ✅ Good - Default export
export default function MyPage() { }

// ❌ Bad - Mix of both without clear reason
export default MyComponent
export const helper = () => { }
```

---

## 📚 Comments & Documentation

### JSDoc Comments

**Function Documentation**:
```javascript
// ✅ Good
/**
 * Calculate discount percentage
 * @param {number} price - Current price
 * @param {number} originalPrice - Original price
 * @returns {number} Discount percentage (0-100)
 */
export const calculateDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

// ❌ Bad - No documentation
const calculateDiscount = (price, originalPrice) => {
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
```

**Component Documentation**:
```jsx
// ✅ Good
/**
 * ProductGallery Component
 * Displays product images with carousel and thumbnail navigation
 * @param {Array<string>} images - Array of product image URLs
 * @returns {JSX.Element} Product gallery with controls
 */
export default function ProductGallery({ images = [] }) {
  // Component code
}

// ❌ Bad - Missing documentation
export default function ProductGallery({ images = [] }) {
  // Component code
}
```

### Inline Comments

```javascript
// ✅ Good - Explains why, not what
// Clamp quantity to prevent exceeding max inventory
const clampedQuantity = Math.max(MIN, Math.min(qty, MAX))

// ❌ Bad - Obvious from code
// Set clampedQuantity to MAX if qty is greater than MAX
const clampedQuantity = Math.max(MIN, Math.min(qty, MAX))
```

### Section Comments

```javascript
// ✅ Good - Clear section headers
// ===== Event Handlers =====
const handleSizeChange = () => { }
const handleColorChange = () => { }

// ===== Effects =====
useEffect(() => { }, [])
```

---

## 🔧 React Best Practices

### Component Structure

```jsx
// ✅ Good - Logical organization
export default function ProductCard({ product }) {
  // 1. State
  const [isWishlisted, setIsWishlisted] = useState(false)

  // 2. Effects
  useEffect(() => {
    // Side effects
  }, [])

  // 3. Handlers
  const handleClick = () => { }
  const handleWishlist = () => { }

  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Props Default Values

```javascript
// ✅ Good - Defensive defaults
function ProductCard({ 
  product = {}, 
  onSelect = () => {},
  featured = false 
}) {
  // Component code
}

// ❌ Bad - No defaults
function ProductCard({ product, onSelect, featured }) {
  // Will crash if props not provided
}
```

### useState Usage

```javascript
// ✅ Good - Clear state purpose
const [selectedSize, setSelectedSize] = useState(null)
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)

// ❌ Bad - Unclear naming
const [size, setSize] = useState(null)
const [loading, setLoading] = useState(false)
const [err, setErr] = useState(null)
```

### useEffect Dependencies

```javascript
// ✅ Good - Explicit dependencies
useEffect(() => {
  fetchProduct(productId)
}, [productId])

// ✅ Good - Empty array for mount only
useEffect(() => {
  initializeApp()
}, [])

// ❌ Bad - Missing dependencies
useEffect(() => {
  fetchProduct(productId)
}, [])

// ❌ Bad - Unnecessary dependencies
useEffect(() => {
  console.log('Component rendered')
}, [dependency1, dependency2])
```

### Conditional Rendering

```javascript
// ✅ Good - Clear logic
{isLoading && <LoadingSkeleton />}
{error && <ErrorMessage error={error} />}
{products.length > 0 ? (
  <ProductList products={products} />
) : (
  <EmptyState />
)}

// ❌ Bad - Confusing logic
{isLoading ? <LoadingSkeleton /> : null}
{products.length && <ProductList products={products} />}
```

### Key Prop in Lists

```javascript
// ✅ Good - Use stable unique ID
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}

// ❌ Bad - Don't use index as key
{products.map((product, index) => (
  <ProductCard key={index} product={product} />
))}

// ❌ Bad - No key
{products.map((product) => (
  <ProductCard product={product} />
))}
```

---

## 🎨 Styling Guidelines

### Tailwind CSS Usage

```jsx
// ✅ Good - Use Tailwind classes
function Button({ variant = 'primary' }) {
  return (
    <button className="px-4 py-2 rounded font-semibold transition hover:shadow-lg">
      Click me
    </button>
  )
}

// ❌ Bad - Inline styles
function Button() {
  return (
    <button style={{ padding: '8px 16px', borderRadius: '4px' }}>
      Click me
    </button>
  )
}
```

### Responsive Classes

```jsx
// ✅ Good - Mobile-first responsive
<div className="w-full p-4 sm:p-6 md:p-8 lg:w-1/2">
  Content
</div>

// ❌ Bad - Desktop-first approach
<div className="w-1/2 p-8 sm:p-4 md:p-4">
  Content
</div>
```

### Color Usage

```jsx
// ✅ Good - Use theme colors from constants
const bgColor = 'bg-brand-purple'
const textColor = 'text-gray-600'

// ❌ Bad - Hardcoded colors
const bgColor = 'bg-[#6A2CFF]'
```

---

## 🧪 Testing Standards

### Test File Naming

```
ComponentName.test.jsx
ComponentName.spec.jsx
__tests__/ComponentName.jsx
```

### Test Structure

```javascript
// ✅ Good - Organized test structure
describe('ProductCard', () => {
  it('should render product with correct name', () => {
    // Arrange
    const props = { name: 'Test Product' }
    
    // Act
    render(<ProductCard {...props} />)
    
    // Assert
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('should handle click event', () => {
    // Test click handling
  })
})
```

---

## 🚨 Error Handling

### Try-Catch Blocks

```javascript
// ✅ Good - Specific error handling
try {
  const response = await fetchProduct(id)
  setProduct(response)
} catch (error) {
  console.error('Failed to fetch product:', error)
  setError('Could not load product. Please try again.')
}

// ❌ Bad - Swallowing errors
try {
  const response = await fetchProduct(id)
  setProduct(response)
} catch (error) {
  // Silently fails
}
```

### User-Facing Errors

```javascript
// ✅ Good - User-friendly messages
setError('Please select a size and color before adding to cart')

// ❌ Bad - Technical error messages
setError('ValidationError: SIZE_COLOR_MISSING')
```

---

## 📊 Performance Guidelines

### Avoid Re-renders

```javascript
// ✅ Good - useCallback for handlers
const handleChange = useCallback((value) => {
  updateState(value)
}, [])

// ❌ Bad - Function redefined on each render
const handleChange = (value) => {
  updateState(value)
}
```

### Memoize Expensive Computations

```javascript
// ✅ Good - useMemo for calculations
const discountAmount = useMemo(() => {
  return calculateDiscount(price, originalPrice)
}, [price, originalPrice])

// ❌ Bad - Recalculates on every render
const discountAmount = calculateDiscount(price, originalPrice)
```

### Lazy Load Images

```jsx
// ✅ Good - Lazy loading enabled
<img src={url} alt="Product" loading="lazy" />

// ❌ Bad - Eager loading
<img src={url} alt="Product" />
```

---

## 🔐 Security Best Practices

### Input Validation

```javascript
// ✅ Good - Validate user input
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// ❌ Bad - No validation
const handleEmail = (email) => {
  sendEmail(email) // What if email is invalid?
}
```

### XSS Prevention

```jsx
// ✅ Good - React escapes by default
<p>{userInput}</p>

// ❌ Bad - Never use dangerouslySetInnerHTML
<p dangerouslySetInnerHTML={{ __html: userInput }} />
```

---

## 📋 Checklist Before Commit

- [ ] Code follows naming conventions
- [ ] Components have JSDoc comments
- [ ] No console.log() or debugging code
- [ ] ESLint passes
- [ ] No unused imports
- [ ] Responsive design tested
- [ ] Error cases handled
- [ ] Accessibility considered
- [ ] Performance optimized
- [ ] Tests pass (when applicable)

---

## 🤝 Code Review Expectations

### For Authors
- Self-review before submitting PR
- Write clear commit messages
- Test thoroughly
- Document changes

### For Reviewers
- Check code quality
- Verify functionality
- Suggest improvements
- Approve or request changes

---

## 🔗 Related Documents

- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project structure
- [COMPONENTS.md](./COMPONENTS.md) - Component details
- [SETUP.md](./SETUP.md) - Development setup

---

**Version**: 1.0.0
**Last Updated**: May 2026
