export function computeStressScore(mood: string, sleepHours: number, baseStress: number): number {
    let score = baseStress;

    // Analyze Mood State
    if (mood === 'Stressed' || mood === 'Anxious') score += 3;
    else if (mood === 'Depressed') score += 2;
    else if (mood === 'Happy' || mood === 'Calm') score -= 2;

    // Analyze Sleep Hours (Non-linear correlation to cortisol)
    if (sleepHours < 5) score += 4;
    else if (sleepHours < 7) score += 2;
    else if (sleepHours >= 7 && sleepHours <= 9) score -= 2;
    else if (sleepHours > 10) score += 1; // Oversleeping can sometimes correlate to depression/lethargy

    // Cap at the bounds
    return Math.max(0, Math.min(score, 10));
}
