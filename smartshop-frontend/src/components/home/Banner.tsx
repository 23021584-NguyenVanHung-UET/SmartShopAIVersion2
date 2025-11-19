"use client";

import { motion } from "framer-motion";

export default function Banner() {
    return (
        <section className="max-w-7xl mx-auto px-6 mt-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-56 md:h-72 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold"
            >
                Mega Sale 🔥 Giảm đến 70%!
            </motion.div>
        </section>
    );
}
