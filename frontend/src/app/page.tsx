import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          The PCOD Operating System
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          A living AI system that grows with you. Predict risk, simulate outcomes with a 3D Digital Twin, and continuously adapt your lifestyle.
        </p>
        <div className="flex gap-4 items-center justify-center pt-8">
          <Link href="/signup">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg rounded-full px-8 h-12 text-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 rounded-full px-8 h-12 text-lg shadow-sm">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
