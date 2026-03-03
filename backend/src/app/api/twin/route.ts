import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from '@/lib/db';
import DigitalTwin from '@/models/DigitalTwin';
import User from '@/models/User';
import { generateRecommendations } from '@/lib/recommendation';
import { generateWeightSimulation } from '@/lib/prediction';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const userId = (session.user as { id: string }).id;

        const twin = await DigitalTwin.findOne({ userId }).lean();
        if (!twin) {
            return NextResponse.json({ message: "Digital twin not found" }, { status: 404 });
        }

        const user = await User.findById(userId).lean();

        // Generate dynamic recommendations
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recommendations = generateRecommendations(twin as any);

        // Calculate advanced future simulation paths
        const latestWeightEntry = twin.weightTrend ? twin.weightTrend[twin.weightTrend.length - 1] : null;
        const currentWeight = latestWeightEntry ? latestWeightEntry.value : (twin.bmi * Math.pow(user?.height ? (user.height / 100) : 1.65, 2));
        const weightSimulation = generateWeightSimulation(currentWeight || 65, twin.adherenceScore);

        return NextResponse.json({ twin, recommendations, weightSimulation }, { status: 200 });

    } catch (error) {
        console.error('Fetch Twin error:', error);
        return NextResponse.json(
            { message: 'Internal server error fetching twin profile' },
            { status: 500 }
        );
    }
}
