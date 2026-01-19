"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import MatrixText from "@/components/ui/MatrixText";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Register Plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ToolDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const [matrixTrigger, setMatrixTrigger] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=250%", // Extended pin duration
                    scrub: 1,
                    pin: true,
                    onEnter: () => setMatrixTrigger(true),
                }
            });

            // Background dimming and focus
            tl.to(".bg-context", {
                opacity: 0.1, // Fade out background focus on phone
                scale: 1.1,
                duration: 2
            })
                .to(phoneRef.current, {
                    width: "90vw",
                    height: "80vh",
                    maxWidth: "1400px",
                    borderRadius: "24px",
                    borderWidth: "1px",
                    borderColor: "rgba(6, 199, 85, 0.5)",
                    yPercent: -10,
                    rotateX: 5, // 3D Tilt for Dashboard feel
                    boxShadow: "0 20px 100px -20px rgba(6, 199, 85, 0.3)",
                    ease: "power2.inOut",
                    duration: 2
                }, "<")
                .to(".phone-notch", { opacity: 0, y: -20, duration: 0.5 }, "<")
                .to(screenRef.current, { background: "rgba(10, 10, 10, 0.95)", duration: 2 }, "<")
                .to(".dashboard-content", { opacity: 1, duration: 1 }, "-=1");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">

            {/* Context Layer: Executive/Meeting */}
            <div className="bg-context absolute inset-0 z-0 opacity-40">
                <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                    alt="Business Executive Strategy Meeting"
                    fill
                    className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/50 to-transparent" />
            </div>

            <div className="absolute top-24 text-center z-10 mix-blend-difference">
                <h2 className="text-[#06C755] text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-bold">The Golden Key</h2>
                <p className="text-3xl md:text-5xl font-serif text-white leading-tight">
                    150万円以上の<br className="md:hidden" />『ビジネス設計脳』を、<br />
                    <span className="text-gray-300 text-lg md:text-2xl font-sans font-light mt-2 block">あなたのポケットに。</span>
                </p>
            </div>

            {/* Phone Frame -> Dashboard Frame */}
            <div
                ref={phoneRef}
                className="relative z-20 w-[300px] h-[600px] border-[8px] border-zinc-800 rounded-[48px] shadow-2xl bg-black overflow-hidden transform-gpu translate-y-20 perspective-1000"
            >
                {/* Notch */}
                <div className="phone-notch absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-zinc-900 rounded-b-2xl z-20 pointer-events-none border-b border-white/10" />

                {/* Screen Content */}
                <div ref={screenRef} className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-gray-900 to-black">

                    {/* Initial Chat UI */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                        {/* ... (Existing Chat UI Content - Keeping structural logic similar but refined) ... */}
                        <div className="w-full space-y-4">
                            {/* Bot Message */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">AI</div>
                                <div className="bg-zinc-800/80 p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs text-gray-300 max-w-[80%] backdrop-blur-md">
                                    あなたの強みを教えてください。
                                </div>
                            </div>
                            {/* User Message */}
                            <div className="flex gap-3 flex-row-reverse">
                                <div className="bg-[#06C755]/20 p-3 rounded-2xl rounded-tr-none border border-[#06C755]/30 text-xs text-[#06C755] max-w-[80%] backdrop-blur-md">
                                    <MatrixText
                                        text="Web Design x Marketing Strategy"
                                        trigger={matrixTrigger}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard State */}
                    <div className="dashboard-content absolute inset-0 p-8 md:p-12 opacity-0 flex flex-col gap-8">
                        <div className="flex justify-between items-center border-b border-white/10 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-[#06C755] animate-pulse"></div>
                                <span className="text-white font-mono tracking-widest text-sm">ARCHITECT_MODE</span>
                            </div>
                            <div className="text-[#06C755] font-bold text-xl">Generated 100%</div>
                        </div>

                        <div className="grid grid-cols-12 gap-6 h-full">
                            {/* Left Panel */}
                            <div className="col-span-12 md:col-span-8 glass-panel rounded-xl p-6 relative overflow-hidden flex flex-col justify-between group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#06C755]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div>
                                    <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Outcome Strategy</h4>
                                    <h3 className="text-2xl md:text-3xl text-white font-serif font-bold">High-Ticket Consultant</h3>
                                </div>
                                <div className="font-mono text-xs text-gray-400 space-y-2 mt-4 bg-black/40 p-4 rounded-lg border border-white/5">
                                    <p className="flex justify-between"><span>TARGET_AUDIENCE</span> <span className="text-white">SMB Owners</span></p>
                                    <p className="flex justify-between"><span>PRICE_POINT</span> <span className="text-white">¥300,000 - ¥500,000</span></p>
                                    <p className="flex justify-between"><span className="text-[#06C755]">CONVERSION_RATE</span> <span className="text-[#06C755]">Est. 3.5%</span></p>
                                </div>
                            </div>

                            {/* Right Panel */}
                            <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                                <div className="glass-panel flex-1 rounded-xl p-4 flex flex-col justify-center items-center bg-[#06C755]">
                                    <span className="text-black font-bold text-xs uppercase">Est. Revenue</span>
                                    <span className="text-black text-4xl font-bold font-mono">¥2.9M</span>
                                </div>
                                <div className="glass-panel flex-1 rounded-xl p-4 flex flex-col justify-center items-center border-white/20">
                                    <span className="text-gray-500 text-xs uppercase">Roadmap Steps</span>
                                    <span className="text-white text-4xl font-light">15</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
