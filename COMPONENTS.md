# Component Documentation

## 📦 Component Overview

This document details all components in the application, their props, usage, and behavior.

---

## Global Components

### ErrorBoundary

**Location**: `src/components/ErrorBoundary.jsx`

**Purpose**: Wraps components to catch errors and display fallback UI.

**Props**:
```javascript
{
  children: ReactNode          // Child components to protect
}
```

**Features**:
- Catches JavaScript errors
- Displays error UI
- Provides recovery button
- Logs errors to console

**Usage**:
```jsx
<ErrorBoundary>
  <ProductPage />
</ErrorBoundary>
```

**Error States**:
- Component error displayed
- User can retry rendering
- Error logged for debugging

---

### LoadingSkeletons

**Location**: `src/components/LoadingSkeletons.jsx`

**Purpose**: Provides loading skeleton screens while data is fetching.

**Exports**:
- `FullPageSkeleton` - Full page loading state
- `ProductGallerySkeleton` - Gallery placeholder
- `ProductInfoSkeleton` - Product info placeholder
- `ReviewsSkeleton` - Review list loading
- `SimilarItemsSkeleton` - Recommendations placeholder

**Usage**:
```jsx
import { FullPageSkeleton } from '../components/LoadingSkeletons';

if (loading) {
  return <FullPageSkeleton />;
}
```

---

### Carousel

**Location**: `src/components/Carousel.jsx`

**Purpose**: Generic horizontal carousel wrapper with optional navigation buttons.

**Props**:
```javascript
{
  items: Array<any>,               // Items to render
  renderItem: (item) => ReactNode, // Render function
  ariaLabel: string,               // Accessibility label
  gapClassName: string             // Tailwind gap classes
}
```

**Features**:
- Scrollable track with button controls
- Responsive gap support
- Scroll state tracking for button visibility

---

## Page Components

### ProductPage

**Location**: `src/pages/ProductPage/ProductPage.jsx`

**Purpose**: Main product page wrapper with error boundary.

**Architecture**:
```
ProductPage (Error Boundary)
└── ProductPageContent
    ├── ProductGallery
    ├── ProductInfo
    ├── ProductTabs
    ├── ProductReviews
    └── RecommendationSection
```

**Props**: None (uses URL params)

**Route Params**:
- `productId` - Optional product ID from URL

---

## Product Page Components

### ProductGallery

**Location**: `src/components/sections/ProductGallery.jsx`

**Purpose**: Displays product images with carousel and thumbnails.

**Props**:
```javascript
{
  images: Array<string>  // Array of image URLs (required)
}
```

**Features**:
- Main image display
- Previous/next navigation
- Thumbnail gallery (5 visible)
- Lazy loading
- Error handling with placeholders
- Smooth transitions
- Responsive design

**State**:
- `activeIndex` - Currently displayed image
- `thumbStart` - Thumbnail scroll position
- `failedImages` - Track failed image loads

**Methods**:
- `goPrevious()` - Navigate to previous image
- `goNext()` - Navigate to next image
- `shiftThumbnails(direction)` - Scroll thumbnails
- `markImageFailed(index)` - Handle load errors

**Usage**:
```jsx
<ProductGallery 
  images={product.images} 
/>
```

**Responsive Behavior**:
- Thumbnail size adjusts with screen
- Navigation buttons positioned absolutely
- Touch-friendly on mobile

---

### ProductInfo

**Location**: `src/components/sections/ProductInfo.jsx`

**Purpose**: Displays product details, pricing, and purchase options.

**Props**:
```javascript
{
  product: Object,                    // Product data
  selectedSize: string,               // Currently selected size
  selectedColor: string,              // Currently selected color
  quantity: number,                   // Selected quantity
  error: string,                      // Error message
  cartLoading: boolean,               // Cart operation loading state
  onSizeChange: (size) => void,      // Size selection handler
  onColorChange: (color) => void,    // Color selection handler
  onQuantityChange: (qty) => void,   // Quantity update handler
  onIncrementQuantity: () => void,   // Increment quantity
  onDecrementQuantity: () => void,   // Decrement quantity
  onAddToCart: () => void,           // Add to cart handler
  onClearError: () => void,          // Clear error message
}
```

**Features**:
- Product header (brand, name, description)
- Pricing with discount percentage (green badge)
- MRP display with strikethrough
- Size selector (responsive grid)
- Color selector (color swatches)
- Best offers section
- Quantity selector
- Error message display
- Add to cart & Buy now buttons
- Trust badges section
- Product details (code, origin, manufacturer)

**Responsive Design**:
- Mobile-optimized spacing
- Stack layout on small screens
- Grid layout on larger screens
- Font size scales with breakpoints

**Size Selector**:
- Responsive button sizes: 12px, 14px, 16px
- Visual feedback on selection
- Purple highlight for selected

**Color Selector**:
- Circular color swatches
- Ring indicator for selected
- Color names as titles

**Best Offers**:
- Single column on mobile
- Multiple columns on desktop
- Expandable offers list

**Quantity Control**:
- Plus/minus buttons
- Direct input field
- Max quantity validation
- Minimum quantity enforcement

**Trust Badges**:
- Security, Genuine, Try & Buy, Returns
- Icons with labels
- Grid layout responsive

