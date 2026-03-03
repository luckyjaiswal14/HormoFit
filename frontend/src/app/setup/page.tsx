"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

export default function Setup() {
    const [goal, setGoal] = useState("");

    const handleSave = () => {
        // Save to local state or backend
        alert("Goal Saved! Twin Engine calibration updated.");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center rounded-xl bg-purple-50 p-6 border border-purple-100">
                <h1 className="text-2xl font-bold text-purple-900 flex items-center justify-center gap-2"><Target className="w-6 h-6" /> Simulation Goals</h1>
                <p className="text-purple-700/80 mt-2">What do you want your AI Twin to optimize for?</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Set Principal Goal</CardTitle>
                    <CardDescription>Select the primary health outcome you want to simulate and track.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Primary Focus</label>
                        <select
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-900 bg-white"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                        >
                            <option value="">Select a goal...</option>
                            <option value="fertility">Optimize Fertility</option>
                            <option value="weight">Manage Weight & Insulin</option>
                            <option value="energy">Reduce Fatigue & Brain Fog</option>
                            <option value="skin">Clear Acne & Skin Health</option>
                            <option value="hair">Reduce Hair Loss / Hirsutism</option>
                        </select>
                    </div>
                    <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
                        Set Goal Parameter
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
