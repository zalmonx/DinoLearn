import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f3edd7] z-[9999]">
            <div className="relative">
                {/* Outer pulse effect */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl"
                />

                {/* Bouncing Dinosaur Icon */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative z-10"
                >
                    <img
                        src={`${import.meta.env.BASE_URL}assets/logo.png`}
                        alt="Loading Dinosaur"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                    />
                </motion.div>
            </div>

            {/* Loading Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center"
            >
                <h2 className="text-[#5c3d20] text-2xl md:text-3xl font-bold mb-2">กำลังโหลด</h2>
                <div className="flex justify-center gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="w-2 h-2 bg-[#5c3d20] rounded-full"
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Loading;