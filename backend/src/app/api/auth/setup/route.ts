import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from '@/lib/db';
import User from '@/models/User';
import DigitalTwin from '@/models/DigitalTwin';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as { id: string }).id;
        const body = await req.json();
        const { age, height, defaultWeight, irregularCycles, hirsutism, weightGain, familyHistory } = body;

        // Artificial Intelligence Early Risk Detection Algorithm
        let riskScore = 0;
        if (irregularCycles) riskScore += 3;
        if (hirsutism) riskScore += 2;
        if (weightGain) riskScore += 2;
        if (familyHistory) riskScore += 1;

        let calculatedSeverity = 'Low';
        if (riskScore >= 5) {
            calculatedSeverity = 'High';
        } else if (riskScore >= 3) {
            calculatedSeverity = 'Medium';
        }

        await connectDB();

        // Update user profile
        await User.findByIdAndUpdate(userId, {
            age: parseInt(age),
            height: parseInt(height),
            pcodSeverity: calculatedSeverity,
            irregularCycles,
            hirsutism,
            weightGain,
            familyHistory
        });

        // Initialize the Digital Twin with basic metrics based on the first recorded weight
        const initialBmi = defaultWeight / Math.pow(height / 100, 2);

        await DigitalTwin.findOneAndUpdate(
            { userId },
            {
                bmi: initialBmi,
                riskAlert: calculatedSeverity,
                cycleRegularityScore: irregularCycles ? 4 : 10,
                inflammationIndex: hirsutism ? 6 : 2,
                weightTrend: [{ day: new Date().getDate(), value: defaultWeight }]
            },
            { new: true, upsert: true }
        );

        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });

    } catch (error) {
        console.error('Setup error:', error);
        return NextResponse.json(
            { message: 'Internal server error during profile setup' },
            { status: 500 }
        );
    }
}
