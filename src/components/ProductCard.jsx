import { Link } from 'react-router-dom'

export default function ProductCard({ product, index }) {
    return (
        <Link
            to={`/instatrust/product/${product.id}`}
            className="product-card"
            style={{ animationDelay: `${index * 0.06}s` }}
            id={`product-card-${product.id}`}
        >
            <img
                src={product.image}
                alt={product.name}
                className="product-card-image"
                loading="lazy"
            />
            <div className="product-card-body">
                <div className="product-card-category">{product.category}</div>
                <div className="product-card-name">{product.name}</div>
                <div className="product-card-brand">{product.brand}</div>
                <div className="product-card-footer">
                    <div className="product-card-price">
                        ${product.price.toFixed(2)}
                        <span className="product-card-unit"> / {product.unit}</span>
                    </div>
                    <div className="product-card-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 16.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 1z" /></svg>
                        Fair Price
                    </div>
                </div>
            </div>
        </Link>
    )
}
