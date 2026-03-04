import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from '@/lib/db';
import HealthLog from '@/models/HealthLog';
import User from '@/models/User';
import { processDailyLogAndUpdateTwin } from '@/lib/twinEngine';
import { computeHormonalImpact } from '@/lib/nutrition';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as { id: string }).id;
        const body = await req.json();

        const { weight, symptoms, cycleStatus, workoutScore, meals, mood, sleepHours } = body;

        const dietScore = computeHormonalImpact(meals);

        await connectDB();

        // Create the health log
        const log = await HealthLog.create({
            userId,
            weight,
            symptoms,
            cycleStatus,
            meals,
            dietScore,
            workoutScore,
            mood,
            sleepHours,
        });

        // Fetch user to get height and pcod severity
        const user = await User.findById(userId);

        // Call Twin Engine
        const updatedTwin = await processDailyLogAndUpdateTwin({
            userId,
            weight,
            heightCm: user.height,
            pcodSeverity: user.pcodSeverity,
            dietScore,
            workoutScore,
            symptoms,
            cycleStatus,
            mood,
            sleepHours
        });

        return NextResponse.json({ message: "Log created, twin updated successfully", log, twin: updatedTwin }, { status: 201 });

    } catch (error) {
        console.error('Log creation error:', error);
        return NextResponse.json(
            { message: 'Internal server error while creating health log' },
            { status: 500 }
        );
    }
}
