import { useState } from 'react'
import { defaultPreferences } from '../data'
import { ReceiptText, MapPin, Eye, ShoppingBasket, DollarSign, Database, Download, Trash2, FileText, Scale } from 'lucide-react'

export default function SettingsPage() {
    const [enabled, setEnabled] = useState(defaultPreferences.algorithmicPricingEnabled)
    const savings = defaultPreferences.estimatedMonthlySavings
    const dataCategories = defaultPreferences.dataCategories

    const dataCategoryIcons = [<ReceiptText size={18} />, <MapPin size={18} />, <Eye size={18} />, <ShoppingBasket size={18} />]

    return (
        <div className="page-content">
            <div className="app-container">
                <div className="settings-page">
                    <h1>Privacy & Personalization</h1>
                    <p className="settings-page-sub">
                        Control how Instacart uses your data for pricing and personalization.
                        Full transparency, full control.
                    </p>

                    {/* Section 1: Algorithmic Pricing Toggle */}
                    <div className="settings-section">
                        <div className="settings-section-header">
                            <div className="settings-section-icon green"><DollarSign size={16} strokeWidth={2.5} /></div>
                            <h2>Algorithmic Pricing & Personalization</h2>
                        </div>

                        <div className="settings-card">
                            <div className="toggle-row">
                                <div className="toggle-info">
                                    <h3>Enable Personalized Pricing</h3>
                                    <p>
                                        Allow Instacart to use your shopping data to offer personalized
                                        deals and optimized pricing. You can opt out at any time.
                                    </p>
                                </div>
                                <label className="toggle-switch" id="pricing-toggle">
                                    <input
                                        type="checkbox"
                                        checked={enabled}
                                        onChange={() => setEnabled(!enabled)}
                                    />
                                    <span className="toggle-slider" />
                                </label>
                            </div>

                            {/* State-dependent panel */}
                            {enabled ? (
                                <div className="toggle-state-panel on">
                                    <h4>Personalized Pricing Active</h4>
                                    <ul>
                                        <li>
                                            <span className="icon">•</span>
                                            Access to hyper-personalized flash discounts
                                        </li>
                                        <li>
                                            <span className="icon">•</span>
                                            Algorithmically optimized basket pricing
                                        </li>
                                        <li>
                                            <span className="icon">•</span>
                                            Price-drop alerts for your favorite items
                                        </li>
                                        <li>
                                            <span className="icon">•</span>
                                            Your data usage is fully transparent (see below)
                                        </li>
                                    </ul>
                                    <div className="savings-highlight">
                                        Estimated average monthly savings: ${savings.toFixed(2)}
                                    </div>
                                </div>
                            ) : (
                                <div className="toggle-state-panel off">
                                    <h4>Standard Pricing Mode</h4>
                                    <ul>
                                        <li>
                                            <span className="icon">•</span>
                                            You'll receive standard, unoptimized in-store prices
                                        </li>
                                        <li>
                                            <span className="icon">•</span>
                                            No access to personalized flash discounts
                                        </li>
                                        <li>
                                            <span className="icon">•</span>
                                            Your browsing and purchase data will not be used for pricing
                                        </li>
                                        <li>
                                            <span className="icon">•</span>
                                            You can re-enable personalization at any time
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 2: Data Transparency */}
                    <div className="settings-section">
                        <div className="settings-section-header">
                            <div className="settings-section-icon blue">
                                <Database size={16} strokeWidth={2.5} />
                            </div>
                            <h2>Data Transparency</h2>
                        </div>

                        <div className="settings-card">
                            <div className="data-category-list">
                                {dataCategories.map((cat, i) => (
                                    <div className="data-category-item" key={i}>
                                        <div className="data-category-icon">
                                            {dataCategoryIcons[i]}
                                        </div>
                                        <div>
                                            <div className="data-category-name">{cat.name}</div>
                                            <div className="data-category-desc">{cat.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Your Rights */}
                    <div className="settings-section">
                        <div className="settings-section-header">
                            <div className="settings-section-icon amber">
                                <Scale size={16} strokeWidth={2.5} />
                            </div>
                            <h2>Your Rights</h2>
                        </div>

                        <div className="settings-card">
                            <div className="rights-list">
                                <div className="rights-item" id="download-data-btn">
                                    <div className="rights-item-left">
                                        <span className="rights-item-icon">
                                            <Download size={16} />
                                        </span>
                                        <span className="rights-item-text">Download My Data</span>
                                    </div>
                                    <span className="rights-item-arrow">→</span>
                                </div>
                                <div className="rights-item" id="delete-data-btn">
                                    <div className="rights-item-left">
                                        <span className="rights-item-icon">
                                            <Trash2 size={16} />
                                        </span>
                                        <span className="rights-item-text">Request Data Deletion</span>
                                    </div>
                                    <span className="rights-item-arrow">→</span>
                                </div>
                                <div className="rights-item">
                                    <div className="rights-item-left">
                                        <span className="rights-item-icon">
                                            <FileText size={16} />
                                        </span>
                                        <span className="rights-item-text">View Algorithmic Impact Assessment</span>
                                    </div>
                                    <span className="rights-item-arrow">→</span>
                                </div>
                                <div className="rights-item">
                                    <div className="rights-item-left">
                                        <span className="rights-item-icon">
                                            <Scale size={16} />
                                        </span>
                                        <span className="rights-item-text">NY Pricing Disclosure Act — Your Rights</span>
                                    </div>
                                    <span className="rights-item-arrow">→</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
