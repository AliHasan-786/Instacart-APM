import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    background: '#FFFFFF',
                    border: '1px solid #E8E8E8',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
            >
                <p style={{ fontSize: '0.75rem', color: '#8A919A', marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#009B3A' }}>
                    ${payload[0].value.toFixed(2)}
                </p>
                {payload[1] && (
                    <p style={{ fontSize: '0.75rem', color: '#8A919A', marginTop: 2 }}>
                        Median: ${payload[1].value.toFixed(2)}
                    </p>
                )}
            </div>
        )
    }
    return null
}

export default function TransparencyModal({ product, priceHistory, onClose }) {
    const factors = product.algorithmicFactors
    const currentPrice = product.price
    const medianPrice = factors.regionalMedian

    const priceDiff = currentPrice - medianPrice
    const priceDiffPercent = ((priceDiff / medianPrice) * 100).toFixed(1)
    const isBelow = priceDiff <= 0

    return (
        <div className="modal-overlay" onClick={onClose} id="transparency-modal">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <h2>
                        <span className="modal-header-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </span>
                        How Your Price Was Determined
                    </h2>
                    <button className="modal-close" onClick={onClose} id="modal-close-btn">✕</button>
                </div>
                <p className="modal-subtitle">
                    Transparent breakdown for <strong>{product.name}</strong> ({product.unit})
                </p>

                <div className="modal-body">
                    {/* Price Summary */}
                    <div className="price-summary">
                        <div>
                            <div className="price-summary-label">Your current price vs. regional median</div>
                        </div>
                        <div className="price-summary-value">
                            {isBelow ? '↓' : '↑'} {Math.abs(priceDiffPercent)}% {isBelow ? 'below' : 'above'} median
                        </div>
                    </div>

                    {/* Factor Breakdown */}
                    <div className="factor-grid">
                        <div className="factor-card">
                            <div className="factor-card-label">Base Wholesale Cost</div>
                            <div className="factor-card-value neutral">${factors.baseCost.toFixed(2)}</div>
                            <div className="factor-card-desc">Supplier cost for this item in your region</div>
                        </div>
                        <div className="factor-card">
                            <div className="factor-card-label">Demand Multiplier</div>
                            <div className="factor-card-value neutral">×{factors.demandMultiplier.toFixed(2)}</div>
                            <div className="factor-card-desc">Based on local purchase volume this week</div>
                        </div>
                        <div className="factor-card">
                            <div className="factor-card-label">Regional Median Price</div>
                            <div className="factor-card-value positive">${factors.regionalMedian.toFixed(2)}</div>
                            <div className="factor-card-desc">Average across stores within 10 mi radius</div>
                        </div>
                        <div className="factor-card">
                            <div className="factor-card-label">Delivery Logistics</div>
                            <div className="factor-card-value negative">+${factors.deliverySurcharge.toFixed(2)}</div>
                            <div className="factor-card-desc">Refrigeration and last-mile delivery cost</div>
                        </div>
                        {factors.currentPromotion !== 0 && (
                            <div className="factor-card" style={{ gridColumn: 'span 2' }}>
                                <div className="factor-card-label">Active Promotion</div>
                                <div className="factor-card-value positive">
                                    −${Math.abs(factors.currentPromotion).toFixed(2)}
                                </div>
                                <div className="factor-card-desc">Personalized discount applied to your basket</div>
                            </div>
                        )}
                    </div>

                    {/* 30-Day Price History */}
                    <div className="chart-section">
                        <h3>30-Day Price History</h3>
                        <p className="chart-section-sub">
                            Your local region (10-mile radius) · Updated daily
                        </p>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={220}>
                                <AreaChart data={priceHistory} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#009B3A" stopOpacity={0.15} />
                                            <stop offset="100%" stopColor="#009B3A" stopOpacity={0.01} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 11, fill: '#8A919A' }}
                                        tickLine={false}
                                        axisLine={{ stroke: 'rgba(0,0,0,0.08)' }}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis
                                        tick={{ fontSize: 11, fill: '#8A919A' }}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(v) => `$${v.toFixed(2)}`}
                                        domain={['auto', 'auto']}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <ReferenceLine
                                        y={medianPrice}
                                        stroke="#2563EB"
                                        strokeDasharray="6 4"
                                        strokeWidth={1.5}
                                        label={{
                                            value: `Median $${medianPrice.toFixed(2)}`,
                                            position: 'insideTopRight',
                                            fill: '#2563EB',
                                            fontSize: 11,
                                        }}
                                    />
                                    <ReferenceLine
                                        y={currentPrice}
                                        stroke="#009B3A"
                                        strokeDasharray="3 3"
                                        strokeWidth={1}
                                        label={{
                                            value: `You pay $${currentPrice.toFixed(2)}`,
                                            position: 'insideBottomRight',
                                            fill: '#009B3A',
                                            fontSize: 11,
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#009B3A"
                                        strokeWidth={2}
                                        fill="url(#priceGradient)"
                                        dot={false}
                                        activeDot={{
                                            r: 5,
                                            fill: '#009B3A',
                                            stroke: '#FFFFFF',
                                            strokeWidth: 2,
                                        }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Compliance Footer */}
                    <div className="modal-compliance">
                        <p>
                            This disclosure is provided in compliance with the{' '}
                            <a href="#ny-algo-act">
                                New York Algorithmic Pricing Disclosure Act (2025)
                            </a>
                            . All prices shown reflect real-time algorithmic calculations applied uniformly.
                            Instacart does not use protected characteristics (race, gender, religion) in
                            pricing algorithms. For questions, contact{' '}
                            <a href="#transparency">transparency@instacart.com</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
