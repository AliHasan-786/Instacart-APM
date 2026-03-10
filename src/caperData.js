// ─── Caper Context Simulated Data ────────────────────────────────

export const dietaryProfiles = [
    {
        id: 'diabetic',
        name: 'Strict Diabetic',
        label: 'Low Glycemic, Low Sugar',
        label: 'Low Glycemic, Low Sugar',
        icon: null,
        color: '#60a5fa',
        restrictions: ['high-sugar', 'high-gi', 'refined-carbs'],
    },
    {
        id: 'athlete',
        name: 'High-Protein Athlete',
        label: 'High Protein, Complex Carbs',
        label: 'High Protein, Complex Carbs',
        icon: null,
        color: '#43d88a',
        restrictions: ['low-protein', 'high-sugar', 'processed'],
    },
    {
        id: 'gluten-free',
        name: 'Gluten-Free',
        label: 'Celiac Safe, No Wheat/Barley/Rye',
        label: 'Celiac Safe, No Wheat/Barley/Rye',
        icon: null,
        color: '#fbbf24',
        restrictions: ['contains-gluten'],
    },
]

export const groceryItems = [
    {
        id: 1,
        name: 'Frosted Flakes Cereal',
        brand: 'Kellogg\'s',
        aisle: 'Aisle 3 — Breakfast',
        aisleNum: 3,
        image: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=200&h=200&fit=crop',
        price: 4.29,
        flags: ['high-sugar', 'high-gi', 'refined-carbs', 'contains-gluten'],
        nutrition: { calories: 130, sugar: '12g', protein: '1g', fiber: '0g', sodium: '150mg' },
        alternatives: [2],
    },
    {
        id: 2,
        name: 'Steel Cut Oats',
        brand: 'Bob\'s Red Mill',
        aisle: 'Aisle 3 — Breakfast',
        aisleNum: 3,
        image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=200&h=200&fit=crop',
        price: 5.49,
        flags: ['contains-gluten'],
        nutrition: { calories: 150, sugar: '1g', protein: '5g', fiber: '4g', sodium: '0mg' },
        alternatives: [],
        adaApproved: true,
    },
    {
        id: 3,
        name: 'White Bread',
        brand: 'Wonder',
        aisle: 'Aisle 5 — Bakery',
        aisleNum: 5,
        image: 'https://images.unsplash.com/photo-1549931319-a545753467c8?w=200&h=200&fit=crop',
        price: 2.99,
        flags: ['high-gi', 'refined-carbs', 'contains-gluten', 'low-protein'],
        nutrition: { calories: 80, sugar: '2g', protein: '2g', fiber: '0g', sodium: '140mg' },
        alternatives: [4],
    },
    {
        id: 4,
        name: 'Ezekiel Sprouted Bread',
        brand: 'Food for Life',
        aisle: 'Aisle 5 — Bakery',
        aisleNum: 5,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
        price: 5.99,
        flags: ['contains-gluten'],
        nutrition: { calories: 80, sugar: '0g', protein: '5g', fiber: '3g', sodium: '75mg' },
        alternatives: [],
        adaApproved: true,
    },
    {
        id: 5,
        name: 'Regular Cola (2L)',
        brand: 'Coca-Cola',
        aisle: 'Aisle 7 — Beverages',
        aisleNum: 7,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200&h=200&fit=crop',
        price: 2.49,
        flags: ['high-sugar', 'high-gi', 'processed'],
        nutrition: { calories: 140, sugar: '39g', protein: '0g', fiber: '0g', sodium: '45mg' },
        alternatives: [6],
    },
    {
        id: 6,
        name: 'Sparkling Water (Lime)',
        brand: 'LaCroix',
        aisle: 'Aisle 7 — Beverages',
        aisleNum: 7,
        image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&h=200&fit=crop',
        price: 1.29,
        flags: [],
        nutrition: { calories: 0, sugar: '0g', protein: '0g', fiber: '0g', sodium: '0mg' },
        alternatives: [],
        adaApproved: true,
    },
    {
        id: 7,
        name: 'Greek Yogurt (Plain)',
        brand: 'Chobani',
        aisle: 'Aisle 2 — Dairy',
        aisleNum: 2,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop',
        price: 1.89,
        flags: [],
        nutrition: { calories: 90, sugar: '4g', protein: '15g', fiber: '0g', sodium: '65mg' },
        alternatives: [],
        adaApproved: true,
    },
    {
        id: 8,
        name: 'Pasta Penne',
        brand: 'Barilla',
        aisle: 'Aisle 4 — Pasta & Grains',
        aisleNum: 4,
        image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop',
        price: 1.79,
        flags: ['contains-gluten', 'high-gi', 'refined-carbs'],
        nutrition: { calories: 200, sugar: '1g', protein: '7g', fiber: '2g', sodium: '0mg' },
        alternatives: [9],
    },
    {
        id: 9,
        name: 'Chickpea Pasta',
        brand: 'Banza',
        aisle: 'Aisle 4 — Pasta & Grains',
        aisleNum: 4,
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&h=200&fit=crop',
        price: 3.49,
        flags: [],
        nutrition: { calories: 190, sugar: '1g', protein: '14g', fiber: '5g', sodium: '60mg' },
        alternatives: [],
        adaApproved: true,
    },
    {
        id: 10,
        name: 'Protein Bar',
        brand: 'RXBAR',
        aisle: 'Aisle 6 — Snacks',
        aisleNum: 6,
        image: 'https://images.unsplash.com/photo-1622484212850-eb596d769eab?w=200&h=200&fit=crop',
        price: 2.99,
        flags: [],
        nutrition: { calories: 210, sugar: '12g', protein: '12g', fiber: '4g', sodium: '260mg' },
        alternatives: [],
    },
]

