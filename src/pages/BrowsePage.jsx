import { products } from '../data'
import ProductCard from '../components/ProductCard'

export default function BrowsePage() {
    return (
        <div className="page-content">
            <div className="app-container">
                <div className="browse-hero">
                    <h1>Fresh Groceries, Fair Prices</h1>
                    <p>
                        Every item comes with our Fair Price Guarantee — see exactly how your
                        price is determined, powered by algorithmic transparency.
                    </p>
                    <div className="browse-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        Protected by InstaTrust Algorithmic Transparency
                    </div>
                </div>

                <div className="product-grid" id="product-grid">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}