**Usage**:
```jsx
<ProductInfo 
  product={product}
  selectedSize={selectedSize}
  onSizeChange={handleSizeChange}
  onAddToCart={handleAddToCart}
  // ... other props
/>
```

---

### ProductTabs

**Location**: `src/components/sections/ProductTabs.jsx`

**Purpose**: Displays product specifications and description in tabs.

**Props**:
```javascript
{
  specifications: Array<{
    label: string,
    value: string
  }>,
  description: string
}
```

**Features**:
- Tab switching interface
- Specifications table
- Detailed description
- Clean typography

**Tabs**:
1. **Specifications** - Key-value pairs table
2. **Description** - Full product description

**Usage**:
```jsx
<ProductTabs 
  specifications={specs}
  description={desc}
/>
```

---

### ProductReviews

**Location**: `src/components/sections/ProductReviews.jsx`

**Purpose**: Displays customer reviews and allows submission of new reviews.

**Props**:
```javascript
{
  rating: number,              // Overall product rating (0-5)
  reviewCount: number,         // Total review count
  reviews: Array<{
    id: string,
    author: string,
    rating: number,
    title: string,
    comment: string,
    date: string
  }>
}
```

**Features**:
- Star rating display
- Reviews list
- Write review form
- Form validation
- Rating validation
- Review text validation (min 10 chars)
- Success message
- Error handling

**Form Fields**:
- Rating (1-5 stars)
- Title (required)
- Review text (10+ characters)

**Form Validation**:
- Rating required
- Title required
- Review minimum 10 characters
- Real-time error clearing

**Usage**:
```jsx
<ProductReviews 
  rating={product.rating}
  reviewCount={product.reviewCount}
  reviews={mockReviews}
/>
```

**States**:
- Form closed/open
- Submitting
- Submitted successfully
- Validation errors

---

### RecommendationSection

**Location**: `src/components/sections/RecommendationSection.jsx`

**Purpose**: Displays curated recommendation sections in responsive grids.

**Props**:
```javascript
{
  productBrand: string  // Brand name for header context
}
```

**Features**:
- Curated recommendation sections
- Responsive grid layouts per breakpoint
- Optional "View All" CTA when data is long
- Add-to-cart stubs for mock flow

**Usage**:
```jsx
<RecommendationSection productBrand={product.brand} />
```

---

## Custom Hooks

### useProduct

**Location**: `src/hooks/useProduct.js`

**Purpose**: Manages all product-related state and operations.

**Parameters**:
```javascript
productId: string  // Product to fetch
```

**Returns**:
```javascript
{
  product: Object,                   // Product data
  loading: boolean,                  // Loading state
  error: string,                     // Error message
  selectedSize: string,              // Selected size
  selectedColor: string,             // Selected color
  quantity: number,                  // Selected quantity
  cartLoading: boolean,              // Cart operation state
  updateSize: (size) => void,       // Update size
  updateColor: (color) => void,     // Update color
  updateQuantity: (qty) => void,    // Update quantity
  incrementQuantity: () => void,    // Increment quantity
  decrementQuantity: () => void,    // Decrement quantity
  addToCart: () => void,            // Add to cart
  clearError: () => void            // Clear error
}
```

**Features**:
- Mock data fetching (with TODO for API)
- Quantity clamping (1-10)
- Error handling
- Loading states
- Cart operation state

**Methods**:
- `updateSize(size)` - Set selected size
- `updateColor(color)` - Set selected color
- `updateQuantity(qty)` - Set quantity
- `incrementQuantity()` - Increment (max 10)
- `decrementQuantity()` - Decrement (min 1)
- `addToCart()` - Add to cart
- `clearError()` - Clear error message

**Usage**:
```jsx
const {
  product,
  loading,
  selectedSize,
  onAddToCart,
  // ... other state
} = useProduct(productId);
```

**Validation**:
- Quantity bounded between 1-10
- Size from available sizes
- Color from available colors

**Error Handling**:
- Missing product ID
- Failed API calls (when implemented)
- Generic error fallback

---

## Utility Functions

### productUtils

**Location**: `src/lib/productUtils.js`

**Exports**:
- `PRODUCT_LIMITS` - Quantity and review limits
- `IMAGE_PLACEHOLDER` - Fallback image URL
- `TABS` - Tabs identifiers
- `ERROR_MESSAGES` - User-facing error strings
- `calculateDiscount(price, originalPrice)` - Calculate discount %
- `formatCurrency(amount)` - Format as INR currency
- `clamp(value, min, max)` - Clamp number to range
- `getInitials(name)` - Get name initials for avatar

---

## Component Composition Best Practices

### Prop Drilling
- Pass only necessary props to children
- Use context for deeply nested data (future)

### Component Reusability
- Extract common patterns
- Use props for customization
- Provide sensible defaults

### Error Boundaries
- Wrap page-level components
- Let errors bubble up appropriately
- Provide recovery options

### Performance
- Use memo for pure components
- useCallback for handlers
- useMemo for expensive computations

---

## Testing Components

### Unit Testing Patterns

```javascript
// Test component renders
render(<ProductGallery images={mockImages} />)

// Test state updates
fireEvent.click(nextButton)

// Test error cases
render(<ProductGallery images={[]} />)
```

### Props Validation

All components have default props to handle missing data gracefully.

---

**Version**: 1.0.0
**Last Updated**: May 2026
