interface TwinMetrics {
    bmi: number;
    insulinResistanceScore: number;
    cycleRegularityScore: number;
    stressScore: number;
    inflammationIndex: number;
}

export function generateRecommendations(metrics: TwinMetrics): string[] {
    const recommendations: string[] = [];

    // Insulin & Weight
    if (metrics.bmi > 25 && metrics.insulinResistanceScore > 6) {
        recommendations.push("Adopt a Low GI Diet and include 30 mins of strength training daily to manage insulin resistance.");
    } else if (metrics.insulinResistanceScore > 5) {
        recommendations.push("Consider increasing your fiber intake and taking short walks after meals to stabilize blood sugar.");
    }

    // Cycle
    if (metrics.cycleRegularityScore < 4) {
        recommendations.push("Your cycle is highly irregular right now. Ensure you are getting at least 8 hours of sleep and consider consulting your healthcare provider about an inositol supplement.");
    }

    // Stress & Inflammation
    if (metrics.stressScore > 7) {
        recommendations.push("High stress detected. Try 15 minutes of mindfulness or yoga daily to lower cortisol levels.");
    }

    if (metrics.inflammationIndex > 7) {
        recommendations.push("High inflammation. Focus on an anti-inflammatory diet rich in Omega-3s (salmon, walnuts) and avoid processed foods.");
    }

    // General preventative
    if (recommendations.length === 0) {
        recommendations.push("You are maintaining exceptional hormonal stability! Keep up with your current balanced diet and exercise routine.");
    }

    return recommendations;
}
