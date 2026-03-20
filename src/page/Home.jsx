import React, { useState } from "react"; // เพิ่ม useState
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // เพิ่มสำหรับ Navbar
import './Responsive.css';

const image = {
    backgroundImage: "assets/img/Home.png",
    button1: "assets/img/button1.png",
    button2: "assets/img/button2.png",
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

            {/* --- ส่วนเนื้อหาเดิมของ Home --- */}
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-100 px-4"
                style={{
                    backgroundImage: `url(${image.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <Link to="/Info" className="home-btn-info absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2
        backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-sm
        hover:scale-105 transition-all z-20">
                    <img src={image.button1} alt="" className="w-[40vw] md:w-[28vw] lg:w-[22vw] h-auto" />
                </Link>
                <Link to="/Model" className="home-btn-model absolute bottom-[15%] right-[10%]
       backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-sm 
        hover:scale-105 transition-all z-20">
                    <img src={image.button2} alt="" className="w-[40vw] md:w-[28vw] lg:w-[22vw] h-auto" />
                </Link>
            </div>
        </div>
    );
}

export default Home;