import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { dietaryProfiles, groceryItems, checkViolation, getAlternative, flagLabels, aisleMap, computeHealthScore } from '../caperData'

function StoreMap({ highlightAisle, scannedAisles }) {
    return (
        <svg viewBox="0 0 100 100" style={{ width: '100%', borderRadius: 'var(--radius-md)', background: 'rgba(10,14,20,0.8)' }}>
            {/* Store outline */}
            <rect x="2" y="2" width="96" height="96" rx="4" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
            <text x="50" y="9" textAnchor="middle" fill="var(--text-muted)" fontSize="3" fontWeight="600">STORE ENTRANCE</text>

            {/* Aisles */}
            {aisleMap.map((a) => {
                const isHighlight = highlightAisle === a.num
                const isScanned = scannedAisles.has(a.num)
                return (
                    <g key={a.num}>
                        <rect
                            x={a.x} y={a.y} width={a.w} height={a.h}
                            rx="1.5"
                            fill={isHighlight ? 'rgba(67,216,138,0.2)' : isScanned ? 'rgba(96,165,250,0.08)' : 'rgba(255,255,255,0.03)'}
                            stroke={isHighlight ? '#43d88a' : isScanned ? 'rgba(96,165,250,0.3)' : 'var(--border-subtle)'}
                            strokeWidth={isHighlight ? '0.8' : '0.4'}
                            style={{ transition: 'all 0.4s ease' }}
                        />
                        <text
                            x={a.x + a.w / 2} y={a.y + a.h / 2 - 2}
                            textAnchor="middle" fill={isHighlight ? '#43d88a' : 'var(--text-secondary)'}
                            fontSize="2.8" fontWeight="600"
                        >{a.num}</text>
                        <text
                            x={a.x + a.w / 2} y={a.y + a.h / 2 + 2}
                            textAnchor="middle" fill={isHighlight ? '#43d88a' : 'var(--text-muted)'}
                            fontSize="2" fontWeight="400"
                        >{a.label}</text>

                        {/* Pulsing indicator on highlighted aisle */}
                        {isHighlight && (
                            <circle
                                cx={a.x + a.w / 2} cy={a.y + a.h / 2 + 6}
                                r="1.5" fill="#43d88a"
                                style={{ animation: 'pulse-glow 1.5s infinite' }}
                            />
                        )}
                    </g>
                )
            })}

            {/* You Are Here marker */}
            <circle cx="6" cy="8" r="2" fill="#60a5fa" opacity="0.8" />
            <text x="10" y="9" fill="#60a5fa" fontSize="2.2" fontWeight="500">You</text>
        </svg>
    )
}

function HowItWorksModal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
                <div className="modal-header">
                    <h2><span className="modal-header-icon">🧠</span> How Caper Context Works</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <div style={{
                        display: 'flex', flexDirection: 'column', gap: 16,
                    }}>
                        {/* Step 1 */}
                        <div style={{
                            padding: 16, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)', borderLeft: '3px solid #60a5fa',
                        }}>
                            <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600, marginBottom: 4 }}>
                                Step 1 — Dietary Profile Ingestion
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                The Caper Cart loads the shopper's dietary profile from their Instacart account. This profile can be synced from the app's AI Health Tags (30+ nutritional categories in partnership with the American Diabetes Association).
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div style={{
                            padding: 16, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)', borderLeft: '3px solid #fbbf24',
                        }}>
                            <div style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600, marginBottom: 4 }}>
                                Step 2 — Real-Time Scan & AI Guardrail
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                When an item is scanned (placed in the Caper Cart), an agentic AI guardrail cross-references the product's nutritional flags against the shopper's restrictions. This mirrors the AI Red Teaming methodology used in clinical AI jailbreak mitigation — proactively blocking harmful inputs.
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div style={{
                            padding: 16, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)', borderLeft: '3px solid #43d88a',
                        }}>
                            <div style={{ fontSize: '0.8rem', color: '#43d88a', fontWeight: 600, marginBottom: 4 }}>
                                Step 3 — RAG Retrieval & Alternative Suggestion
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                A simulated Retrieval-Augmented Generation (RAG) pipeline queries the store's product catalog for compliant alternatives. Results are ranked by nutritional fit, proximity (same aisle preferred), and ADA certification status.
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div style={{
                            padding: 16, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)', borderLeft: '3px solid #a78bfa',
                        }}>
                            <div style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600, marginBottom: 4 }}>
                                Step 4 — Retail Media Monetization
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                Accepting an alternative unlocks a targeted coupon via Instacart's <strong>Carrot Ads API</strong>. This creates a win-win: shoppers get healthier options at a discount, and CPG advertisers drive trial of better-for-you products — merging health tech with the retail media network.
                            </div>
                        </div>
                    </div>

                    <div className="modal-compliance" style={{ marginTop: 16 }}>
                        <p>
                            This prototype demonstrates the convergence of Instacart's three biggest 2026 growth engines:
                            <strong> Caper Carts & Connected Stores</strong>, <strong>Retail Media & Data Hub</strong>,
                            and <strong>AI Health Tags</strong>. The agentic guardrail architecture draws directly from
                            Progressive Personalization (House IQ) and Diabetes AI Red Team research.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NutritionCard({ label, item, bad, good }) {
    return (
        <div style={{
            padding: 12, borderRadius: 'var(--radius-md)',
            background: bad ? 'rgba(248,113,113,0.04)' : 'rgba(67,216,138,0.04)',
            border: `1px solid ${bad ? 'rgba(248,113,113,0.12)' : 'rgba(67,216,138,0.12)'}`,
        }}>
            <div style={{ fontSize: '0.7rem', color: bad ? '#f87171' : '#43d88a', fontWeight: 600, marginBottom: 6 }}>
                {label}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>{item.name}</div>
            {Object.entries(item.nutrition).map(([k, v]) => (
                <div key={k} style={{
                    display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem',
                    color: 'var(--text-secondary)', padding: '2px 0',
                }}>
                    <span style={{ textTransform: 'capitalize' }}>{k}</span>
                    <span>{v}</span>
                </div>
            ))}
        </div>
    )
}

