import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon, MessageSquare, BookOpen } from "lucide-react";

export default function Community() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2"><UsersIcon className="w-8 h-8 text-purple-600" /> Knowledge & Community</h1>
                    <p className="text-slate-500 mt-1">Anonymized insights aggregated from digital twins matching your profile.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500" /> Trending Supplements</CardTitle>
                        <CardDescription>What women with similar cycle lengths find effective.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center text-sm">
                                <span className="font-medium">Inositol</span>
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">82% Success</span>
                            </li>
                            <li className="flex justify-between items-center text-sm">
                                <span className="font-medium">Magnesium Glycinate</span>
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">64% Success</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><MessageSquare className="w-5 h-5 text-pink-500" /> Recent Discussions</CardTitle>
                        <CardDescription>Join conversations dynamically categorized by your AI Twin.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="border-l-2 border-pink-200 pl-3">
                                <h4 className="text-sm font-semibold text-slate-900">Managing luteal phase fatigue</h4>
                                <p className="text-xs text-slate-500 mt-1">24 replies • 3 hours ago</p>
                            </div>
                            <div className="border-l-2 border-pink-200 pl-3">
                                <h4 className="text-sm font-semibold text-slate-900">Seed cycling recipes for fall</h4>
                                <p className="text-xs text-slate-500 mt-1">12 replies • 5 hours ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
