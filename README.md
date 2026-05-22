# SPETRO - E-Commerce Platform

A modern, futuristic e-commerce platform built with React + Vite and Tailwind CSS.

## 🎨 Design Features

- ✅ Clean, modern UI with proper typography
- ✅ Auto-sliding hero carousel (4s intervals)
- ✅ Product images from Unsplash API
- ✅ Responsive navigation with icons
- ✅ Shopping cart with badge counter
- ✅ Horizontal scrolling product sections
- ✅ Hover effects and smooth transitions
- ✅ Organized folder structure with pages

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Top navigation with search
│   │   └── Footer.jsx          # Footer with links & newsletter
│   ├── sections/
│   │   ├── HeroBanner.jsx      # Auto-sliding carousel
│   │   ├── ShopByCategory.jsx  # Category grid
│   │   ├── CuratedCollections.jsx
│   │   ├── BeautySection.jsx
│   │   └── JewellerySection.jsx
│   └── ui/
│       └── SectionDivider.jsx
├── pages/
│   └── Home/
│       └── index.jsx            # Home page composition
├── data/
│   └── index.js                 # Centralized data
├── App.jsx                      # Main app component
└── index.css                    # Global styles
```

## 🖼️ Images Used

All product images are loaded from **Unsplash** via CDN:

### Hero Banner Images:
- Fashion model in brown dress
- Men's casual wear
- Shopping bags and accessories

### Category Images:
- Dresses, Topwear, Bottomwear
- Handbags, Beauty products
- Footwear, Jewellery
- Travel bags, Home decor

### Product Collections:
- Women's ethnic wear (Sarees, Kurtas)
- Men's fashion
- Accessories (Clutch, Totes, Backpacks)
- Footwear collection

## 🎯 To Add Custom Images:

1. **Replace Unsplash URLs** in `src/data/index.js`:
   ```javascript
   image: "YOUR_IMAGE_URL_HERE"
   ```

2. **Or use local images**:
   - Add images to `public/images/products/`
   - Update paths: `image: "/images/products/your-image.jpg"`

## 🚀 Run the Project

```bash
npm install
npm run dev
```

## 🎨 Design Improvements Made:

1. **Typography**:
   - Increased font sizes for better readability
   - Added letter-spacing for headings
   - Used font weights: 400, 600, 700, 900

2. **Spacing**:
   - Consistent padding/margins (px-6, py-8)
   - Proper gap between elements (gap-4, gap-6)

3. **Colors**:
   - Primary: Rose/Pink (#e11d48)
   - Neutral: Gray scale
   - Backgrounds: White, Gray-50

4. **Components**:
   - Rounded corners (rounded-2xl, rounded-3xl)
   - Shadows for depth (shadow-md, shadow-lg)
   - Smooth transitions (duration-300, duration-500)

5. **Images**:
   - Object-cover for proper aspect ratios
   - Hover scale effects
   - Gradient overlays for text readability

## 📱 Responsive Design

- Desktop-first approach
- Horizontal scrolling for product carousels
- Sticky navigation header
- Grid layouts for categories

## 🔧 Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Lucide React (icons replaced with custom SVG)

---

Built for **SPETRO** - Your Fashion Destination 🛍️
