import { useState } from 'react'
import { defaultPreferences } from '../data'

export default function SettingsPage() {
    const [enabled, setEnabled] = useState(defaultPreferences.algorithmicPricingEnabled)
    const savings = defaultPreferences.estimatedMonthlySavings
    const dataCategories = defaultPreferences.dataCategories

    const dataCategoryIcons = ['P', 'L', 'B', 'C']

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
                            <div className="settings-section-icon green">$</div>
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
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
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
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                            </div>
                            <h2>Your Rights</h2>
                        </div>

                        <div className="settings-card">
                            <div className="rights-list">
                                <div className="rights-item" id="download-data-btn">
                                    <div className="rights-item-left">
                                        <span className="rights-item-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                        </span>
                                        <span className="rights-item-text">Download My Data</span>
                                    </div>
                                    <span className="rights-item-arrow">→</span>
                                </div>
                                <div className="rights-item" id="delete-data-btn">
                                    <div className="rights-item-left">
                                        <span className="rights-item-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                        </span>
                                        <span className="rights-item-text">Request Data Deletion</span>
                                    </div>
                                    <span className="rights-item-arrow">→</span>
                                </div>
                                <div className="rights-item">
                                    <div className="rights-item-left">
                                        <span className="rights-item-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                                        </span>
                                        <span className="rights-item-text">View Algorithmic Impact Assessment</span>
                                    </div>
                                    <span className="rights-item-arrow">→</span>
                                </div>
                                <div className="rights-item">
                                    <div className="rights-item-left">
                                        <span className="rights-item-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
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
