import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'
import {
    orders, STORE_LOCATION, computeBatches, computeMetrics,
    getOrderType, getOrderColor,
} from '../equibatchData'
import 'leaflet/dist/leaflet.css'

// Custom marker icons using divIcon
function createIcon(color, label) {
    return L.divIcon({
        className: '',
        html: `<div style="
      width:28px;height:28px;border-radius:50%;
      background:${color};border:2px solid rgba(255,255,255,0.8);
      display:flex;align-items:center;justify-content:center;
      font-size:11px;font-weight:700;color:#fff;
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
    ">${label}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
    })
}

const storeIcon = L.divIcon({
    className: '',
    html: `<div style="
    width:36px;height:36px;border-radius:8px;
    background:linear-gradient(135deg,#0aaf54,#43d88a);
    border:2px solid #fff;display:flex;align-items:center;
    justify-content:center;font-size:18px;
    box-shadow:0 2px 12px rgba(10,175,84,0.5);
  ">🏪</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
})

function AlgorithmModal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 620 }}>
                <div className="modal-header">
                    <h2><span className="modal-header-icon">🧮</span> Algorithm Logic — MDP Reward Function</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <div style={{
                        padding: '24px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)', marginBottom: 20, textAlign: 'center',
                    }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--ic-green-300)', marginBottom: 12 }}>
                            Reward Function
                        </div>
                        <div style={{ fontSize: '1.3rem', fontFamily: 'monospace', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                            R<sub>t</sub> = α · TipEquity + β · RouteEfficiency − γ · HighTipperWaitTime
                        </div>
                    </div>

                    <div className="factor-grid">
                        <div className="factor-card">
                            <div className="factor-card-label">α — Tip Equity Weight</div>
                            <div className="factor-card-value positive">Shopper Earnings</div>
                            <div className="factor-card-desc">Higher α prioritizes batches where shoppers earn fair hourly wages through tip distribution</div>
                        </div>
                        <div className="factor-card">
                            <div className="factor-card-label">β — Route Efficiency Weight</div>
                            <div className="factor-card-value positive">Mileage Optimization</div>
                            <div className="factor-card-desc">Higher β minimizes total delivery distance by grouping geographically proximate orders</div>
                        </div>
                        <div className="factor-card" style={{ gridColumn: 'span 2' }}>
                            <div className="factor-card-label">γ — High-Tipper SLA Priority</div>
                            <div className="factor-card-value" style={{ color: 'var(--amber-400)' }}>Wait Time Penalty</div>
                            <div className="factor-card-desc">Higher γ reduces batch sizes for high-value customers, ensuring premium delivery SLAs at the cost of overall batch throughput</div>
                        </div>
                    </div>

                    <div className="modal-compliance" style={{ marginTop: 8 }}>
                        <p>
                            This simulated Markov Decision Process uses a greedy batching heuristic with haversine
                            distance calculations. In production, this would be replaced by a deep Q-network (DQN)
                            trained on historical shopper acceptance rates, customer satisfaction scores, and
                            delivery time data across geographic zones.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function EquiBatchPage() {
    const [weights, setWeights] = useState({ alpha: 0.5, beta: 0.5, gamma: 0.3 })
    const [showAlgoModal, setShowAlgoModal] = useState(false)

    const batches = useMemo(() => computeBatches(orders, weights), [weights])
    const metrics = useMemo(() => computeMetrics(batches), [batches])

    const handleWeight = (key, val) => {
        setWeights((prev) => ({ ...prev, [key]: parseFloat(val) }))
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Header */}
            <div style={{
                height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 24px', borderBottom: '1px solid var(--border-subtle)',
                background: 'rgba(10,14,20,0.9)', backdropFilter: 'blur(12px)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>← Portfolio</Link>
                    <div style={{ width: 1, height: 20, background: 'var(--border-subtle)' }} />
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>
                        ⚡ Equi<span style={{ color: 'var(--blue-400)' }}>Batch</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowAlgoModal(true)}
                    style={{
                        padding: '6px 14px', borderRadius: 'var(--radius-full)',
                        background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                        color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500,
                    }}
                    id="algo-modal-btn"
                >
                    🧮 View Algorithm Logic
                </button>
            </div>

            {/* Main Layout */}
            <div style={{ display: 'flex', height: 'calc(100vh - 56px)' }}>
                {/* Map */}
                <div style={{ flex: 1, position: 'relative' }}>
                    <MapContainer
                        center={[STORE_LOCATION.lat, STORE_LOCATION.lng]}
                        zoom={13}
                        style={{ width: '100%', height: '100%' }}
                        zoomControl={false}
                    >
                        <TileLayer
                            attribution="&copy; OpenStreetMap, &copy; CartoDB"
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                        {/* Store */}
                        <Marker position={[STORE_LOCATION.lat, STORE_LOCATION.lng]} icon={storeIcon}>
                            <Popup><strong>{STORE_LOCATION.name}</strong><br />Dispatch Center</Popup>
                        </Marker>

                        {/* Orders */}
                        {orders.map((o) => (
                            <Marker
                                key={o.id}
                                position={[o.lat, o.lng]}
                                icon={createIcon(getOrderColor(o), o.id)}
                            >
                                <Popup>
                                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
                                        <strong>{o.customer}</strong><br />
                                        Tip: ${o.tip} · {o.items} items · {o.distance} mi<br />
                                        {o.perishable && <span style={{ color: '#f87171' }}>❄️ Perishable</span>}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                        {/* Batch Routes */}
                        {batches.map((batch) => {
                            const positions = [
                                [STORE_LOCATION.lat, STORE_LOCATION.lng],
                                ...batch.orders.map((o) => [o.lat, o.lng]),
                            ]
                            return (
                                <Polyline
                                    key={batch.id}
                                    positions={positions}
                                    pathOptions={{
                                        color: batch.color,
                                        weight: 2.5,
                                        opacity: 0.7,
                                        dashArray: '6 4',
                                    }}
                                />
                            )
                        })}
                    </MapContainer>

                    {/* Legend */}
                    <div style={{
                        position: 'absolute', bottom: 20, left: 20, zIndex: 1000,
                        background: 'rgba(10,14,20,0.9)', backdropFilter: 'blur(12px)',
                        border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)',
                        padding: '12px 16px', display: 'flex', gap: 16, fontSize: '0.75rem',
                    }}>
                        {[
                            { color: '#43d88a', label: 'High Tip (≥$15)' },
                            { color: '#fbbf24', label: 'Medium Tip' },
                            { color: '#f87171', label: 'No Tip ($0)' },
                        ].map((l) => (
                            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
                                <span style={{ color: 'var(--text-secondary)' }}>{l.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Control Panel */}
                <div style={{
                    width: 380, overflowY: 'auto', borderLeft: '1px solid var(--border-subtle)',
                    padding: 24, display: 'flex', flexDirection: 'column', gap: 20,
                }}>
                    {/* Title */}
                    <div>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Optimization Weights</h2>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            Adjust weights to see how batching changes in real-time
                        </p>
                    </div>

                    {/* Sliders */}
                    {[
                        { key: 'alpha', label: 'α — Shopper Hourly Earnings', color: '#43d88a', icon: '💰' },
                        { key: 'beta', label: 'β — Routing Efficiency (Mileage)', color: '#60a5fa', icon: '🗺️' },
                        { key: 'gamma', label: 'γ — High-Tipper SLA Priority', color: '#fbbf24', icon: '⏱️' },
                    ].map((s) => (
                        <div key={s.key} style={{
                            padding: 16, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{s.icon} {s.label}</span>
                                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: s.color }}>
                                    {weights[s.key].toFixed(2)}
                                </span>
                            </div>
                            <input
                                type="range" min="0" max="1" step="0.05"
                                value={weights[s.key]}
                                onChange={(e) => handleWeight(s.key, e.target.value)}
                                id={`slider-${s.key}`}
                                style={{
                                    width: '100%', height: 6, accentColor: s.color,
                                    background: 'var(--neutral-700)', borderRadius: 3,
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                <span>0.00</span><span>1.00</span>
                            </div>
                        </div>
                    ))}

                    {/* Metrics */}
                    <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>📊 Simulated Impact Metrics</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <MetricBar label="Shopper Satisfaction" value={metrics.shopperSat} color="#43d88a" icon="😊" />
                            <MetricBar label="High-Value Churn Risk" value={metrics.churnRisk} color="#f87171" icon="⚠️" inverted />
                            <MetricBar label="Delivery Efficiency" value={metrics.efficiency} color="#60a5fa" icon="🚚" />
                        </div>
                    </div>

                    {/* Batch Results */}
                    <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>📦 Batch Assignments ({batches.length} batches)</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {batches.map((batch) => (
                                <div key={batch.id} style={{
                                    padding: '12px 14px', background: 'var(--bg-glass)',
                                    border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
                                    borderLeft: `3px solid ${batch.color}`,
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Batch {batch.id}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{batch.orders.length} orders</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
                                        {batch.orders.map((o) => (
                                            <span key={o.id} style={{
                                                padding: '2px 8px', borderRadius: 'var(--radius-full)',
                                                background: `${getOrderColor(o)}20`, color: getOrderColor(o),
                                                fontSize: '0.7rem', fontWeight: 600,
                                            }}>
                                                #{o.id} {o.customer.split(' ')[0]}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: 12 }}>
                                        <span>💰 ${batch.totalTip}</span>
                                        <span>📏 {batch.totalDistance.toFixed(1)} mi</span>
                                        <span>📦 {batch.totalItems} items</span>
                                        {batch.hasPerishable && <span>❄️</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showAlgoModal && <AlgorithmModal onClose={() => setShowAlgoModal(false)} />}
        </div>
    )
}

function MetricBar({ label, value, color, icon, inverted }) {
    return (
        <div style={{
            padding: '12px 14px', background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{icon} {label}</span>
                <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem',
                    color: inverted ? (value > 50 ? '#f87171' : '#43d88a') : color,
                }}>
                    {value}%
                </span>
            </div>
            <div style={{ width: '100%', height: 5, background: 'var(--neutral-700)', borderRadius: 3 }}>
                <div style={{
                    width: `${value}%`, height: '100%', borderRadius: 3,
                    background: inverted ? (value > 50 ? '#f87171' : '#43d88a') : color,
                    transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                }} />
            </div>
        </div>
    )
}
