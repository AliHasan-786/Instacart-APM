// ─── EquiBatch Simulated Data ────────────────────────────────────
// Mock metropolitan area: centered around downtown (40.7580, -73.9855) — Midtown Manhattan

export const STORE_LOCATION = { lat: 40.758, lng: -73.9855, name: 'FreshMart Midtown' }

export const orders = [
    { id: 1, customer: 'Sarah M.', lat: 40.7712, lng: -73.9665, tip: 18, distance: 1.8, perishable: true, orderValue: 67, items: 12 },
    { id: 2, customer: 'James K.', lat: 40.7455, lng: -73.9980, tip: 0, distance: 3.2, perishable: false, orderValue: 23, items: 4 },
    { id: 3, customer: 'Maria L.', lat: 40.7820, lng: -73.9510, tip: 25, distance: 2.4, perishable: true, orderValue: 112, items: 22 },
    { id: 4, customer: 'David R.', lat: 40.7350, lng: -73.9900, tip: 2, distance: 4.1, perishable: false, orderValue: 31, items: 6 },
    { id: 5, customer: 'Emily C.', lat: 40.7630, lng: -74.0050, tip: 15, distance: 1.5, perishable: false, orderValue: 55, items: 9 },
    { id: 6, customer: 'Robert T.', lat: 40.7890, lng: -73.9750, tip: 0, distance: 3.8, perishable: true, orderValue: 19, items: 3 },
    { id: 7, customer: 'Ashley P.', lat: 40.7510, lng: -73.9720, tip: 22, distance: 1.2, perishable: false, orderValue: 89, items: 15 },
    { id: 8, customer: 'Michael B.', lat: 40.7280, lng: -73.9850, tip: 0, distance: 5.0, perishable: false, orderValue: 28, items: 5 },
    { id: 9, customer: 'Jessica W.', lat: 40.7750, lng: -73.9900, tip: 12, distance: 2.0, perishable: true, orderValue: 73, items: 14 },
    { id: 10, customer: 'Chris D.', lat: 40.7400, lng: -73.9600, tip: 3, distance: 3.5, perishable: false, orderValue: 42, items: 8 },
    { id: 11, customer: 'Amanda F.', lat: 40.7680, lng: -73.9500, tip: 20, distance: 2.8, perishable: true, orderValue: 95, items: 18 },
    { id: 12, customer: 'Kevin H.', lat: 40.7550, lng: -74.0020, tip: 1, distance: 2.1, perishable: false, orderValue: 35, items: 7 },
    { id: 13, customer: 'Nicole G.', lat: 40.7830, lng: -73.9680, tip: 16, distance: 3.0, perishable: false, orderValue: 61, items: 11 },
    { id: 14, customer: 'Brian S.', lat: 40.7320, lng: -74.0000, tip: 0, distance: 4.5, perishable: true, orderValue: 15, items: 2 },
]

// ─── Order Classification Helpers ────────────────────────────────
export function getOrderType(order) {
    if (order.tip >= 15) return 'high-tip'
    if (order.tip > 0 && order.tip < 15) return 'medium-tip'
    return 'no-tip'
}

export function getOrderColor(order) {
    const type = getOrderType(order)
    if (type === 'high-tip') return '#43d88a'    // green
    if (type === 'medium-tip') return '#fbbf24'  // amber
    return '#f87171'                              // red
}

// ─── Haversine Distance (km) ─────────────────────────────────────
function haversine(a, b) {
    const R = 6371
    const dLat = ((b.lat - a.lat) * Math.PI) / 180
    const dLng = ((b.lng - a.lng) * Math.PI) / 180
    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((a.lat * Math.PI) / 180) *
        Math.cos((b.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2
    return 2 * R * Math.asin(Math.sqrt(h))
}

// ─── Batching Algorithm ──────────────────────────────────────────
// Score each order, then greedily group into batches of 2-3
export function computeBatches(orderList, weights) {
    const { alpha, beta, gamma } = weights

    // Score each order with the MDP reward function
    const scored = orderList.map((o) => {
        const tipEquity = o.tip / 25 // normalized to [0, 1]
        const routeEff = 1 - o.distance / 6 // closer = higher
        const perishPenalty = o.perishable ? 0.3 : 0
        const score = alpha * tipEquity + beta * routeEff - gamma * (1 - tipEquity) - perishPenalty * 0.2
        return { ...o, score }
    })

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score)

    // Greedy batching: pair high-score with nearby orders
    const used = new Set()
    const batches = []
    const batchColors = ['#43d88a', '#60a5fa', '#fbbf24', '#a78bfa', '#f472b6', '#34d399', '#fb923c']

    for (let i = 0; i < scored.length; i++) {
        if (used.has(scored[i].id)) continue
        const anchor = scored[i]
        used.add(anchor.id)
        const batch = [anchor]

        // Find nearest unused orders
        const candidates = scored
            .filter((o) => !used.has(o.id))
            .map((o) => ({ ...o, dist: haversine(anchor, o) }))
            .sort((a, b) => a.dist - b.dist)

        // Pick 1-2 nearest, preferring balanced tip equity when gamma is high
        const batchSize = gamma > 0.5 ? 2 : 3 // high-tipper priority → smaller batches
        for (let j = 0; j < Math.min(batchSize - 1, candidates.length); j++) {
            used.add(candidates[j].id)
            batch.push(candidates[j])
        }

        batches.push({
            id: batches.length + 1,
            orders: batch,
            color: batchColors[batches.length % batchColors.length],
            totalTip: batch.reduce((s, o) => s + o.tip, 0),
            totalDistance: batch.reduce((s, o) => s + o.distance, 0),
            totalItems: batch.reduce((s, o) => s + o.items, 0),
            hasPerishable: batch.some((o) => o.perishable),
        })
    }

    return batches
}

// ─── Compute Metrics ─────────────────────────────────────────────
export function computeMetrics(batches) {
    if (batches.length === 0) return { shopperSat: 0, churnRisk: 0, efficiency: 0 }

    const avgTipPerBatch = batches.reduce((s, b) => s + b.totalTip, 0) / batches.length
    const avgDistPerBatch = batches.reduce((s, b) => s + b.totalDistance, 0) / batches.length
    const highTipOrders = batches.flatMap((b) => b.orders).filter((o) => o.tip >= 15)
    const highTipInLargeBatches = batches.filter(
        (b) => b.orders.length >= 3 && b.orders.some((o) => o.tip >= 15)
    ).length

    // Shopper Satisfaction: higher avg tip + lower distance = happier
    const shopperSat = Math.min(100, Math.round(40 + avgTipPerBatch * 3 - avgDistPerBatch * 2))

    // Churn Risk: high-tip customers in large batches = bad
    const churnRisk = highTipOrders.length > 0
        ? Math.round((highTipInLargeBatches / Math.max(1, highTipOrders.length)) * 100)
        : 0

    // Efficiency: fewer total batches + lower total distance = better
    const totalDist = batches.reduce((s, b) => s + b.totalDistance, 0)
    const efficiency = Math.min(100, Math.round(100 - totalDist * 1.5))

    return { shopperSat, churnRisk, efficiency }
}
