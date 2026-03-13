import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- Assets Object (เรียกใช้จาก Public/Assets) ---
const assets = {
  //เสียง
  bgmusic: "/assets/sound/Stardew Valley OST - In The Deep Woods.mp3",
  // ภาพพื้นหลังและองค์ประกอบหลัก
  amber: "/assets/img/amber.png",
  amberbutterfly: "/assets/img/amberbutterfly.png",
  BGpage2: "/assets/img/BGpage2.jpg",
  BGpage3: "/assets/img/BGpage3.jpg",
  BGtype: "/assets/img/BGtype1.png",
  mountainlayer4: "/assets/img/mountainlayer4.png",
  mountainlayer3: "/assets/img/mountainlayer3.png",
  grasslayer2: "/assets/img/grasslayer2.png",
  grasslayer1: "/assets/img/grasslayer1.png",
  fossil1: '/assets/img/fossil1.png',
  fossil2: '/assets/img/fossil2.png',
  fossil3: '/assets/img/fossil3.png',
  dinofullskel: '/assets/img/dinofullskel.png',
  dinofullskelstage2: '/assets/img/dinofullskelstage2.png',
  dinofullskelstage3: '/assets/img/dinofullskelstage3.png',
  dinomug: '/assets/img/dinomug.png',
  frame31: '/assets/img/Frame31.png',
  frame32: '/assets/img/Frame38.png',
  frame33: '/assets/img/Frame39.png',
  frame34: '/assets/img/Frame40.png',
  frame35: '/assets/img/Frame41.png',
  fossilshowing: '/assets/img/fossilshowing.png',
  fossilepage3_1: '/assets/img/fossilepage3_1.png',
  fossilepage3_2: '/assets/img/fossilepage3_2.png',
  fossilepage3_3: '/assets/img/fossilepage3_3.png',
  fossilepage3_4: '/assets/img/fossilepage3_4.png',
  bird: '/assets/img/bird.png',
  rain: '/assets/img/rain.png',
  // ส่วนที่เพิ่มใหม่สำหรับ Puzzle
  fossilPart1: "/assets/img/fossilepage3_3.png",
  fossilPart2: "/assets/img/fossilepage3_4.png",
  completedFossil: "/assets/img/Frame41.png",
};

