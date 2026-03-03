"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 1000);
    };

    return (
        <div className="max-w-md mx-auto pt-10">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-slate-900">Sign In</CardTitle>
                    <CardDescription>Access your HormoFit Twin AI.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <input type="email" required className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-900" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <input type="password" required className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-900" />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
                            {loading ? "Authenticating..." : "Login to Dashboard"}
                        </Button>
                        <div className="text-center text-sm text-slate-500 pt-2">
                            Don't have an account? <Link href="/signup" className="text-purple-600 font-semibold hover:underline">Sign up</Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
