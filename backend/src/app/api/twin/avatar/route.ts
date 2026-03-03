import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from '@/lib/db';
import DigitalTwin from '@/models/DigitalTwin';

export async function POST() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const userId = (session.user as { id: string }).id;

        // In a real app we'd handle the file upload processing here. 
        // For the demo, we just unlock the simulated generated avatar flag.
        await DigitalTwin.findOneAndUpdate(
            { userId },
            { $set: { hasAvatar: true } },
            { new: true }
        );

        return NextResponse.json({ message: "Avatar generated successfully", hasAvatar: true }, { status: 200 });

    } catch (error) {
        console.error('Avatar generation error:', error);
        return NextResponse.json({ message: 'Internal server error backend Twin Avatar Generation' }, { status: 500 });
    }
}
