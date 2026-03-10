import { Link } from 'react-router-dom'

const prototypes = [
    {
        id: 'instatrust',
        title: 'InstaTrust',
        subtitle: 'Algorithmic Pricing Transparency',
        icon: '🛡️',
        color: '#43d88a',
        gradient: 'linear-gradient(135deg, rgba(10,175,84,0.15), rgba(10,175,84,0.05))',
        border: 'rgba(10,175,84,0.25)',
        side: 'Consumer + Legal/Compliance',
        description: 'Injects radical pricing transparency into the browsing experience with a "Fair Price Guarantee" badge, algorithmic factor breakdown modal, 30-day Recharts price history visualization, and an opt-in personalization dashboard meeting NY Pricing Disclosure Act requirements.',
        features: ['Fair Price Guarantee Badge', '30-Day Price History Chart', 'Algorithmic Factor Breakdown', 'Opt-In Personalization Toggle'],
        link: '/instatrust',
    },
    {
        id: 'equibatch',
        title: 'EquiBatch',
        subtitle: 'RL Shopper Dispatch Simulator',
        icon: '⚡',
        color: '#60a5fa',
        gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))',
        border: 'rgba(59,130,246,0.25)',
        side: 'Shoppers + Platform Operations',
        description: 'Interactive geographic simulation demonstrating multi-objective batch optimization using a Markov Decision Process reward function. Recruiters adjust α/β/γ weights to visualize real-time tradeoffs between shopper earnings, routing efficiency, and high-tipper SLA.',
        features: ['Leaflet Interactive Map', 'Real-Time Batch Optimization', 'MDP Reward Function', 'Impact Metrics Dashboard'],
        link: '/equibatch',
    },
    {
        id: 'caper',
        title: 'Caper Context',
        subtitle: 'Agentic In-Store Dietary Navigator',
        icon: '🛒',
        color: '#fbbf24',
        gradient: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))',
        border: 'rgba(251,191,36,0.25)',
        side: 'Retailers + Advertisers + Health',
        description: 'Tablet-optimized Caper Cart simulator that brings AI Health Tags into the physical aisle. Dietary profile-aware guardrails flag unhealthy items, suggest ADA-compliant alternatives, and unlock Carrot Ads coupons — merging health tech with retail media monetization.',
        features: ['Dietary Profile Selector', 'AI Health Guardrails', 'ADA-Approved Alternatives', 'Carrot Ads Coupon Integration'],
        link: '/caper',
    },
]

export default function PortfolioPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Hero */}
            <div style={{
                maxWidth: 900, margin: '0 auto', padding: '80px 24px 40px', textAlign: 'center',
                animation: 'fadeIn 0.6s ease',
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px',
                    background: 'rgba(10,175,84,0.08)', border: '1px solid rgba(10,175,84,0.2)',
                    borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 500,
                    color: 'var(--ic-green-400)', marginBottom: 20,
                }}>
                    🎯 Associate Product Manager — 2026 Cohort Application
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-heading)', fontSize: '2.75rem', fontWeight: 700,
                    lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 16,
                }}>
                    Product Thinking for<br />
                    <span style={{
                        background: 'linear-gradient(135deg, #43d88a, #60a5fa)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        Instacart's Four-Sided Marketplace
                    </span>
                </h1>

                <p style={{
                    fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: 600,
                    margin: '0 auto 16px', lineHeight: 1.6,
                }}>
                    Three interactive prototypes demonstrating product solutions across
                    Instacart's consumer, shopper, retailer, and advertiser ecosystem.
                </p>

                <div style={{
                    display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap',
                    marginBottom: 16,
                }}>
                    {['Ali Hasan', 'Columbia University', 'Fairness in ML · RL with OR · Trust & Safety'].map((tag, i) => (
                        <span key={i} style={{
                            padding: '5px 14px', borderRadius: 'var(--radius-full)',
                            background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                            fontSize: '0.8rem', color: i === 2 ? 'var(--ic-green-400)' : 'var(--text-secondary)',
                            fontWeight: 500,
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Marketplace Context */}
            <div style={{
                maxWidth: 900, margin: '0 auto', padding: '0 24px 24px',
                display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap',
            }}>
                {[
                    { icon: '👤', label: 'Consumers', color: '#43d88a' },
                    { icon: '🛍️', label: 'Shoppers', color: '#60a5fa' },
                    { icon: '🏪', label: 'Retailers', color: '#fbbf24' },
                    { icon: '📢', label: 'Advertisers', color: '#a78bfa' },
                ].map((s) => (
                    <div key={s.label} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                        borderRadius: 'var(--radius-full)', background: `${s.color}10`,
                        border: `1px solid ${s.color}30`, fontSize: '0.8rem', color: s.color,
                        fontWeight: 500,
                    }}>
                        {s.icon} {s.label}
                    </div>
                ))}
            </div>

            {/* Prototype Cards */}
            <div style={{
                maxWidth: 900, margin: '0 auto', padding: '24px 24px 80px',
                display: 'flex', flexDirection: 'column', gap: 24,
            }}>
                {prototypes.map((p, i) => (
                    <Link
                        to={p.link} key={p.id}
                        style={{
                            display: 'block', textDecoration: 'none', color: 'inherit',
                            padding: 28, borderRadius: 'var(--radius-xl)',
                            background: p.gradient, border: `1px solid ${p.border}`,
                            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                            animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s both`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = `0 12px 40px ${p.color}15`
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                        id={`proto-${p.id}`}
                    >
                        <div style={{ display: 'flex', alignItems: 'start', gap: 20 }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: 'var(--radius-md)',
                                background: `${p.color}15`, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0,
                            }}>
                                {p.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                                    <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{p.title}</h2>
                                    <span style={{
                                        padding: '3px 10px', borderRadius: 'var(--radius-full)',
                                        background: `${p.color}15`, fontSize: '0.7rem', fontWeight: 600,
                                        color: p.color,
                                    }}>
                                        {p.side}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.95rem', color: p.color, fontWeight: 500, marginBottom: 10 }}>
                                    {p.subtitle}
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
                                    {p.description}
                                </p>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {p.features.map((f) => (
                                        <span key={f} style={{
                                            padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)',
                                            fontSize: '0.7rem', color: 'var(--text-secondary)',
                                        }}>
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{
                                flexShrink: 0, color: p.color, fontSize: '1.2rem', marginTop: 8,
                            }}>
                                →
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
