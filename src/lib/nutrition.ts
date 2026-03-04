export function computeHormonalImpact(mealDescription: string): number {
    if (!mealDescription || mealDescription.trim() === '') return 5; // Default neutral

    const text = mealDescription.toLowerCase();
    let score = 5;

    // Optimal foods for PCOD/Hormone balance (Anti-inflammatory, low GI)
    if (text.includes('salmon') || text.includes('fish') || text.includes('omega') || text.includes('avocado')) score += 2;
    if (text.includes('spinach') || text.includes('greens') || text.includes('broccoli') || text.includes('vegetable')) score += 2;
    if (text.includes('oats') || text.includes('quinoa') || text.includes('brown rice') || text.includes('lentils')) score += 1;
    if (text.includes('spearmint') || text.includes('green tea') || text.includes('matcha')) score += 1;
    if (text.includes('nuts') || text.includes('seeds') || text.includes('almond') || text.includes('chia') || text.includes('flax')) score += 1;
    if (text.includes('chicken') || text.includes('egg') || text.includes('protein')) score += 1;

    // Sub-optimal foods (Insulin spiking, inflammatory PCOD triggers)
    if (text.includes('sugar') || text.includes('sweet') || text.includes('candy') || text.includes('cake') || text.includes('chocolate')) score -= 3;
    if (text.includes('soda') || text.includes('cola') || text.includes('juice')) score -= 2;
    if (text.includes('white bread') || text.includes('pasta') || text.includes('pizza') || text.includes('burger')) score -= 2;
    if (text.includes('dairy') || text.includes('milk') || text.includes('cheese') || text.includes('ice cream')) score -= 1;
    if (text.includes('fried') || text.includes('chips') || text.includes('fries') || text.includes('processed')) score -= 2;

    // Cap the Hormonal Impact array between 1 and 10
    return Math.max(1, Math.min(score, 10));
}
