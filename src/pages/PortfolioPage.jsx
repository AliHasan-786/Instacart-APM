import { Link } from 'react-router-dom'

const prototypes = [
    {
        id: 'instatrust',
        title: 'InstaTrust',
        subtitle: 'Algorithmic Pricing Transparency',
        letter: 'IT',
        color: '#009B3A',
        bgLight: 'rgba(0,155,58,0.04)',
        border: 'rgba(0,155,58,0.12)',
        side: 'Consumer + Legal/Compliance',
        description: 'Injects radical pricing transparency into the browsing experience with a "Fair Price Guarantee" badge, algorithmic factor breakdown modal, 30-day Recharts price history visualization, and an opt-in personalization dashboard meeting NY Pricing Disclosure Act requirements.',
        features: ['Fair Price Guarantee Badge', '30-Day Price History Chart', 'Algorithmic Factor Breakdown', 'Opt-In Personalization Toggle'],
        link: '/instatrust',
    },
    {
        id: 'equibatch',
        title: 'EquiBatch',
        subtitle: 'RL Shopper Dispatch Simulator',
        letter: 'EB',
        color: '#2563EB',
        bgLight: 'rgba(37,99,235,0.04)',
        border: 'rgba(37,99,235,0.12)',
        side: 'Shoppers + Platform Operations',
        description: 'Interactive geographic simulation demonstrating multi-objective batch optimization using a Markov Decision Process reward function. Recruiters adjust α/β/γ weights to visualize real-time tradeoffs between shopper earnings, routing efficiency, and high-tipper SLA.',
        features: ['Leaflet Interactive Map', 'Real-Time Batch Optimization', 'MDP Reward Function', 'Impact Metrics Dashboard'],
        link: '/equibatch',
    },
    {
        id: 'caper',
        title: 'Caper Context',
        subtitle: 'Agentic In-Store Dietary Navigator',
        letter: 'CC',
        color: '#D49212',
        bgLight: 'rgba(212,146,18,0.04)',
        border: 'rgba(212,146,18,0.12)',
        side: 'Retailers + Advertisers + Health',
        description: 'Tablet-optimized Caper Cart simulator that brings AI Health Tags into the physical aisle. Dietary profile-aware guardrails flag unhealthy items, suggest ADA-compliant alternatives, and unlock Carrot Ads coupons — merging health tech with retail media monetization.',
        features: ['Dietary Profile Selector', 'AI Health Guardrails', 'ADA-Approved Alternatives', 'Carrot Ads Coupon Integration'],
        link: '/caper',
    },
]

const documents = [
    {
        title: 'InstaTrust — Product Requirements Document',
        type: 'PRD',
        description: 'User stories, acceptance criteria, and technical scope for algorithmic pricing transparency across the consumer browsing experience.',
        color: '#009B3A',
        link: '/prd/instatrust'
    },
    {
        title: 'EquiBatch — Product Requirements Document',
        type: 'PRD',
        description: 'Requirement specs for the RL-based dispatch optimizer, covering MDP formulation, shopper equity constraints, and SLA thresholds.',
        color: '#2563EB',
        link: '/prd/equibatch'
    },
    {
        title: 'Caper Context — Product Requirements Document',
        type: 'PRD',
        description: 'End-to-end product spec for dietary guardrails on Caper Carts, including RAG retrieval, ADA compliance, and Carrot Ads integration.',
        color: '#D49212',
        link: '/prd/caper-context'
    },
    {
        title: 'Product Strategy — Marketplace Trust Framework',
        type: 'Strategy',
        description: 'Strategic narrative connecting all three prototypes to Instacart\'s four-sided marketplace trust model and 2026 growth pillars.',
        color: '#637381',
        link: '/prd/strategy'
    },
]

const sideColors = {
    'Consumers': '#009B3A',
    'Shoppers': '#2563EB',
    'Retailers': '#D49212',
    'Advertisers': '#8B5CF6',
}

