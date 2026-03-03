export function calculateBMI(weightKg: number, heightCm: number): number {
    if (heightCm <= 0 || weightKg <= 0) return 0;
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(2));
}

export function approximateInsulinResistance(bmi: number, pcodSeverity: string, dietScore: number, workoutScore: number): number {
    let score = 0;

    if (bmi > 25) score += 2;
    if (bmi > 30) score += 3;

    // Diet score out of 10. Lower is worse (e.g., high sugar)
    if (dietScore < 4) score += 3;
    else if (dietScore < 7) score += 1;

    // Workout score out of 10. Lower is worse.
    if (workoutScore < 3) score += 2;

    if (pcodSeverity === 'High') score += 2;

    // Cap at 10
    return Math.min(score, 10);
}

export function calculateCycleScore(currentScore: number, deviationDays: number): number {
    let newScore = currentScore;
    if (deviationDays > 5) {
        newScore -= 3;
    } else if (deviationDays <= 2) {
        newScore += 1; // Reward regularity
    }
    return Math.max(0, Math.min(newScore, 10)); // Keep between 0 and 10
}

export function calculateAdherenceScore(dietScore: number, workoutScore: number): number {
    // Simple average of diet and workout adherence
    return parseFloat(((dietScore + workoutScore) / 2).toFixed(1));
}

export function predictFutureWeight(currentWeight: number, adherenceScore: number): number {
    // If adherence is high (>7), predict weight loss.
    // If low (<4), predict weight gain.
    // Formula: currentWeight - ((adherenceScore - 5) * 0.3)
    const shift = (adherenceScore - 5) * 0.3;
    return parseFloat((currentWeight - shift).toFixed(2));
}

// Generates an array of predicted future weights based on distinct adherence paths
export function generateWeightSimulation(currentWeight: number, adherenceScore: number) {
    const simulation = [];
    let currentPath = currentWeight;
    let positivePath = currentWeight;
    let negativePath = currentWeight;

    // Baseline Day 0
    simulation.push({
        day: 'Now',
        currentPath: parseFloat(currentWeight.toFixed(2)),
        positivePath: parseFloat(currentWeight.toFixed(2)),
        negativePath: parseFloat(currentWeight.toFixed(2))
    });

    for (let i = 1; i <= 6; i++) {
        // projecting every 5 days for a 30-day view
        const daysOut = i * 5;

        // Strict adherence (9/10): consistent safe weight reduction (~0.5kg per 5 days)
        positivePath -= (0.4 + (Math.random() * 0.2));

        // Poor adherence (2/10): insulin spikes leading to weight accumulation
        negativePath += (0.6 + (Math.random() * 0.3));

        // Current trajectory formula
        const currentShift = (adherenceScore - 5) * 0.15;
        currentPath -= currentShift;

        // Apply minor natural fluctuations
        const noise = (Math.random() - 0.5) * 0.3;

        simulation.push({
            day: `Day +${daysOut}`,
            currentPath: parseFloat((currentPath + noise).toFixed(2)),
            positivePath: parseFloat((positivePath).toFixed(2)),
            negativePath: parseFloat((negativePath).toFixed(2)),
        });
    }

    return simulation;
}
