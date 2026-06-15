// Catalog endpoints — mirrors the SPRETRO Backend API.
//
//   GET /catalog                       ?skip&limit&category_id&min_price&max_price
//   GET /catalog/{product_id}
//   GET /catalog/category/{category_id} ?skip&limit
//
// The backend ProductResponse looks like:
//   { id, brand_id, category_id, name, slug, mrp, sale_price,
//     discount_percentage, status, is_active, created_at }
import { apiFetch } from "./client";

export const catalogApi = {
  listProducts({ skip = 0, limit = 20, categoryId, minPrice, maxPrice } = {}) {
    return apiFetch("/catalog", {
      query: {
        skip,
        limit,
        category_id: categoryId,
        min_price: minPrice,
        max_price: maxPrice,
      },
    });
  },

  getProduct(productId) {
    return apiFetch(`/catalog/${encodeURIComponent(productId)}`);
  },

  listByCategory(categoryId, { skip = 0, limit = 20 } = {}) {
    return apiFetch(`/catalog/category/${encodeURIComponent(categoryId)}`, {
      query: { skip, limit },
    });
  },
};

// Normalises a backend ProductResponse into the shape the product cards use,
// so the same components can render either backend or bundled data.
export function normalizeProduct(p) {
  return {
    id: String(p.id),
    title: p.name,
    brand: p.brand_id || "SPRETRO",
    price: p.sale_price ?? p.mrp ?? 0,
    mrp: p.mrp ?? p.sale_price ?? 0,
    discountPercentage: p.discount_percentage ?? 0,
    category: p.category_id,
    slug: p.slug,
    thumbnail: p.thumbnail || p.image || "",
    status: p.status,
  };
}
