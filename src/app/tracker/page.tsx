"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyPlus, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Tracker() {
    const [meal, setMeal] = useState("");
    const [cycleDay, setCycleDay] = useState("");
    const [stress, setStress] = useState("5");
    const [sleep, setSleep] = useState("7");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSimulate = async () => {
        setLoading(true);
        try {
            // Proxy intercepts this and sends to backend API
            const res = await fetch("/api/twin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ meal, cycleDay: Number(cycleDay), stress: Number(stress), sleep: Number(sleep) })
            });

            const data = await res.json();
            if (res.ok) {
                toast({
                    title: "Twin Analysis Complete",
                    description: `Inflammation: ${data.analysis.inflammationRisk} | Hormonal Impact: ${data.analysis.hormonalImpact}`,
                });
            } else {
                throw new Error(data.error);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({ title: "Error", description: err.message, variant: "destructive" });
            } else {
                toast({ title: "Error", description: "An unknown error occurred", variant: "destructive" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center rounded-xl bg-purple-50 p-6 border border-purple-100">
                <h1 className="text-2xl font-bold text-purple-900 flex items-center justify-center gap-2"><CopyPlus className="w-6 h-6" /> Daily Tracker</h1>
                <p className="text-purple-700/80 mt-2">Log your daily metrics to train your digital twin.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Log Metrics</CardTitle>
                    <CardDescription>Input what you ate and how you feel.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Meal Summary</label>
                        <textarea
                            className="w-full flex min-h-[80px] rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-900"
                            placeholder="e.g., Oatmeal for breakfast, grilled salmon for lunch"
                            value={meal}
                            onChange={(e) => setMeal(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Cycle Day</label>
                            <input
                                type="number"
                                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-900"
                                value={cycleDay}
                                onChange={(e) => setCycleDay(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stress (1-10)</label>
                            <input
                                type="number"
                                min="1" max="10"
                                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-900"
                                value={stress}
                                onChange={(e) => setStress(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Sleep (Hours)</label>
                            <input
                                type="number"
                                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-900"
                                value={sleep}
                                onChange={(e) => setSleep(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button onClick={handleSimulate} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
                        {loading ? "Simulating Constraints..." : <><Sparkles className="w-4 h-4 mr-2" /> Simulate Twin Action</>}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
