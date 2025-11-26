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

    return (
        <div className="max-w-7xl mx-auto mt-10 px-6">
            <h2 className="text-xl font-bold text-red-600 flex items-center gap-3">
                🔥 FLASH SALE
            </h2>

            <div className="flex items-center gap-3 mt-2 text-white">
                <span className="bg-red-600 px-3 py-1 rounded-lg">{timeLeft.hours}</span>
                :
                <span className="bg-red-600 px-3 py-1 rounded-lg">{timeLeft.minutes}</span>
                :
                <span className="bg-red-600 px-3 py-1 rounded-lg">{timeLeft.seconds}</span>
            </div>
        </div>
    );
}
