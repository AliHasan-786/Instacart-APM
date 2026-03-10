import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react'

const prdData = {
    'instatrust': {
        title: 'InstaTrust — PRD',
        color: '#009B3A',
        content: [
            {
                heading: '1. Problem Statement',
                text: 'Consumers increasingly feel that algorithmically generated prices are opaque, unpredictable, and potentially unfair. Without visibility into why prices fluctuate, trust in the marketplace erodes.'
            },
            {
                heading: '2. Product Vision',
                text: 'Demystify dynamic pricing. Introduce a "Fair Price Guarantee" interface where shoppers can explicitly see the algorithmic factors (demand, logistics, baseline cost) behind their quoted price.'
            },
            {
                heading: '3. Key Features',
                text: '• Factor Breakdown Modal\n• 30-Day Price History Visualization\n• Algorithmic Personalization Toggle\n• Data Transparency Settings aligned with NY Pricing Disclosure Act'
            },
            {
                heading: '4. Success Metrics',
                text: '• Primary: Increase in consumer trust score (NPS/CSAT)\n• Counter-Metric: Conversion rate (ensure transparency does not introduce friction)'
            }
        ]
    },
    'equibatch': {
        title: 'EquiBatch — PRD',
        color: '#2563EB',
        content: [
            {
                heading: '1. Problem Statement',
                text: 'Batching orders purely for routing efficiency often leads to inequitable shopper earnings. Shoppers reject low-value batches, causing SLA violations on high-value orders grouped with them.'
            },
            {
                heading: '2. Product Vision',
                text: 'Re-engineer the dispatch algorithm as a multi-objective Markov Decision Process (MDP). Introduce controllable weights (α, β, γ) to continuously balance shopper hourly earnings, mileage reduction, and customer delivery SLAs.'
            },
            {
                heading: '3. Key Features',
                text: '• Multi-objective batch optimization engine\n• Interactive visualization for operations teams\n• Dynamic re-weighing of priority factors in real-time'
            },
            {
                heading: '4. Success Metrics',
                text: '• Primary: Reduction in median time-to-accept for batches\n• Primary: Increase in bottom 20th percentile shopper hourly earnings\n• Counter-Metric: Overall platform delivery SLA adherence'
            }
        ]
    },
    'caper-context': {
        title: 'Caper Context — PRD',
        color: '#D49212',
        content: [
            {
                heading: '1. Problem Statement',
                text: 'In-store shopping lacks the personalized dietary guidance available online. Shoppers spend excessive time reading labels to adhere to strict diets (e.g., Diabetic, Celiac).'
            },
            {
                heading: '2. Product Vision',
                text: 'Bring Instacart’s AI Health Tags to the physical aisle via Caper Carts. Flag dietary violations in real-time as items are scanned, and instantly suggest ADA-approved alternatives while monetizing via Carrot Ads coupons.'
            },
            {
                heading: '3. Key Features',
                text: '• Real-time Agentic Guardrails for product scanning\n• RAG-based alternative suggestion engine\n• Instacart Carrot Ads API integration for instant couponing\n• Caper Cart tablet UI simulation'
            },
            {
                heading: '4. Success Metrics',
                text: '• Primary: Conversion rate on alternative suggestions (coupon clip rate)\n• Primary: Total ad revenue generated via swap interactions\n• Counter-Metric: Cart abandonment or drop in overall basket size'
            }
        ]
    },
    'strategy': {
        title: 'Product Strategy — Marketplace Trust',
        color: '#637381',
        content: [
            {
                heading: 'The Four-Sided Trust Framework',
                text: 'Instacart is not a two-sided marketplace; it relies on consumers, shoppers, retailers, and CPG advertisers. Trust must be maintained simultaneously across all four.'
            },
            {
                heading: 'Consumer Trust',
                text: 'Transparency is the new currency. InstaTrust eliminates the "black box" of dynamic pricing, fulfilling regulatory pressures preemptively.'
            },
            {
                heading: 'Shopper Trust',
                text: 'Earnings equality stabilizes the supply side. EquiBatch ensures the dispatch algorithm isn\'t just efficient, but fundamentally fair.'
            },
            {
                heading: 'Retailer & Advertiser Synergies',
                text: 'Caper Context bridges the digital to the physical. It improves the physical retail experience while creating a new, highly-convertable surface for CPG performance marketing.'
            }
        ]
    }
}

export default function PRDPage() {
    const { id } = useParams()
    const doc = prdData[id]

    if (!doc) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Document not found.</div>
    }

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAFA', paddingBottom: 80 }}>
            {/* Header */}
            <div style={{
                height: 60, display: 'flex', alignItems: 'center',
                padding: '0 24px', borderBottom: '1px solid #E8E8E8',
                background: '#FFFFFF', position: 'sticky', top: 0, zIndex: 10
            }}>
                <Link to="/" style={{ color: '#637381', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                    <ArrowLeft size={16} /> Back to Portfolio
                </Link>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 720, margin: '48px auto 0', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 12, background: doc.color + '15',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: doc.color
                    }}>
                        <FileText size={24} />
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#1B1B1B' }}>
                        {doc.title}
                    </h1>
                </div>

                <div style={{ height: 1, background: '#E8E8E8', margin: '32px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    {doc.content.map((section, idx) => (
                        <div key={idx}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: doc.color, marginBottom: 12 }}>
                                {section.heading}
                            </h2>
                            <div style={{ fontSize: '0.95rem', color: '#4A5568', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                                {section.text}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
