import React, { useState, useEffect } from 'react';

const RotationFix = () => {
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // 1. เช็คว่าแนวตั้งหรือไม่ (ความสูง > ความกว้าง)
            const isPortraitOrientation = window.innerHeight > window.innerWidth;

            // 2. เช็คว่าเป็น Mobile หรือ Tablet (รวม iPad Pro)
            // ใช้การเช็ค 2 อย่างร่วมกัน:
            // a) ความกว้างหน้าจอน้อยกว่าหรือเท่ากับ 1024px (ครอบคลุม iPad Pro 12.9" ในแนวตั้ง)
            // b) ตรวจสอบจาก User Agent ว่ามีคำว่า iPad, iPhone, Android
            // หรือตรวจจับ iPad Pro (Safari desktop version) ที่รองรับ Touch
            const isWidthMobileOrTablet = window.innerWidth <= 1024;
            const isUserAgentMobileTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isMacTouch = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1; // iPad Pro ที่ขอ Desktop Website

            const isMobileDevice = isWidthMobileOrTablet || isUserAgentMobileTablet || isMacTouch;

            if (isMobileDevice && isPortraitOrientation) {
                setIsPortrait(true);
            } else {
                setIsPortrait(false);
            }
        };

        handleResize(); // ตรวจสอบตอนโหลดครั้งแรก
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    if (!isPortrait) return null;

    return (
        <>
            <style>
                {`
          @keyframes rotatePhone {
            0%, 25% { transform: rotate(0deg); }
            50%, 75% { transform: rotate(-90deg); }
            100% { transform: rotate(0deg); }
          }
          .animate-rotate-phone {
            animation: rotatePhone 3s ease-in-out infinite;
          }
        `}
            </style>
            <div className="fixed font-family-Regular inset-0 z-[99999] bg-[#422c17] flex flex-col items-center justify-center p-8 text-center" style={{ backgroundImage: 'radial-gradient(circle, #5c3d20 0%, #422c17 100%)' }}>

                {/* ไอคอนโทรศัพท์ที่หมุนได้ */}
                <div className="relative flex items-center justify-center w-32 h-32 mb-8 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#fde047"
                        className="w-24 h-24 absolute animate-rotate-phone shadow-2xl"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#f3edd7" className="w-10 h-10 absolute -right-2 -top-2 animate-bounce">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>

                <h2 className="text-3xl md:text-4xl text-[#f3edd7]  mb-4 font-Regular drop-shadow-lg">
                    กรุณาหมุนหน้าจอ
                </h2>
                <p className="text-lg md:text-xl text-[#f3edd7]/90 font-Regular leading-relaxed max-w-sm">
                    เว็บไซต์นี้ออกแบบมาเพื่อการใช้งานใน <span className="text-[#fde047]  text-xl">แนวนอน</span> <br />
                    โปรดหมุนโทรศัพท์หรือแท็บเล็ตของคุณเพื่อประสบการณ์ที่ดีที่สุด
                </p>

            </div>
        </>
    );
};

export default RotationFix;
