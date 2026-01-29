import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-24 text-[var(--text-muted)]">
                <p className="text-sm tracking-widest uppercase">No products found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-16">
            {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
    );
}
