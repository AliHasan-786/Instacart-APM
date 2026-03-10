import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { products, priceHistories } from '../data'
import TransparencyModal from '../components/TransparencyModal'

export default function ProductPage() {
    const { id } = useParams()
    const product = products.find((p) => p.id === Number(id))
    const [showModal, setShowModal] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)

    if (!product) {
        return (
            <div className="page-content">
                <div className="app-container" style={{ textAlign: 'center', paddingTop: 120 }}>
                    <h2>Product not found</h2>
                    <Link to="/instatrust" style={{ marginTop: 16, display: 'inline-block' }}>← Back to browse</Link>
                </div>
            </div>
        )
    }

    const handleAddToCart = () => {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    return (
        <div className="page-content">
            <div className="app-container">
                <div className="product-detail">
                    {/* Image */}
                    <div className="product-detail-image-wrap">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-detail-image"
                        />
                    </div>

                    {/* Info */}
                    <div className="product-detail-info">
                        <div className="product-detail-breadcrumb">
                            <Link to="/instatrust">Browse</Link>
                            <span>›</span>
                            <span>{product.category}</span>
                            <span>›</span>
                            <span>{product.name}</span>
                        </div>

                        <div className="product-detail-category">{product.category}</div>
                        <h1 className="product-detail-name">{product.name}</h1>
                        <div className="product-detail-brand">by {product.brand}</div>

                        <div className="product-detail-price-row">
                            <span className="product-detail-price">${product.price.toFixed(2)}</span>
                            <span className="product-detail-unit">/ {product.unit}</span>
                        </div>

                        {/* Fair Price Badge */}
                        <div
                            className="fair-price-badge"
                            onClick={() => setShowModal(true)}
                            id="fair-price-badge"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setShowModal(true)}
                        >
                            <span className="fair-price-badge-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            </span>
                            <span className="fair-price-badge-text">Fair Price Guarantee</span>
                            <span className="fair-price-badge-arrow">→ See how this price was determined</span>
                        </div>

                        {/* Add to Cart */}
                        <button
                            className="product-detail-add-btn"
                            onClick={handleAddToCart}
                            id="add-to-cart-btn"
                        >
                            {addedToCart ? <span style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}><Check size={18} /> Added to Cart</span> : 'Add to Cart'}
                        </button>

                        {/* Meta */}
                        <div className="product-detail-meta">
                            <div className="product-detail-meta-item">
                                <span className="product-detail-meta-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                                </span>
                                Delivery in 30 min
                            </div>
                            <div className="product-detail-meta-item">
                                <span className="product-detail-meta-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
                                </span>
                                Free returns
                            </div>
                            <div className="product-detail-meta-item">
                                <span className="product-detail-meta-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                </span>
                                Price locked at checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transparency Modal */}
            {showModal && (
                <TransparencyModal
                    product={product}
                    priceHistory={priceHistories[product.id]}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}
