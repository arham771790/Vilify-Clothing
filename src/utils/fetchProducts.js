import { formatCurrency } from "../utils/format";

export function getAllProducts() {
  const products = require('../data/products.json');
  return products;
}

export function getProductBySlug(slug) {
  const products = getAllProducts();
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category) {
  const products = getAllProducts();
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedProducts(category, currentId) {
    const products = getAllProducts();
    return products
        .filter(p => p.category === category && p.id !== currentId)
        .slice(0, 4);
}

export function searchProducts(query) {
    const products = getAllProducts();
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery)
    );
}

export { formatCurrency };
