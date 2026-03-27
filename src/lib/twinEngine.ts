import DigitalTwin from "@/models/DigitalTwin";
import {
    calculateBMI,
    approximateInsulinResistance,

    calculateAdherenceScore,

} from "./prediction";
import { computeStressScore } from "./stressAnalyzer";

interface LogPayload {
    userId: string;
    weight: number;
    heightCm: number; // Passed from User model or current twin
    pcodSeverity: string; // Passed from User model
    dietScore: number;
    workoutScore: number;
    symptoms: string[];
    cycleStatus: string;
    mood: string;
    sleepHours: number;
}

export async function processDailyLogAndUpdateTwin(data: LogPayload) {
    // Fetch current twin
    const twin = await DigitalTwin.findOne({ userId: data.userId });
    if (!twin) {
        throw new Error("Digital Twin not found for user.");
    }

    // 1. BMI Calculation
    const newBmi = calculateBMI(data.weight, data.heightCm);

    // 2. Insulin Resistance Simulation
    const insulinScore = approximateInsulinResistance(newBmi, data.pcodSeverity, data.dietScore, data.workoutScore);

    // 3. Adherence Score
    const newAdherence = calculateAdherenceScore(data.dietScore, data.workoutScore);

    // 4. Cycle Regularity
    let cycleScore = twin.cycleRegularityScore;
    if (data.cycleStatus === 'Irregular') {
        // A sudden irregular flag drops the score significantly. In a real app we'd measure deviation days between periods
        cycleScore = Math.max(0, cycleScore - 3);
    } else if (data.cycleStatus === 'Normal' && twin.cycleRegularityScore < 10) {
        cycleScore = Math.min(10, cycleScore + 1);
    }

    // 5. Stress & Inflammation Heuristics based on symptoms
    let stress = twin.stressScore;
    let inflammation = twin.inflammationIndex;

    if (data.symptoms.includes('Anxiety') || data.symptoms.includes('Extreme Fatigue')) {
        stress = Math.min(10, stress + 2);
    } else {
        stress = Math.max(0, stress - 1);
    }

    // NEW: Apply the dedicated Stress Analyzer to definitively refine the score
    stress = computeStressScore(data.mood, data.sleepHours, stress);

    if (data.symptoms.includes('Severe Cystic Acne') || data.symptoms.includes('Bloating') || data.symptoms.includes('Sugar Cravings')) {
        inflammation = Math.min(10, inflammation + 2);
    } else if (data.dietScore > 7) {
        inflammation = Math.max(0, inflammation - 1);
    }

    // 6. Aggregate Stability Score (0 to 100)
    // Optimal is 100. Lower is worse.
    // Factors: insulin (max 10), cycle (max 10), stress (max 10), inflammation (max 10)
    // Max negative impact is 40. We invert it for a 0-100 scale.
    const penalty = (insulinScore * 2) + ((10 - cycleScore) * 2) + (stress * 2) + (inflammation * 2);
    const stabilityScore = Math.max(0, 100 - penalty);

    // 7. Risk Alert
    let riskAlert: 'Low' | 'Medium' | 'High' = 'Low';
    if (stabilityScore < 40) riskAlert = 'High';
    else if (stabilityScore < 70) riskAlert = 'Medium';

    // 8. Generate future trend points (Just a simple projection for the radar/line charts)
    // Let's predict weight 30 days out based on adherence
    // const projectedWeight = predictFutureWeight(data.weight, newAdherence);

    // Update weight trend array
    const today = new Date().getDate();
    const currentWeightTrend = [...twin.weightTrend];

    // Basic mock check: Keep only last 30 entries
    if (currentWeightTrend.length >= 30) currentWeightTrend.shift();
    currentWeightTrend.push({ day: today, value: data.weight });

    // Add the future prediction as the 31st point (pseudo representation)
    // const simulatedFuturePoint = { day: today + 30, value: projectedWeight };

    // Generate symptom trend (tracking stress + inflammation sum over time)
    const currentSymptomTrend = [...twin.symptomTrend];
    if (currentSymptomTrend.length >= 30) currentSymptomTrend.shift();
    currentSymptomTrend.push({ day: today, value: stress + inflammation });

    // Update DB Model
    twin.bmi = newBmi;
    twin.insulinResistanceScore = insulinScore;
    twin.cycleRegularityScore = cycleScore;
    twin.adherenceScore = newAdherence;
    twin.stressScore = stress;
    twin.inflammationIndex = inflammation;
    twin.hormonalStabilityScore = stabilityScore;
    twin.riskAlert = riskAlert;
    twin.weightTrend = currentWeightTrend;
    twin.symptomTrend = currentSymptomTrend;

    await twin.save();
    return twin;
}
