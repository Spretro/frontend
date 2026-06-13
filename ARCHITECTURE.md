# Project Architecture

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────┐
│              React Application              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌────────────────────────────────────┐   │
│  │      React Router (Routes)         │   │
│  ├────────────────────────────────────┤   │
│  │  Product Page                       │   │
│  │  /product/:productId                │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ┌────────────────────────────────────┐   │
│  │    ProductPage with Components     │   │
│  ├────────────────────────────────────┤   │
│  │ ProductGallery │ ProductInfo       │   │
│  │ ProductTabs    │ ProductReviews    │   │
│  │ RecommendationSection              │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ┌────────────────────────────────────┐   │
│  │    Utilities & Helpers             │   │
│  ├────────────────────────────────────┤   │
│  │ Helpers   │ Hooks   │ Mock Data    │   │
│  └────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## 🗂️ Directory Structure

### `/src`
Root source directory containing all application code.

### `/src/components`
**Global reusable components** used across the application.

```
components/
├── ErrorBoundary.jsx      # Error boundary wrapper component
├── LoadingSkeletons.jsx   # Skeleton loading states
├── Carousel.jsx            # Horizontal scroll utility
└── sections/               # Product page sections
    ├── ProductGallery.jsx
    ├── ProductInfo.jsx
    ├── ProductTabs.jsx
    ├── ProductReviews.jsx
    └── RecommendationSection.jsx
```

#### ErrorBoundary
- Catches errors in child components
- Displays fallback UI
- Logs errors to console

#### LoadingSkeletons
- Skeleton screens while loading
- Placeholder animations
- Improves perceived performance

### `/src/pages`
**Page-level components** for different routes.

```
pages/
└── ProductPage/
    ├── ProductPage.jsx    # Main product page wrapper
    └── ProductPage.css    # Page styles

data/
├── mockProduct.js         # Mock product data
└── MOCK_DATA.md           # Mock data documentation

hooks/
└── useProduct.js          # Product data management hook
```

### `/src/lib`
**Utility functions and constants** used throughout the app.

```
lib/
└── productUtils.js        # App-wide helpers/constants
```

## 🔄 Component Hierarchy

```
App
└── ProductPage (Error Boundary)
    └── ProductPageContent
        ├── ProductGallery
        │   ├── Image Carousel
        │   └── Thumbnail Gallery
        │
        ├── ProductInfo
        │   ├── Product Header
        │   ├── Pricing Section
        │   ├── Size Selector
        │   ├── Color Selector
        │   ├── Best Offers
        │   ├── Quantity Selector
        │   └── Action Buttons
        │
        ├── ProductTabs
        │   ├── Specifications Tab
        │   └── Description Tab
        │
        ├── ProductReviews
        │   ├── Reviews List
        │   └── Review Form
        │
        └── RecommendationSection
            ├── Curated product grids
            └── Optional View All CTA
```

## 🔌 Data Flow

### Product Data Flow

```
mockProduct.js
    ↓
useProduct Hook
    ├── product state
    ├── loading state
    ├── error state
    ├── selectedSize state
    ├── selectedColor state
    └── quantity state
    ↓
ProductPageContent
    ├── ProductGallery (images)
    ├── ProductInfo (product, quantity, selections)
    ├── ProductTabs (specifications, description)
    ├── ProductReviews (reviews, rating)
    └── RecommendationSection (recommendations)
```

### Event Flow

```
User Interaction
    ↓
Component Handler
    ↓
State Update (useState)
    ↓
Component Re-render
    ↓
UI Update
```

## 🪝 Custom Hooks

### useProduct
**Location**: `src/hooks/useProduct.js`

**Purpose**: Manages all product-related state and operations.

**State**:
- `product` - Current product data
- `loading` - Loading state
- `error` - Error message
- `selectedSize` - Selected size
- `selectedColor` - Selected color
- `quantity` - Selected quantity
- `cartLoading` - Cart operation loading state

