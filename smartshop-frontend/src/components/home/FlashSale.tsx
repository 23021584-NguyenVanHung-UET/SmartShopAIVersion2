"use client";

import { useEffect, useState } from "react";

export default function FlashSale() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 2,
        minutes: 30,
        seconds: 45
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                    }
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeBox = (label: string, value: number) => (
        <div className="flex flex-col items-center justify-center rounded-xl bg-foreground text-background px-4 py-3 min-w-[70px]">
            <span className="text-2xl font-semibold tabular-nums">{value.toString().padStart(2, "0")}</span>
            <span className="text-xs uppercase tracking-wide text-background/70">{label}</span>
        </div>
    );

    return (
        <div className="max-w-screen-2xl mx-auto mt-10 px-6">
            <div className="rounded-3xl border border-border bg-card px-6 py-6 shadow-sm flex items-center justify-between gap-6 flex-col md:flex-row">
                <div className="space-y-2 text-center md:text-left">
                    <p className="text-xs uppercase tracking-[0.2em] text-destructive">Flash sale</p>
                    <h2 className="text-2xl font-semibold text-foreground">Giảm sốc trong hôm nay</h2>
                    <p className="text-sm text-muted-foreground">
                        Săn deal nổi bật, số lượng có hạn. Kết thúc sau:
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {timeBox("Giờ", timeLeft.hours)}
                    {timeBox("Phút", timeLeft.minutes)}
                    {timeBox("Giây", timeLeft.seconds)}
                </div>
            </div>
        </div>
    );
}
