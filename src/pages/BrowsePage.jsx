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
                        🛡️ Protected by InstaTrust Algorithmic Transparency
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