export default function CaperContextPage() {
    const [profile, setProfile] = useState(dietaryProfiles[0])
    const [scannedItems, setScannedItems] = useState([])
    const [alertItem, setAlertItem] = useState(null)
    const [couponUnlocked, setCouponUnlocked] = useState({})
    const [showHowItWorks, setShowHowItWorks] = useState(false)

    const healthScore = useMemo(() => computeHealthScore(scannedItems, profile), [scannedItems, profile])
    const scannedAisles = useMemo(() => new Set(scannedItems.map((i) => i.aisleNum)), [scannedItems])
    const highlightAisle = alertItem?.alternative?.aisleNum || null

    const handleScan = (item) => {
        if (scannedItems.find((s) => s.id === item.id)) return
        const violations = checkViolation(item, profile)
        setScannedItems((prev) => [...prev, { ...item, violations }])
        if (violations) setAlertItem({ item, violations, alternative: getAlternative(item) })
    }

    const handleAcceptAlt = (altItem) => {
        setCouponUnlocked((prev) => ({ ...prev, [altItem.id]: true }))
        // Also add the alternative to the scanned items
        if (!scannedItems.find((s) => s.id === altItem.id)) {
            setScannedItems((prev) => [...prev, { ...altItem, violations: null }])
        }
        setAlertItem(null)
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Tablet Header */}
            <div style={{
                height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 24px', borderBottom: '1px solid var(--border-subtle)',
                background: 'rgba(10,14,20,0.9)', backdropFilter: 'blur(12px)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>← Portfolio</Link>
                    <div style={{ width: 1, height: 20, background: 'var(--border-subtle)' }} />
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>
                        🛒 Caper<span style={{ color: '#fbbf24' }}>Context</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                        onClick={() => setShowHowItWorks(true)}
                        style={{
                            padding: '6px 14px', borderRadius: 'var(--radius-full)',
                            background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                            color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500,
                        }}
                        id="how-it-works-btn"
                    >
                        🧠 How It Works
                    </button>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Caper Cart™ Simulator</div>
                </div>
            </div>

            {/* Profile Selector */}
            <div style={{
                padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)',
                display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
            }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: 8 }}>Dietary Profile:</span>
                {dietaryProfiles.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => { setProfile(p); setScannedItems([]); setAlertItem(null); setCouponUnlocked({}) }}
                        id={`profile-${p.id}`}
                        style={{
                            padding: '8px 16px', borderRadius: 'var(--radius-full)',
                            background: profile.id === p.id ? `${p.color}20` : 'var(--bg-glass)',
                            border: `1px solid ${profile.id === p.id ? p.color : 'var(--border-subtle)'}`,
                            color: profile.id === p.id ? p.color : 'var(--text-secondary)',
                            fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {p.icon} {p.name}
                    </button>
                ))}
            </div>

            {/* Main Layout */}
            <div style={{ display: 'flex', maxWidth: 1400, margin: '0 auto', padding: 24, gap: 24 }}>
                {/* Left: Scan Items */}
                <div style={{ flex: '1 1 35%', minWidth: 0 }}>
                    <h2 style={{ fontSize: '1.15rem', marginBottom: 4 }}>Scan Items</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                        Tap items to simulate scanning them with your Caper Cart
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {groceryItems.map((item) => {
                            const isScanned = scannedItems.find((s) => s.id === item.id)
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => handleScan(item)}
                                    id={`scan-item-${item.id}`}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 14,
                                        padding: '12px 16px', borderRadius: 'var(--radius-md)',
                                        background: isScanned ? 'rgba(255,255,255,0.03)' : 'var(--bg-glass)',
                                        border: `1px solid ${isScanned && isScanned.violations ? 'rgba(248,113,113,0.3)' : 'var(--border-subtle)'}`,
                                        cursor: isScanned ? 'default' : 'pointer',
                                        opacity: isScanned ? 0.6 : 1,
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <img
                                        src={item.image} alt={item.name}
                                        style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                            {item.brand} · {item.aisle} · ${item.price.toFixed(2)}
                                        </div>
                                    </div>
                                    {isScanned ? (
                                        isScanned.violations ? (
                                            <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 600 }}>⚠️ Flagged</span>
                                        ) : (
                                            <span style={{ fontSize: '0.75rem', color: '#43d88a', fontWeight: 600 }}>✅ OK</span>
                                        )
                                    ) : (
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tap to Scan</span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Center: AI Guardrail + Cart */}
                <div style={{ flex: '1 1 40%', minWidth: 0 }}>
                    {/* Alert Panel */}
                    {alertItem && (
                        <div style={{
                            padding: 20, borderRadius: 'var(--radius-lg)',
                            background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)',
                            marginBottom: 20, animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <span style={{ fontSize: '1.3rem' }}>🚨</span>
                                <h3 style={{ fontSize: '1rem', color: '#f87171' }}>AI Health Guardrail Alert</h3>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                                <strong>{alertItem.item.name}</strong> violates your <strong>{profile.name}</strong> dietary profile:
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                                {alertItem.violations.map((v) => (
                                    <span key={v} style={{
                                        padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                        background: 'rgba(248,113,113,0.15)', color: '#f87171',
                                        fontSize: '0.75rem', fontWeight: 600,
                                    }}>
                                        {flagLabels[v]}
                                    </span>
                                ))}
                            </div>

                            {/* Nutrition comparison */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16,
                            }}>
                                <NutritionCard label="Current" item={alertItem.item} bad />
                                {alertItem.alternative && <NutritionCard label="Recommended" item={alertItem.alternative} good />}
                            </div>

                            {alertItem.alternative && (
                                <div style={{
                                    padding: 14, borderRadius: 'var(--radius-md)',
                                    background: 'rgba(67,216,138,0.06)', border: '1px solid rgba(67,216,138,0.2)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                        <img
                                            src={alertItem.alternative.image} alt=""
                                            style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#43d88a' }}>
                                                ✅ {alertItem.alternative.name}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                {alertItem.alternative.brand} · {alertItem.alternative.aisle}
                                            </div>
                                        </div>
                                    </div>
                                    {alertItem.alternative.adaApproved && (
                                        <div style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 4,
                                            padding: '3px 10px', borderRadius: 'var(--radius-full)',
                                            background: 'rgba(96,165,250,0.12)', fontSize: '0.7rem',
                                            fontWeight: 600, color: '#60a5fa', marginBottom: 10,
                                        }}>
                                            🏥 ADA Approved
                                        </div>
                                    )}
                                    <button
                                        onClick={() => handleAcceptAlt(alertItem.alternative)}
                                        id="swap-btn"
                                        style={{
                                            width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)',
                                            background: 'linear-gradient(135deg, var(--ic-green-500), var(--ic-green-600))',
                                            color: '#fff', fontWeight: 600, fontSize: '0.85rem',
                                            boxShadow: '0 4px 16px rgba(10,175,84,0.3)',
                                        }}
                                    >
                                        🎫 Swap & Unlock 15% Coupon
                                    </button>
                                </div>
                            )}

                            {!alertItem.alternative && (
                                <button
                                    onClick={() => setAlertItem(null)}
                                    style={{
                                        padding: '8px 16px', borderRadius: 'var(--radius-md)',
                                        background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                                        color: 'var(--text-secondary)', fontSize: '0.85rem',
                                    }}
                                >
                                    Dismiss
                                </button>
                            )}
                        </div>
                    )}

                    {/* Coupon unlocked */}
                    {Object.keys(couponUnlocked).length > 0 && (
                        <div style={{
                            padding: 16, borderRadius: 'var(--radius-md)',
                            background: 'rgba(67,216,138,0.06)', border: '1px solid rgba(67,216,138,0.15)',
                            marginBottom: 20,
                        }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#43d88a', marginBottom: 6 }}>
                                🎉 Coupons Unlocked via Carrot Ads
                            </div>
                            {Object.keys(couponUnlocked).map((id) => {
                                const item = groceryItems.find((g) => g.id === Number(id))
                                return item ? (
                                    <div key={id} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        15% off {item.name} — <span style={{ color: '#fbbf24' }}>Sponsored by {item.brand}</span>
                                    </div>
                                ) : null
                            })}
                        </div>
                    )}

                    {/* Cart Summary */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <h2 style={{ fontSize: '1.15rem' }}>
                                🛒 Your Cart ({scannedItems.length} items)
                            </h2>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px',
                                borderRadius: 'var(--radius-full)', background: `${healthScore.color}15`,
                                border: `1px solid ${healthScore.color}30`,
                            }}>
                                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: healthScore.color, fontSize: '0.9rem' }}>
                                    {healthScore.score}%
                                </span>
                                <span style={{ fontSize: '0.7rem', color: healthScore.color, fontWeight: 500 }}>
                                    {healthScore.label}
                                </span>
                            </div>
                        </div>
                        {scannedItems.length === 0 ? (
                            <div style={{
                                padding: 40, textAlign: 'center', color: 'var(--text-muted)',
                                background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-subtle)',
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: 8 }}>🛒</div>
                                <div style={{ fontSize: '0.85rem' }}>Scan items to add them to your cart</div>
                                <div style={{ fontSize: '0.75rem', marginTop: 4 }}>
                                    AI guardrails will flag items that conflict with your dietary profile
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {scannedItems.map((item) => (
                                    <div key={item.id} style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '10px 14px', borderRadius: 'var(--radius-md)',
                                        background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                                    }}>
                                        <img src={item.image} alt="" style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>${item.price.toFixed(2)}</div>
                                        </div>
                                        {couponUnlocked[item.id] && (
                                            <span style={{ fontSize: '0.65rem', color: '#fbbf24', fontWeight: 600 }}>🎫 -15%</span>
                                        )}
                                        {item.violations ? (
                                            <span style={{ fontSize: '0.7rem', color: '#f87171' }}>⚠️ Flagged</span>
                                        ) : (
                                            <span style={{ fontSize: '0.7rem', color: '#43d88a' }}>✅</span>
                                        )}
                                    </div>
                                ))}
                                <div style={{
                                    padding: '12px 14px', borderRadius: 'var(--radius-md)',
                                    background: 'rgba(67,216,138,0.06)', border: '1px solid rgba(67,216,138,0.15)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Subtotal</span>
                                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>
                                        ${scannedItems.reduce((s, i) => s + i.price, 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Store Map */}
                <div style={{ flex: '1 1 25%', minWidth: 0 }}>
                    <h2 style={{ fontSize: '1.15rem', marginBottom: 4 }}>Store Map</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                        {highlightAisle
                            ? `Navigate to Aisle ${highlightAisle} for the healthier alternative`
                            : 'Aisles visited are highlighted in blue'}
                    </p>
                    <div style={{
                        padding: 12, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                    }}>
                        <StoreMap highlightAisle={highlightAisle} scannedAisles={scannedAisles} />
                    </div>

                    {/* Health Score Ring */}
                    {scannedItems.length > 0 && (
                        <div style={{
                            marginTop: 16, padding: 20, background: 'var(--bg-glass)',
                            border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                                Cart Health Score
                            </div>
                            <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto' }}>
                                <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--neutral-700)" strokeWidth="8" />
                                    <circle
                                        cx="50" cy="50" r="42" fill="none"
                                        stroke={healthScore.color} strokeWidth="8"
                                        strokeDasharray={`${healthScore.score * 2.64} 264`}
                                        strokeLinecap="round"
                                        style={{ transition: 'stroke-dasharray 0.6s ease' }}
                                    />
                                </svg>
                                <div style={{
                                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', color: healthScore.color }}>
                                        {healthScore.score}
                                    </span>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: healthScore.color, fontWeight: 600, marginTop: 8 }}>
                                {healthScore.label}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                {scannedItems.filter((i) => !i.violations).length}/{scannedItems.length} items comply with {profile.name}
                            </div>
                        </div>
                    )}

                    {/* Profile Info */}
                    <div style={{
                        marginTop: 16, padding: 16, background: `${profile.color}08`,
                        border: `1px solid ${profile.color}20`, borderRadius: 'var(--radius-lg)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <span style={{ fontSize: '1.3rem' }}>{profile.icon}</span>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: profile.color }}>{profile.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{profile.label}</div>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Monitoring for: {profile.restrictions.map((r) => flagLabels[r]).join(', ')}
                        </div>
                    </div>
                </div>
            </div>

            {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}
        </div>
    )
}
