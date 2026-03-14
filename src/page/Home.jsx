import React, { useState } from "react"; // เพิ่ม useState
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // เพิ่มสำหรับ Navbar
import './Responsive.css';

const image = {
    backgroundImage: "/assets/img/Home.png",
}

const Home = () => {
    // สร้าง State สำหรับเปิด-ปิดเมนู และการเปิด-ปิดเสียง
    const [isOpen, setIsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // ฟังก์ชันสำหรับ Scroll (ถ้ามี Section ในหน้านี้)
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <div className="font-family-Regular min-h-screen w-full relative overflow-hidden">

            {/* --- ส่วน Navbar ที่เพิ่มเข้ามา --- */}
            <nav className="fixed top-8 right-8 z-[100] flex flex-row items-start gap-3">


                {/* กลุ่มปุ่มกดหลัก (เรียงแบบแนวนอน flex-row) */}
                <div className="flex flex-row gap-3">
                    {/* ปุ่มเปิด-ปิดเสียง */}
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="bg-[#5c3d20] text-[#f3edd7] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-2 border-[#f3edd7]/20"
                        title={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
                    >
                        {isMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.5a.75.75 0 0 1-.75-.75V9.75a.75.75 0 0 1 .75-.75h2.25Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.5a.75.75 0 0 1-.75-.75V9.75a.75.75 0 0 1 .75-.75h2.25Z" />
                            </svg>
                        )}
                    </button>

                    <Link
                        to="/"
                        className="bg-[#5c3d20] text-[#f3edd7] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-2 border-[#f3edd7]/20"
                        title="กลับหน้าหลัก"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </Link>
                </div>
            </nav>

            {/* --- ส่วนเนื้อหาเดิมของ Home --- */}
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-100 px-4"
                style={{
                    backgroundImage: `url(${image.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="text-center max-w-2xl bg-white/30 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-2xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-900 mb-6 md:mb-8">
                        🦴 โลกของซากดึกดำบรรพ์ 🦴
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-amber-800 mb-8 md:mb-12 leading-relaxed font-medium">
                        ยินดีต้อนรับสู่ที่อยู่อาศัยดิจิทัลของซากดึกดำบรรพ์และไดโนเสาร์ไทย มาสำรวจประวัติศาสตร์โลกยุคดึกดำบรรพ์กันเถอะ!
                    </p>

                    <div className="space-y-4 md:space-y-6">
                        <Link to="/Info"
                            className="block w-full md:w-auto md:inline-block px-8 md:px-12 py-4 md:py-5 bg-amber-800 text-white text-lg md:text-2xl rounded-full hover:bg-amber-700 transition-all hover:scale-105 shadow-lg font-semibold">
                            📖 เรียนรู้เกี่ยวกับซากดึกดำบรรพ์
                        </Link>

                        <Link to="/Model"
                            className="block w-full md:w-auto md:inline-block px-8 md:px-12 py-4 md:py-5 bg-blue-800 text-white text-lg md:text-2xl rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg font-semibold md:ml-4">
                            🦖 สำรวจไดโนเสาร์ไทย 3D
                        </Link>
                    </div>

                    <div className="mt-12 md:mt-16 text-sm md:text-base text-amber-700">
                        <p className="text-white drop-shadow-md">("ซากดึกดำบรรพ์คือกุญแจสู่การเข้าใจอดีตของโลก")</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;