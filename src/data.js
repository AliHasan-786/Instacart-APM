// ─── Simulated Product Catalog ───────────────────────────────────
export const products = [
    {
        id: 1,
        name: 'Organic Whole Milk',
        brand: 'Horizon Organic',
        category: 'Dairy & Eggs',
        price: 5.49,
        unit: '1 gal',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
        algorithmicFactors: {
            baseCost: 4.12,
            demandMultiplier: 1.08,
            regionalMedian: 5.39,
            deliverySurcharge: 0.25,
            currentPromotion: -0.15,
        },
    },
    {
        id: 2,
        name: 'Cheerios Cereal',
        brand: 'General Mills',
        category: 'Breakfast & Cereal',
        price: 4.99,
        unit: '18 oz',
        image: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=400&h=400&fit=crop',
        algorithmicFactors: {
            baseCost: 3.45,
            demandMultiplier: 1.03,
            regionalMedian: 5.19,
            deliverySurcharge: 0.20,
            currentPromotion: -0.22,
        },
    },
    {
        id: 3,
        name: 'Avocados (Bag of 4)',
        brand: 'Fresh Farms',
        category: 'Produce',
        price: 5.99,
        unit: '4 ct',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop',
        algorithmicFactors: {
            baseCost: 4.50,
            demandMultiplier: 1.15,
            regionalMedian: 6.29,
            deliverySurcharge: 0.30,
            currentPromotion: 0,
        },
    },
    {
        id: 4,
        name: 'Sourdough Bread',
        brand: 'La Boulangerie',
        category: 'Bakery',
        price: 4.49,
        unit: '1 loaf',
        image: 'https://images.unsplash.com/photo-1549931319-a545753467c8?w=400&h=400&fit=crop',
        algorithmicFactors: {
            baseCost: 3.20,
            demandMultiplier: 1.05,
            regionalMedian: 4.59,
            deliverySurcharge: 0.18,
            currentPromotion: -0.10,
        },
    },
    {
        id: 5,
        name: 'Free-Range Eggs',
        brand: 'Happy Hen',
        category: 'Dairy & Eggs',
        price: 6.79,
        unit: '1 dozen',
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
        algorithmicFactors: {
            baseCost: 5.10,
            demandMultiplier: 1.12,
            regionalMedian: 6.99,
            deliverySurcharge: 0.22,
            currentPromotion: -0.30,
        },
    },
    {
        id: 6,
        name: 'Greek Yogurt',
        brand: 'Chobani',
        category: 'Dairy & Eggs',
        price: 1.89,
        unit: '5.3 oz',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
        algorithmicFactors: {
            baseCost: 1.25,
            demandMultiplier: 1.02,
            regionalMedian: 1.99,
            deliverySurcharge: 0.10,
            currentPromotion: -0.05,
        },
    },
    {
        id: 7,
        name: 'Baby Spinach',
        brand: 'Earthbound Farm',
        category: 'Produce',
        price: 3.99,
        unit: '5 oz',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
        algorithmicFactors: {
            baseCost: 2.80,
            demandMultiplier: 1.06,
            regionalMedian: 4.19,
            deliverySurcharge: 0.15,
            currentPromotion: -0.12,
        },
    },
    {
        id: 8,
        name: 'Sparkling Water (12-pack)',
        brand: 'LaCroix',
        category: 'Beverages',
        price: 5.29,
        unit: '12 × 12 oz',
        image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
        algorithmicFactors: {
            baseCost: 3.90,
            demandMultiplier: 1.04,
            regionalMedian: 5.49,
            deliverySurcharge: 0.35,
            currentPromotion: -0.18,
        },
    },
]

// ─── Generate 30-Day Price History ──────────────────────────────
function generatePriceHistory(basePrice, volatility = 0.08) {
    const history = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const fluctuation = (Math.random() - 0.5) * 2 * volatility * basePrice
        const price = Math.round((basePrice + fluctuation) * 100) / 100
        history.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price,
            median: basePrice,
        })
    }
    return history
}

export const priceHistories = {}
products.forEach((p) => {
    priceHistories[p.id] = generatePriceHistory(p.algorithmicFactors.regionalMedian)
})

// ─── Default User Preferences ───────────────────────────────────
export const defaultPreferences = {
    algorithmicPricingEnabled: true,
    consentTimestamp: new Date().toISOString(),
    estimatedMonthlySavings: 23.47,
    dataCategories: [
        {
            name: 'Purchase History',
            description: 'Items you\'ve bought in the last 12 months to personalize deals.',
            enabled: true,
        },
        {
            name: 'Location Data',
            description: 'Your delivery ZIP code to determine regional pricing.',
            enabled: true,
        },
        {
            name: 'Browsing Patterns',
            description: 'Products you\'ve viewed to surface relevant flash discounts.',
            enabled: true,
        },
        {
            name: 'Basket Composition',
            description: 'Your cart contents to offer bundle savings.',
            enabled: true,
        },
    ],
}