**Methods**:
- `updateSize(size)` - Update selected size
- `updateColor(color)` - Update selected color
- `updateQuantity(qty)` - Update quantity
- `incrementQuantity()` - Increase quantity
- `decrementQuantity()` - Decrease quantity
- `addToCart()` - Add product to cart
- `clearError()` - Clear error message

## 📦 State Management

Currently using React's built-in `useState` for local state management:
- Component-level state for UI interactions
- Props passing for parent-child communication
- Custom hooks for complex logic

**Future Enhancement**: Consider Redux or Context API for global state if the app grows.

## 🎨 Styling Architecture

### Tailwind CSS
- Utility-first CSS framework
- Mobile-first responsive design
- Custom color variables defined in `:root`
- Breakpoints: `sm`, `md`, `lg`, `xl`

### Color System
```css
--color-purple: #6A2CFF      (Primary)
--color-black: #000000       (Text)
--color-white: #FFFFFF       (Background)
--color-light-grey: #F5F5F7  (Surface)
--color-orange: #FF6A00      (Accent)
--color-red: #FF3B30         (Error)
```

### Responsive Strategy
- Base styles for mobile
- `sm:` for tablet (640px+)
- `md:` for desktop (768px+)
- `lg:` for large screens (1024px+)
- `xl:` for extra-large screens (1280px+)

## 🔐 Error Handling Strategy

### Error Boundary
- Catches unhandled errors in components
- Displays error UI with recovery option
- Logs errors for debugging

### Validation
- Form validation in components
- Input sanitization
- Prop type checking with defaults

### Fallback UI
- Loading skeleton screens
- Empty state messages
- Error messages with suggestions

## 🚀 Performance Optimizations

### React Optimizations
- `React.memo` for pure components
- `useCallback` for stable event handlers
- `useMemo` for expensive computations
- Code splitting with React.lazy (future)

### Image Optimization
- Lazy loading with `loading="lazy"`
- Error handling with placeholder images
- Responsive image sizes

### Rendering Optimization
- Avoiding unnecessary re-renders
- Using keys correctly in lists
- Proper dependency arrays in hooks

## 🔄 Data Fetching (Future)

**Current**: Mock data from `src/data/mockProduct.js`
**Target**: Real API calls

```javascript
// Future API integration pattern
const fetchProduct = async (productId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}`
    );
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};
```

## 📝 Code Organization Principles

### Single Responsibility
Each component/function has one primary purpose.

### DRY (Don't Repeat Yourself)
Reusable logic extracted to utilities and hooks.

### Clear Naming
Descriptive names for components, functions, and variables.

### Documentation
JSDoc comments on all functions and complex logic.

### Modularity
Easy to add, remove, or modify components without affecting others.

## 🧪 Testing Strategy

### Unit Tests (Planned)
- Utility functions
- Component props validation
- Hook behavior

### Integration Tests (Planned)
- Component interaction
- Data flow
- Event handling

### E2E Tests (Planned)
- User workflows
- Navigation
- Form submission

## 🔒 Security Considerations

- **Input Validation**: All user inputs validated
- **Error Messages**: Generic error messages to users
- **Image URLs**: Validated before rendering
- **XSS Prevention**: React escapes output by default
- **CSRF**: To be implemented when API is connected

## 📈 Scalability

### For Growing Features
1. Extract common patterns to components
2. Create feature-specific utility functions
3. Use React Context for related state
4. Consider state management library (Redux)

### For Growing Team
1. Follow project conventions in README and COMPONENTS docs
2. Use clear naming conventions
3. Write comprehensive comments
4. Keep documentation updated
5. Code reviews before merging

## 🔄 Build & Deployment Pipeline

### Development
```bash
npm run dev      # Start dev server
npm run lint     # Check code quality
```

### Production Build
```bash
npm run build    # Create optimized build
npm run preview  # Preview production build
```

### Build Output
- `dist/` directory
- Optimized bundle
- Ready for deployment

---

**Version**: 1.0.0
**Last Updated**: June 2026