// Aisle map layout for the store
export const aisleMap = [
    { num: 1, label: 'Produce', x: 10, y: 15, w: 12, h: 70 },
    { num: 2, label: 'Dairy', x: 24, y: 15, w: 12, h: 70 },
    { num: 3, label: 'Breakfast', x: 38, y: 15, w: 12, h: 70 },
    { num: 4, label: 'Pasta & Grains', x: 52, y: 15, w: 12, h: 70 },
    { num: 5, label: 'Bakery', x: 66, y: 15, w: 12, h: 70 },
    { num: 6, label: 'Snacks', x: 24, y: 88, w: 24, h: 10 },
    { num: 7, label: 'Beverages', x: 52, y: 88, w: 24, h: 10 },
]

// Check if an item violates a dietary profile
export function checkViolation(item, profile) {
    const violated = item.flags.filter((f) => profile.restrictions.includes(f))
    return violated.length > 0 ? violated : null
}

// Get alternative for a flagged item
export function getAlternative(item) {
    if (item.alternatives.length === 0) return null
    return groceryItems.find((g) => g.id === item.alternatives[0])
}

// Compute health score for scanned items
export function computeHealthScore(scannedItems, profile) {
    if (scannedItems.length === 0) return { score: 100, label: 'No items scanned', color: '#556070' }
    const clean = scannedItems.filter((item) => !checkViolation(item, profile)).length
    const pct = Math.round((clean / scannedItems.length) * 100)
    if (pct >= 80) return { score: pct, label: 'Excellent', color: '#43d88a' }
    if (pct >= 60) return { score: pct, label: 'Good', color: '#fbbf24' }
    return { score: pct, label: 'Needs Improvement', color: '#f87171' }
}

// Flag labels
export const flagLabels = {
    'high-sugar': 'High Sugar',
    'high-gi': 'High Glycemic Index',
    'refined-carbs': 'Refined Carbohydrates',
    'contains-gluten': 'Contains Gluten',
    'low-protein': 'Low Protein',
    'processed': 'Highly Processed',
}
