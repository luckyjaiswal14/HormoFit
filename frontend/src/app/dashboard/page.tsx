import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TwinAvatar } from "@/components/TwinAvatar";
import { Activity, Beaker, Brain, Target } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Health Dashboard</h1>
                    <p className="text-slate-500">Your AI-powered digital twin is active and learning.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <TwinAvatar twinData={{ hasAvatar: true, inflammationIndex: 2, stressScore: 3, riskAlert: "Low" }} />
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-100 shadow-sm">
                        <CardHeader className="flex pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Hormonal Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">Optimal</div>
                            <p className="text-xs text-green-600 font-medium flex gap-1 mt-1 items-center"><Activity className="w-3 h-3" /> +2% improvement</p>
                        </CardContent>
                    </Card>

                    <Card className="border-blue-100 shadow-sm">
                        <CardHeader className="flex pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Insulin Sensitivity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">Good</div>
                            <p className="text-xs text-blue-600 font-medium flex gap-1 mt-1 items-center"><Target className="w-3 h-3" /> Target reached</p>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2 border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><Beaker className="w-5 h-5 text-purple-600" /> Recent Biomarkers</CardTitle>
                            <CardDescription>Simulated biomarker data derived from recent logs.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-slate-600 font-medium">Testosterone (Est.)</span>
                                    <span className="font-bold text-green-600">45 ng/dL</span>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-slate-600 font-medium">Cortisol</span>
                                    <span className="font-bold text-amber-500">Elevated</span>
                                </div>
                                <div className="flex items-center justify-between pb-2">
                                    <span className="text-slate-600 font-medium">Inflammation (hs-CRP)</span>
                                    <span className="font-bold text-green-600">1.2 mg/L</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