export default function PortfolioPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
            {/* Hero */}
            <div style={{
                maxWidth: 880, margin: '0 auto', padding: '80px 24px 48px', textAlign: 'center',
                animation: 'fadeIn 0.6s ease',
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px',
                    background: 'rgba(0,155,58,0.05)', border: '1px solid rgba(0,155,58,0.12)',
                    borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 500,
                    color: '#009B3A', marginBottom: 24, letterSpacing: '0.01em',
                }}>
                    Associate Product Manager — 2026 Cohort Application
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 700,
                    lineHeight: 1.12, letterSpacing: '-0.035em', marginBottom: 18,
                    color: '#1B1B1B',
                }}>
                    Product Thinking for<br />
                    <span style={{ color: '#009B3A' }}>
                        Instacart's Four-Sided Marketplace
                    </span>
                </h1>

                <p style={{
                    fontSize: '1.1rem', color: '#637381', maxWidth: 560,
                    margin: '0 auto 20px', lineHeight: 1.65,
                }}>
                    Three interactive prototypes demonstrating product solutions across
                    Instacart's consumer, shopper, retailer, and advertiser ecosystem.
                </p>

                <div style={{
                    display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap',
                    marginBottom: 12,
                }}>
                    {['Ali Hasan', 'Cornell Tech'].map((tag, i) => (
                        <span key={i} style={{
                            padding: '5px 14px', borderRadius: '9999px',
                            background: '#F8F7F5', border: '1px solid #E8E8E8',
                            fontSize: '0.8rem', color: '#637381',
                            fontWeight: 500,
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Marketplace Context */}
            <div style={{
                maxWidth: 880, margin: '0 auto', padding: '0 24px 32px',
                display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap',
            }}>
                {Object.entries(sideColors).map(([label, color]) => (
                    <div key={label} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                        borderRadius: '9999px', background: `${color}08`,
                        border: `1px solid ${color}15`, fontSize: '0.8rem', color,
                        fontWeight: 500,
                    }}>
                        <div style={{
                            width: 7, height: 7, borderRadius: '50%', background: color,
                        }} />
                        {label}
                    </div>
                ))}
            </div>

            {/* Prototype Cards */}
            <div style={{
                maxWidth: 880, margin: '0 auto', padding: '8px 24px 48px',
                display: 'flex', flexDirection: 'column', gap: 20,
            }}>
                {prototypes.map((p, i) => (
                    <Link
                        to={p.link} key={p.id}
                        style={{
                            display: 'block', textDecoration: 'none', color: 'inherit',
                            padding: 28, borderRadius: '16px',
                            background: '#FFFFFF',
                            border: `1px solid ${p.border}`,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
                            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                            animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s both`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px ${p.border}`
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)'
                        }}
                        id={`proto-${p.id}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'start', gap: 20 }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: '12px',
                                background: p.bgLight,
                                border: `1px solid ${p.border}`,
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center', flexShrink: 0,
                                fontFamily: 'var(--font-heading)',
                                fontSize: '0.95rem', fontWeight: 800,
                                color: p.color, letterSpacing: '-0.02em',
                            }}>
                                {p.letter}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1B1B1B' }}>{p.title}</h2>
                                    <span style={{
                                        padding: '3px 10px', borderRadius: '9999px',
                                        background: p.bgLight,
                                        border: `1px solid ${p.border}`,
                                        fontSize: '0.68rem', fontWeight: 600,
                                        color: p.color,
                                    }}>
                                        {p.side}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.95rem', color: p.color, fontWeight: 500, marginBottom: 10 }}>
                                    {p.subtitle}
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#637381', lineHeight: 1.55, marginBottom: 14 }}>
                                    {p.description}
                                </p>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {p.features.map((f) => (
                                        <span key={f} style={{
                                            padding: '4px 10px', borderRadius: '9999px',
                                            background: '#F8F7F5', border: '1px solid #E8E8E8',
                                            fontSize: '0.7rem', color: '#637381',
                                        }}>
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{
                                flexShrink: 0, color: p.color, fontSize: '1rem', marginTop: 8,
                                fontWeight: 500,
                            }}>
                                View prototype →
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* PM Documentation Section */}
            <div style={{
                background: '#F8F7F5', borderTop: '1px solid #E8E8E8',
                padding: '56px 24px 64px',
            }}>
                <div style={{ maxWidth: 880, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32 }}>
                        <div style={{
                            fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
                            letterSpacing: '0.06em', color: '#8A919A', marginBottom: 8,
                        }}>
                            Product Management
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700,
                            color: '#1B1B1B', marginBottom: 8,
                        }}>
                            Documentation & Strategy
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: '#637381', maxWidth: 520 }}>
                            Supporting artifacts that demonstrate end-to-end product thinking — from user research through requirements specification.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                        gap: 16,
                    }}>
                        {documents.map((doc, i) => (
                            <Link to={doc.link} key={i} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    padding: '20px 24px', borderRadius: '12px',
                                    background: '#FFFFFF', border: '1px solid #E8E8E8',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                                    transition: 'all 0.25s ease',
                                    cursor: 'pointer',
                                    height: '100%',
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'
                                        e.currentTarget.style.borderColor = '#C4C9CF'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'
                                        e.currentTarget.style.borderColor = '#E8E8E8'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                        <span style={{
                                            padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem',
                                            fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
                                            background: `${doc.color}0A`, color: doc.color,
                                            border: `1px solid ${doc.color}18`,
                                        }}>
                                            {doc.type}
                                        </span>
                                    </div>
                                    <h3 style={{
                                        fontSize: '0.95rem', fontWeight: 600, marginBottom: 6,
                                        color: '#1B1B1B',
                                    }}>
                                        {doc.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.82rem', color: '#637381', lineHeight: 1.5,
                                        margin: 0
                                    }}>
                                        {doc.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                padding: '32px 24px', textAlign: 'center',
                borderTop: '1px solid #E8E8E8',
            }}>
                <p style={{ fontSize: '0.8rem', color: '#8A919A' }}>
                    Ali Hasan · Cornell Tech · Instacart APM 2026 Cohort Application
                </p>
            </div>
        </div>
    )
}
