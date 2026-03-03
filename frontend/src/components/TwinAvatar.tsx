"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Loader2, User as UserIcon } from "lucide-react";
// eslint-disable-next-line @next/next/no-img-element

interface TwinDataNode {
    hasAvatar?: boolean;
    inflammationIndex?: number;
    stressScore?: number;
    riskAlert?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TwinAvatar({ twinData, onGenerated }: { twinData: TwinDataNode | null, onGenerated?: () => void }) {
    const [uploading, setUploading] = useState(false);
    const hasAvatar = twinData?.hasAvatar || false;

    // Determine mood/expression
    let currentMood = "happy";
    if (twinData && ((twinData.inflammationIndex || 0) > 7 || twinData.riskAlert === 'High' || (twinData.stressScore || 0) > 8)) {
        currentMood = "inflamed";
    } else if (twinData && (twinData.stressScore || 0) >= 5) {
        currentMood = "stressed";
    }

    const avatarSrc = `/avatars/${currentMood}.png`;

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        // Simulate AI generation time
        setTimeout(async () => {
            try {
                const res = await fetch('/api/twin/avatar', { method: 'POST' });
                if (res.ok) {
                    window.location.reload(); // Force full refresh to guarantee avatar state reset
                }
            } catch (e) { console.error(e) }
            finally {
                setUploading(false);
            }
        }, 3000);
    };

    if (!hasAvatar) {
        return (
            <Card className="w-full h-full border-purple-100 bg-purple-50/50 shadow-sm flex flex-col justify-center">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2"><UserIcon className="w-5 h-5 text-purple-600" /> Generate 3D Twin</CardTitle>
                    <CardDescription>Upload a photo to generate your personalized 3D Digital Twin.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-200 rounded-lg mx-6 mb-4 bg-white/50">
                    {uploading ? (
                        <div className="flex flex-col items-center gap-4 py-4">
                            <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                            <p className="text-xs text-purple-700 font-medium animate-pulse text-center">Scanning facial features & mapping to twin model...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-2">
                            <UploadCloud className="w-10 h-10 text-purple-300" />
                            <label htmlFor="photo-upload" className="bg-purple-600 hover:bg-purple-700 shadow-md text-white h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium cursor-pointer transition-colors">
                                Upload Photo
                            </label>
                            <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full h-full min-h-[300px] border-purple-100 shadow-md overflow-hidden flex flex-col items-center relative">
            <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                    <div className={`w-2.5 h-2.5 rounded-full ${currentMood === 'happy' ? 'bg-green-500' : currentMood === 'stressed' ? 'bg-amber-500' : 'bg-red-500'} animate-pulse`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">{currentMood} Data Sync</span>
                </div>
            </div>

            <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={avatarSrc}
                    alt="Digital Twin Avatar"
                    className="h-[280px] object-contain drop-shadow-2xl transition-all duration-700 ease-in-out hover:scale-105 mt-8"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 px-2 py-1 rounded-md shadow-sm border text-[10px] text-purple-700 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> LIVE
                </div>
            </div>
        </Card>
    );
}