// --- Sub-Component: PuzzleSection ---
function PuzzleSection({ onComplete }) {
  // เก็บสถานะว่าคลิกชิ้นไหนไปแล้วบ้าง
  const [part1Collected, setPart1Collected] = useState(false);
  const [part2Collected, setPart2Collected] = useState(false);
  const [isMerged, setIsMerged] = useState(false);
  
  const targetRef = useRef(null);

  // ตรวจสอบเมื่อสะสมครบทุกชิ้น
  useEffect(() => {
    if (part1Collected && part2Collected) {
      // หน่วงเวลานิดนึงให้ชิ้นสุดท้ายวิ่งเข้าวงกลมก่อน
      const timer = setTimeout(() => setIsMerged(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [part1Collected, part2Collected]);

  

  return (
    <section id="puzzle-game" className="relative h-screen flex items-center justify-center bg-[#422c17] overflow-hidden">
      <div className="absolute top-12 md:top-20 text-center z-10 px-6">
        <h2 className="text-[#f3edd7] text-3xl md:text-5xl mb-2 font-Regular text-shadow-lg">คืนชีพซากดึกดำบรรพ์!</h2>
        <p className="text-[#f3edd7]/60 font-Regular italic">
          {part1Collected && part2Collected ? "กำลังรวมร่าง..." : "แตะที่ชิ้นส่วนกระดูกเพื่อนำมารวมกัน"}
        </p>
      </div>

      {!isMerged ? (
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* วงกลมเป้าหมาย (Drop Zone) */}
          <motion.div 
            ref={targetRef}
            animate={{ 
              scale: (part1Collected || part2Collected) ? [1, 1.05, 1] : 1,
              borderColor: (part1Collected && part2Collected) ? "#fde047" : "#f3edd7",
              boxShadow: (part1Collected || part2Collected) ? "0 0 30px rgba(253, 224, 71, 0.3)" : "none"
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-64 h-64 md:w-80 md:h-80 border-4 border-dashed rounded-full flex flex-col items-center justify-center bg-[#f3edd7]/5 z-0"
          >
            <span className="text-[#f3edd7]/40 text-4xl mb-2">
              {part1Collected && part2Collected ? "⚡" : "🦴"}
            </span>
            <p className="text-[#f3edd7]/30 font-bold uppercase tracking-widest text-center">
               สะสมได้: { (part1Collected?1:0) + (part2Collected?1:0) } / 2
            </p>
          </motion.div>

          {/* ชิ้นส่วนที่ 1: หัว */}
          <motion.img
            src={assets.fossilPart1}
            // ถ้าคลิกแล้ว ให้วิ่งไปที่กลางวงกลม (x:0, y:0 ของ container) และหายตัวไป
            animate={part1Collected 
              ? { x: 0, y: 0, scale: 0, opacity: 0, rotate: 360 } 
              : { x: 0, y: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.8, ease: "backIn" }}
            onClick={() => setPart1Collected(true)}
            className={`w-40 md:w-56 absolute left-[15%] top-[30%] cursor-pointer hover:scale-110 transition-transform drop-shadow-2xl z-20 
              ${part1Collected ? 'pointer-events-none' : ''}`}
          />

          {/* ชิ้นส่วนที่ 2: หาง/ตัว */}
          <motion.img
            src={assets.fossilPart2}
            animate={part2Collected 
              ? { x: 0, y: 0, scale: 0, opacity: 0, rotate: -360 } 
              : { x: 0, y: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.8, ease: "backIn" }}
            onClick={() => setPart2Collected(true)}
            className={`w-40 md:w-56 absolute right-[15%] bottom-[20%] cursor-pointer hover:scale-110 transition-transform drop-shadow-2xl z-20 
              ${part2Collected ? 'pointer-events-none' : ''}`}
          />

          {/* คำแนะนำเล็กๆ */}
          {!part1Collected && !part2Collected && (
            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10 text-[#f3edd7]/40 text-sm font-Regular"
            >
              [ ลองแตะที่ชิ้นส่วนกระดูกดูสิ ]
            </motion.p>
          )}
        </div>
      ) : (
        /* เมื่อกดครบแล้ว จะปรากฏ element ที่ซ่อนไว้ (completedFossil) */
        <motion.div 
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative">
            
            <img 
              src={assets.completedFossil} 
              className="w-80 md:w-[600px] relative z-10 " 
              alt="Completed Fossil"
            />
          </div>
          <h2 className="text-[#f3edd7] text-5xl md:text-8xl  font-Regular mt-4">สำเร็จ!</h2>
          <p className="text-[#f3edd7]/80 text-xl">คืนชีพสำเร็จแล้ว!</p>
        </motion.div>
      )}
    </section>
  );
}

// --- Main Component: Info ---
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedFossil, setSelectedFossil] = useState(null);
  const [showFossilInfo, setShowFossilInfo] = useState(false);
  
  const containerRef = useRef(null);
  const butterflyRef = useRef(null);
  const infoBoxRef = useRef(null);
  const pulseRef = useRef(null);
  
  //Music-Component
  const [isMuted, setIsMuted] = useState(false); // เพิ่ม State สำหรับปิดเสียง
  
  const audioRef = useRef(new Audio(assets.bgmusic));

  // จัดการการเล่น/หยุดเพลง
  useEffect(() => {
    const bgm = audioRef.current;
    bgm.loop = true;
    bgm.volume = 0.3;

    if (!isMuted) {
      bgm.play().catch(() => console.log("Waiting for user interaction..."));
    } else {
      bgm.pause();
    }

    return () => bgm.pause();
  }, [isMuted]); // ทำงานใหม่ทุกครั้งที่ค่า isMuted เปลี่ยน
  
  // GSAP Animations
 useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    // 1. สร้าง Pulse Animation รอไว้
    pulseRef.current = gsap.to(".fossilshowing", {
      scale: 1.05,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: true 
    });

    // 2. อนิเมชั่นเด้งเข้ามาจากทางขวา
    gsap.from(".fossilshowing", {
      x: 800,
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#found-section",
        start: "top 60%",
        toggleActions: "play none none reverse",
        onEnter: () => pulseRef.current?.play(),
        onLeaveBack: () => {
          pulseRef.current?.pause();
          gsap.set(".fossilshowing", { scale: 1 });
        }
      },
      onComplete: () => pulseRef.current?.play()
    });

    // 3. Hero Parallax
    gsap.to(".mountain-4", { y: 150, scrollTrigger: { trigger: ".hero-section", scrub: true } });
    gsap.to(".mountain-3", { y: 80, scrollTrigger: { trigger: ".hero-section", scrub: true } });

    // 4. Fossil Process Timeline (อัปเกรด Stage และเอฟเฟกต์สั่น)
    const processTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".fossil-drop-section",
        start: "top top",
        end: "+=6000", // เพิ่มระยะเพื่อให้เห็นการเปลี่ยน Stage ชัดขึ้น
        scrub: 1.5,
        pin: true,
      }
    });

    processTL
      // เริ่มต้นข้อความชุดที่ 1
      .to(".process-text-1", { opacity: 1, duration: 1 })
      
      // --- Stage 1 -> 2 ---
      // สั่นเบาๆ เหมือนมีการทับถม
      .to(".dino-container", { x: 5, yoyo: true, repeat: 5, duration: 0.1 }, "+=0.2")
      // Stage 1 ค่อยๆ จางหายไปพร้อมปรับฟิลเตอร์
      .to(".dinofull-1", { opacity: 0, filter: "brightness(0.8) sepia(0.5)", duration: 1 }, "-=0.5")
      // Stage 2 ปรากฏขึ้นมา
      .to(".dinofull-2", { opacity: 1, duration: 1 }, "-=1")
      
      // --- Stage 2 -> 3 ---
      // สั่นแรงขึ้นเล็กน้อย
      .to(".dino-container", { x: -8, yoyo: true, repeat: 7, duration: 0.1 }, "+=0.2")
      // Stage 2 หายไปพร้อมปรับฟิลเตอร์ให้ดูเหมือนหิน
      .to(".dinofull-2", { opacity: 0,  duration: 1 }, "-=0.7")
      // Stage 3 ปรากฏขึ้นมาพร้อม Contrast ที่จัดขึ้น
      .to(".dinofull-3", { opacity: 1, duration: 1 }, "-=1")

      // จบข้อความชุดที่ 1
      .to(".process-text-1", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
      .to({}, { duration: 1 }) // เว้นจังหวะว่างเล็กน้อย
      
      // ข้อความชุดที่ 2 และการหล่นของเศษฟอสซิล
      .to(".process-text-2", { opacity: 1, duration: 1 })
      .from(".fossil-1", { y: -800, rotation: -40, opacity: 0, duration: 1.5 }, "-=0.5")
      .from(".fossil-2", { y: -800, rotation: 30, opacity: 0, duration: 1.5 }, "-=1.2")
      .from(".fossil-3", { y: -800, rotation: -20, opacity: 0, duration: 1.5 }, "-=1.2")
      .from(".fossil-4", { y: -800, rotation: -20, opacity: 0, duration: 1.5 }, "-=1.2")
      
      // ข้อความชุดที่ 3 และเอฟเฟกต์ Blur พื้นหลัง
      .to(".process-text-2", { opacity: 0, y: -50, duration: 1 }, "+=2") 
      .to(".fossil-container img", { filter: "blur(4px)", opacity: 0.3, duration: 1 })
      .to(".process-text-3", { opacity: 1, y: 0, duration: 1.5 }, "-=0.5");

    // 5. Intro Animation
    const introTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#found-intro",
        start: "top top",
        end: "+=4000",
        scrub: 1.5,
        pin: true,
      }
    });

    introTL
      .from(".intro-text", { opacity: 0, y: 30, duration: 1 })
      .to(".bird-fly", { 
        x: -1500, 
        y: -1000, 
        rotation: -20, 
        scale: 0.5,
        duration: 3 
      }, "+=0.5");

    // 6. Text Animate for Found-4
    gsap.from(".text-animate", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: "#found-4",
        start: "top 70%",
      }
    });
      
  }, containerRef);

  return () => ctx.revert();
}, []);

  const handleButterflyHover = (isEntering) => {
    if (!isClicked) {
      gsap.to(butterflyRef.current, { opacity: isEntering ? 1 : 0, duration: 0.3 });
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const fossilData = [
    { img: assets.fossil1, title: "ร่องรอยสัตว์ดึกดำบรรพ์", detail: "รอยตีน รอยคลาน หรือรูที่อยู่อาศัยที่ถูกประทับไว้ในตะกอน" },
    { img: assets.fossil2, title: "ซากสัตว์ดึกดำบรรพ์", detail: "โครงร่างแข็ง เช่น กระดูก ฟัน หรือเปลือกหอย" },
    { img: assets.fossil3, title: "ซากดึกดำบรรพ์พืช", detail: "ร่องรอยของใบไม้ ลำต้น หรือเนื้อไม้ที่กลายเป็นหิน" }
  ];

  return (
    <div ref={containerRef} className="font-family-Regular bg-[#f3edd7] w-full overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-8 right-8 z-[100] flex flex-row items-start gap-3">
        
        {/* ส่วนของเมนู (แสดงผลแบบแนวตั้ง flex-col) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-2 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#5c3d20]/10 shadow-xl"
            >
              <button onClick={() => scrollToSection('intro')} className="text-[#5c3d20] hover:font-bold text-right px-4 py-1 whitespace-nowrap">ซากดึกดำบรรพ์คืออะไร?</button>
              <button onClick={() => scrollToSection('process')} className="text-[#5c3d20] hover:font-bold text-right px-4 py-1 whitespace-nowrap border-t border-[#5c3d20]/5 pt-2">การเกิดฟอสซิล</button>
              <button onClick={() => scrollToSection('puzzle-game')} className="text-[#5c3d20] hover:font-bold text-right px-4 py-1 whitespace-nowrap border-t border-[#5c3d20]/5 pt-2">มินิเกมคืนชีพ</button>
              <button onClick={() => scrollToSection('types')} className="text-[#5c3d20] hover:font-bold text-right px-4 py-1 whitespace-nowrap border-t border-[#5c3d20]/5 pt-2">ประเภทต่างๆ</button>
            </motion.div>
          )}
        </AnimatePresence>

          {/* ปุ่มเมนู */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="bg-[#5c3d20] text-[#f3edd7] w-20 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-2 border-[#f3edd7]/20"
          >
            {isOpen ? 'ปิดเมนู' : 'เมนู'}
          </button>

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
                <path strokeLinecap="round" strokeLinejoin="round"
                 d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.5a.75.75 0 0 1-.75-.75V9.75a.75.75 0 0 1 .75-.75h2.25Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" 
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.5a.75.75 0 0 1-.75-.75V9.75a.75.75 0 0 1 .75-.75h2.25Z" />
              </svg>
            )}
          </button>
          <Link
            to="/" // ใส่พาร์ทของหน้าที่จะไป เช่น "/" คือหน้าแรก หรือ "/main"
            className="bg-[#5c3d20] text-[#f3edd7] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-2 border-[#f3edd7]/20"
            title="กลับหน้าหลัก"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" 
              />
            </svg>
          </Link>

        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="text-center z-50 px-6">
          <h1 className="text-6xl md:text-8xl text-[#5c3d20]">โลกของซากดึกดำบรรพ์ !</h1>
          <p className="text-xl md:text-2xl text-[#5c3d20]/80 mt-6 max-w-2xl mx-auto">มาร่วมเดินทางย้อนเวลากลับไปสำรวจโลกยุคดึกดำบรรพ์กันเถอะ!</p>
        </div>
        <img src={assets.mountainlayer4} className="mountain-4 absolute bottom-0 w-full h-auto z-10" />
        <img src={assets.mountainlayer3} className="mountain-3 absolute bottom-0 w-full h-auto z-20" />
        <img src={assets.grasslayer2} className="absolute bottom-0 w-full z-30" />
        <img src={assets.grasslayer1} className="absolute bottom-0 w-full z-40" />
        <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50">
           <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[30px] 
          h-[50px] border-2 border-[#5c3d20] rounded-full cursor-pointer z-50 before:absolute before:top-[8px] before:left-1/2 
          before:w-[6px] before:h-[6px] before:bg-[#5c3d20] before:rounded-full before:animate-scroll-down"></div>
           <p className="text-[#5c3d20] text-sm font-bold">เลื่อนลงเพื่อสำรวจ</p>
        </div>
      </section>

      {/* 2. Amber Section */}
      <section id="intro" className="relative h-screen flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: `url(${assets.BGpage2})`, backgroundSize: '100% 100%' }}>
        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl gap-8">
          <div className="text-[#f3edd7]">
            <h2 className="text-4xl md:text-6xl mb-4">ซากดึกดำบรรพ์คืออะไร ?</h2>
            <p className="text-lg md:text-xl opacity-90">ซากหรือร่องรอยของสิ่งมีชีวิตในอดีตกาลที่ถูกเก็บรักษาไว้ตามธรรมชาติ</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div 
              className="relative w-48 h-48 md:w-64 md:h-64 cursor-pointer"
              onMouseEnter={() => handleButterflyHover(true)}
              onMouseLeave={() => handleButterflyHover(false)}
              onClick={() => setIsClicked(!isClicked)}
            >
              <img src={assets.amber} className="absolute inset-0 w-full h-full object-contain" />
              <img ref={butterflyRef} src={assets.amberbutterfly} className="absolute inset-0 w-full h-full object-contain z-20 opacity-0" />
            </div>

            {isClicked && (
              <motion.div 
                ref={infoBoxRef}
                className="bg-[#f3edd7] p-6 rounded-2xl border-l-8 border-amber-600 max-w-sm shadow-2xl text-[#5c3d20] text-left"
              >
                <h3 className="text-2xl font-bold mb-2">ผีเสื้อในอำพัน</h3>
                <p className="leading-relaxed text-sm md:text-base">เกิดจากยางไม้ที่ไหลมาทับแมลงและแข็งตัวเป็นฟอสซิล คงสภาพไว้ได้อย่างสมบูรณ์นานนับล้านปี</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsClicked(false); }}
                  className="mt-4 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100"
                >
                  [ ปิดคำอธิบาย ]
                </button>
              </motion.div>
            )}
          </div>
          {!isClicked && <p className="text-[#f3edd7]/60 animate-bounce">ลองแตะที่อำพันสิ!</p>}
        </div>
      </section>

      {/* 3. Fossil Process */}
      <section id="process" className="fossil-drop-section relative h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${assets.BGpage3})`, backgroundSize: '100% 100%' }}>
        
      <div className="process-text-1 absolute top-[20%] left-0 w-full text-center text-[#f3edd7] z-50 px-6 opacity-0">
        {/* เพิ่ม z-30 และ relative เพื่อให้ข้อความอยู่หน้าสุดเสมอ */}
        <h2 className="relative z-30 text-4xl md:text-6xl mb-4 font-Regular">เมื่อสิ่งมีชีวิตตายลงในอดีต</h2>
        <p className="relative z-30 text-lg md:text-2xl opacity-70 font-Regular">ซากของสิ่งมีชีวิตที่ตายแล้วจะถูกฝังกลบในดินหรือตะกอน </p>
        
        {/* รูปภาพที่มี z-index ต่ำกว่าข้อความ */}
       <img src={assets.dinofullskel} 
        className="absolute left-[50%] -translate-x-1/2 top-[40%] 
        rotate-0 h-auto w-[300px] md:w-[600px] lg:w-[1200px] z-20" />
        <img src={assets.dinofullskelstage2} 
        className="dinofull-2 opacity-0 absolute left-[50%] -translate-x-1/2 top-[40%] 
        rotate-0 h-auto w-[300px] md:w-[600px] lg:w-[1200px] z-20" />

        <img src={assets.dinofullskelstage3} 
        className="dinofull-3 opacity-0 absolute left-[50%] -translate-x-1/2 top-[40%] 
        rotate-0 h-auto w-[300px] md:w-[600px] lg:w-[1200px] z-20" />


      
      </div>

        <div className="process-text-2 absolute top-[40%] left-0 w-full text-center text-[#f3edd7] z-50 px-6 opacity-0">
          <h2 className="text-4xl md:text-6xl  mb-4">เกิดเป็นการทับถมของกาลเวลา</h2>
          <p className="text-lg md:text-2xl opacity-70">เมื่อเวลาผ่านไป ดิน และตะกอนจะค่อยๆ ฝังกลบซากเหล่านั้นอย่างช้าๆ</p>
        </div>

        <div className="fossil-container relative h-full flex items-center justify-center">
          <img src={assets.fossilepage3_1} className="fossil-1 absolute top-[0] md:top-[5%] left-[10%] w-48 md:w-80" />
          <img src={assets.fossilepage3_2} className="fossil-2 absolute top-[50%] right-[10%] w-56 md:w-96" />
          <img src={assets.fossilepage3_3} className="fossil-3 absolute top-[70%] left-[20%] w-40 md:w-72" />
          <img src={assets.fossilepage3_4} className="fossil-4 absolute top-[20%] md:top-[5%] right-[15%] w-32 md:w-80 rotate-15" />
        </div>

        <div className="process-text-3 absolute top-[50%] left-0 w-full text-center text-[#f3edd7] z-50 px-6 opacity-0">
          <p className="text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed italic">
            "แร่ธาตุต่างแทรกซึมเข้าแทนที่กระดูกที่แข็งตัว <br className="hidden md:block"/>
            จนกลายเป็นหินที่มีรูปร่างคล้ายกระดูก"
          </p>
        </div>
      </section>
      
            {/* --- แทรก Puzzle Section ตรงนี้ --- */}
      <PuzzleSection onComplete={() => scrollToSection('types')} />

         {/* 5. Type Selector */}
      <section id="types" className="relative min-h-screen py-20 bg-stone-100 flex flex-col items-center"
      style={{ backgroundImage: `url(${assets.BGtype})`, backgroundSize: '100% 100%' }}>
      
      <h2 className="text-5xl text-[#f3edd7] mb-12 mt-3 font-Regular">ประเภทของซากดึกดำบรรพ์</h2>
      <p className="text-3xl text-[#f3edd7] mb-12 mt-3 font-Regular"> คลิกที่ซากดึกดำบรรพ์เพื่อทำความรู้จัก </p>

      {/* เพิ่มคลาส mt-[20vh] เพื่อกำหนดระยะห่างจากขอบบนเฉพาะจุด */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 w-full max-w-7xl mt-[20vh]">
        {fossilData.map((f, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedFossil(f)}
            className="bg-[#f3edd7] p-8 rounded-3xl shadow-xl cursor-pointer text-center group transition-colors hover:bg-[#5c3d20]"
          >
            <img src={f.img} className="h-48 mx-auto object-contain mb-4" />
            <h3 className="text-xl font-bold group-hover:text-white transition-colors font-Regular">{f.title}</h3>
          </motion.div>
        ))}
      </div>

    </section>

      {/* Modal Content */}
      <AnimatePresence>
        {selectedFossil && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedFossil(null)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.8, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="relative bg-[#f3edd7] w-full max-w-xl rounded-[3rem] p-10 shadow-2xl z-10 text-center border-4 border-[#5c3d20]">
              <img src={selectedFossil.img} className="w-48 mx-auto mb-6 drop-shadow-2xl" />
              <h3 className="text-3xl font-bold text-[#5c3d20] mb-4">{selectedFossil.title}</h3>
              <p className="text-[#5c3d20]/80 text-lg leading-relaxed">{selectedFossil.detail}</p>
              <button onClick={() => setSelectedFossil(null)} className="mt-8 bg-[#5c3d20] text-[#f3edd7] px-10 py-3 
              rounded-full font-bold hover:scale-105 transition-transform shadow-lg">เข้าใจแล้ว</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Found Sections */}
      <section id='found-intro' className="relative h-screen bg-cover bg-center overflow-hidden" 
        style={{ backgroundImage: `url(${assets.frame31})`, backgroundSize: '100% 100%' }} >
  
  <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6">

    {/* ส่วนที่ 1: ข้อความแรกพร้อมวงกลมแสง */}
    <div className="absolute top-[25%] flex items-center justify-center">
      {/* วงกลมแสง */}
      <div className="intro-glow absolute w-[140%] 
      aspect-square bg-[radial-gradient(circle,_rgba(255,255,255,0.6)_0%,_transparent_70%)] rounded-full blur-2xl pointer-events-none"></div>
      
      <p className="intro-text-1 relative z-10 text-[#5D3E1F] 
      text-xl md:text-3xl text-center leading-relaxed font-Regular 
      max-w-3xl">
         เมื่อเวลาผ่านไปหลายทศวรรษ ชั้นหินก็ถูกกัดกร่อนจากลม ฝน และน้ำ
      </p>
    </div>

    {/* ส่วนที่ 2: ข้อความที่สอง (ซ่อนไว้ก่อนด้วย opacity-0) */}
    <p className="intro-text-2 opacity-0 translate-y-10 
    text-[#5D3E1F] text-xl md:text-3xl text-center 
    leading-relaxed font-Regular max-w-3xl">
      เมื่อเวลาผ่านไป หลายล้านปี ซากดึกดำบรรพ์เหล่านี้ถูกค้นพบโดยนักบรรพชีวินวิทยา
    </p>

    {/* ส่วนที่ 3: นก (Bird) */}
    <img 
      src={assets.bird} 
      /* ปรับ w- ให้ใหญ่ขึ้นเพื่อเป็นค่าเริ่มต้น เช่น w-64 หรือ w-80 */
      className="bird-fly absolute bottom-[-200px] right-[-180px] 
      
      w-64 md:w-80 z-20 pointer-events-none" 
      alt="bird"
    />
  </div>
</section>

      <section id='found-section' className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden" 
        style={{ backgroundImage: `url(${assets.frame32})`, backgroundSize: '100% 100%' }}>
        
        <div className="z-10 w-full h-full relative">
          
          <p className="text-[#5D3E1F] text-xl md:text-3xl text-center leading-relaxed">
            ทำให้ซากดึกดำบรรพที่อยู่ภายในชั้นหินค่อยๆปรากฏขึ้นมา
          </p>

          <img 
            src={assets.fossilshowing} 
            onClick={() => setShowFossilInfo(!showFossilInfo)}
            className="fossilshowing absolute bottom-[10%] left-[157px] w-64 md:w-80 lg:w-[500px] z-20 cursor-pointer transition-transform hover:scale-105 active:scale-95" 
            alt="fossil showing"
          />

          <AnimatePresence>
            {showFossilInfo && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="absolute z-30 bg-[#f3edd7]/80 backdrop-blur-md p-6 rounded-2xl border-4 border-[#5c3d20] shadow-2xl max-w-sm text-[#5c3d20] bottom-[45%] left-[200px]"
              >
                <h3 className="text-2xl font-bold mb-2">การค้นพบที่สำคัญ!</h3>
                <p className="leading-relaxed">
                  รู้หรือไม่ซากดึกดำบรรพ์ที่สมบูรณ์ที่สุดชิ้นหนึ่งเคยถูกค้นพบในประเทศไทย 
                  ซากดึกดำบรรพ์ที่สมบูรณ์ช่วยให้นักวิจัยระบุสายพันธุ์ที่แม่นยำได้
                </p>
                <button onClick={() => setShowFossilInfo(false)} className="mt-4 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity underline">
                  [ ปิดหน้าต่าง ]
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


      <section id='found-2' className="relative h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${assets.frame33})`, backgroundSize: '100% 100%' }} >
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6">
          <div className="text-center">
            <h2 className="text-[#f3edd7] text-4xl md:text-6xl  mb-4">ทำไมซากดึกดำบรรพ์ถึงสำคัญ?</h2>
            <p className="text-[#f3edd7] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              ซากดึกดำบรรพ์เป็นหน้าต่างสู่โลกในอดีต ช่วยให้นักวิทยาศาสตร์เข้าใจวิวัฒนาการของสิ่งมีชีวิต 
              สภาพแวดล้อมในอดีต และประวัติศาสตร์ของโลกเรา
            </p>
          </div>
        </div>
      </section>

      <section id='found-3' className="relative h-screen flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: `url(${assets.frame34})`, backgroundSize: '100% 100%' }}>
        <div className="px-6 w-full max-w-5xl">
          <div className="text-[#f3edd7] text-3xl md:text-5xl text-center drop-shadow-lg">
            ช่วยบอกอายุ
            และลำดับการเกิดของชั้นหินที่ซากดึกดำบรรพ์ถูกพบ
          </div>
        </div>
      </section>

      <section id='found-4' className="relative h-screen flex justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${assets.frame35})`, backgroundSize: '100% 100%' }}>
      
      {/* ส่วนที่เพิ่มความสูงและระยะห่าง (pt-[20vh]) เพื่อให้ข้อความเริ่มที่ระยะ 20% จากขอบบนตามที่คุณเคยต้องการ */}
      <div className="relative z-10 flex flex-col px-6 w-full max-w-5xl items-start pt-[20vh] gap-12">
        
        {/* ข้อความส่วนที่ 1: เปลี่ยนสีเป็น #f3edd7 */}
        <h1 className="text-[#5c3d20] text-4xl md:text-5xl  text-animate font-Regular">
          ช่วยศึกษาสภาพแวดล้อมในอดีต 
        </h1>
      </div>

     <div className="relative z-10 flex flex-col px-6 w-full max-w-5xl items-start pt-[50vh] gap-12" > 
        {/* ปรับเป็น self-start เพื่อให้ชิดซ้ายตาม Container หลัก */}
        <p className="text-[#5c3d20] text-left text-2xl md:text-3xl 
          self-start text-animate font-Regular">
          บอกถิ่นกำเนิดและวิวัฒนาการ <br/>
          ของสิ่งมีชีวิตในอดีตว่าสัตว์เปลี่ยนแปลงไปอย่างไร
        </p>
      </div>
    </section>

     

      <footer className="bg-[#5c3d20] py-10 text-center text-[#f3edd7]/40 text-sm">
        <p>© 2026 CMM KMUTT Thesis Fossil World Interactive - Explore the Past</p>
      </footer>
    </div>
  );
}

export default App;