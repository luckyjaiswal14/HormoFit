import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import CommunityPost from '@/models/CommunityPost';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        const posts = await CommunityPost.find().sort({ createdAt: -1 }).limit(50);
        return NextResponse.json({ posts }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { title, content, tags } = body;

        // --- AI Verification Heuristics Engine ---
        // Determines how medically sound or anecdotal a community post is.
        let aiTrustScore = 50;
        const lowerContent = content.toLowerCase();

        // Positive trust indicators (science-based language, medical references)
        if (lowerContent.includes('endocrinologist') || lowerContent.includes('doctor') || lowerContent.includes('prescribed')) aiTrustScore += 15;
        if (lowerContent.includes('insulin resistance') || lowerContent.includes('myo-inositol') || lowerContent.includes('blood test')) aiTrustScore += 15;
        if (lowerContent.includes('study') || lowerContent.includes('research') || lowerContent.includes('evidence')) aiTrustScore += 10;

        // Negative trust indicators (misinformation/snake oil/pseudoscientific cures)
        if (lowerContent.includes('cure pcod in ') || lowerContent.includes('miracle') || lowerContent.includes('guaranteed')) aiTrustScore -= 30;
        if (lowerContent.includes('toxins') || lowerContent.includes('detox tea') || lowerContent.includes('magic pill') || lowerContent.includes('flush hormones')) aiTrustScore -= 20;

        aiTrustScore = Math.max(0, Math.min(aiTrustScore, 100));
        const isVerified = aiTrustScore >= 75; // AI flags as high-quality safe information

        await connectDB();
        const post = await CommunityPost.create({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            authorId: (session.user as any).id,
            authorName: session.user.name || 'Anonymous',
            title,
            content,
            tags,
            aiTrustScore,
            isVerified
        });

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error('Post creation error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
