import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import './Responsive.css';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@google/model-viewer';

// แก้ไข Path ให้เป็น String ตรงๆ เพื่อให้แท็ก <img> ใช้งานได้
const image = {
  backgroundImage: `${import.meta.env.BASE_URL}assets/images/bgdino.PNG`,
  bookletImage: `${import.meta.env.BASE_URL}assets/images/booklet.png`,
  info: `${import.meta.env.BASE_URL}assets/images/info.png`,
  kinareeIcon: `${import.meta.env.BASE_URL}assets/images/kinnareemimusicon.png`,
  phuwiangIcon: `${import.meta.env.BASE_URL}assets/images/phuwiangicon.png`,
  siammosaurusIcon: `${import.meta.env.BASE_URL}assets/images/siammosaurusicon.png`,
  psittacosaurusIcon: `${import.meta.env.BASE_URL}assets/images/psittacosaurusicon.png`,
  minimoIcon: `${import.meta.env.BASE_URL}assets/images/minimoicon.png`,
  meatIcon: `${import.meta.env.BASE_URL}assets/images/meaticon.PNG`,
  plantIcon: `${import.meta.env.BASE_URL}assets/images/planticon.PNG`,
};
const assets = {
  //เสียง
  bgmusic: `${import.meta.env.BASE_URL}assets/sound/Stardew Valley OST - In The Deep Woods.mp3`,
  // เพิ่มเสียงคลิก (เปลี่ยน path ให้ตรงกับไฟล์ของคุณ)
  clickSfx: `${import.meta.env.BASE_URL}assets/sound/click.mp3`
}

const dinoData = [
  {
    id: 0,
    name: "ภูเวียงโกซอรัส สิรินธรเน",
    desc: "สัตว์เลื้อยคลานยักษ์แห่งภูเวียง ไดโนเสาร์ยักษ์สายพันธุ์ไทย ใหญ่เท่ารถเก๋ง 4 คันครึ่ง ภูเวียงโกซอรัส สิรินธรเน จัดอยู่ในกลุ่มซอโรพอด (sauropod)",
    size: "ยาวประมาณ 15 - 20 เมตร",
    place: "ขอนแก่น และกาฬสินธุ์ หมวดหินเสาขัว",
    diet: "กินพืช",
    dietIcon: `${import.meta.env.BASE_URL}assets/images/planticon.PNG`,
    model: `${import.meta.env.BASE_URL}assets/model/phuwiangani.glb`,
    img: `${import.meta.env.BASE_URL}assets/images/phuwiangicon.png`,
    cameraTarget: "0m 4m 0m",
    cameraOrbit: "-55deg 75deg 50m"
  },
  {
    id: 1,
    name: "กินรีมิมัส ขอนแก่นเอนซิส",
    desc: "ไดโนเสาร์นกกระจอกเทศตัวแรกที่พบในไทย มีรูปร่างปราดเปรียว เพรียวบาง มีพลังเตะที่มหาศาลจากขาและแข้งที่ยาวของมัน และมีขนพู่ที่หาง",
    size: "ยาวประมาณ 1-2 เมตร",
    place: "ขอนแก่น หมวดหินเสาขัว",
    diet: "กินพืช และสัตว์เล็ก",
    dietIcon: `${import.meta.env.BASE_URL}assets/images/planticon.PNG`,
    model: `${import.meta.env.BASE_URL}assets/model/kinnareemimusani.glb`,
    img: `${import.meta.env.BASE_URL}assets/images/kinnareemimusicon.png`,
    cameraTarget: "0m 4m 0m",
    cameraOrbit: "55deg 75deg 100m"
  },
  {
    id: 2,
    name: "สยามโมซอรัส สุธีธรนิ",
    desc: "ไดโนเสาร์กินเนื้อขนาดใหญ่ชนิดแรกที่พบในไทย เดิน 2 เท้า ฟันคล้ายฟันจระเข้ ชอบกินปลาเป็นอาหาร",
    size: "ยาวประมาณ 6.5 - 7 เมตร",
    place: "ขอนแก่น หมวดหินเสาขัว",
    diet: "กินเนื้อ",
    dietIcon: `${import.meta.env.BASE_URL}assets/images/meaticon.PNG`,
    model: `${import.meta.env.BASE_URL}assets/model/siammosaurusani.glb`,
    img: `${import.meta.env.BASE_URL}assets/images/siammosaurusicon.png`,
    cameraTarget: "0m 4m 0m",
    cameraOrbit: "-45deg 75deg 70m"
  },
  {
    id: 3,
    name: "ซิตตะโกซอรัส สัตยารักษ์กิ",
    desc: "ไดโนเสาร์กินพืชที่มีจะงอยปากเหมือน 'นกแก้ว' เป็นไดโนเสาร์ตัวจิ๋วที่เดินได้ทั้ง 2 เท้าและ 4 เท้า แถมที่หางยังมีขนพู่ยาว ๆ ด้วย",
    size: "ยาวประมาณ 1 - 1.5 เมตร",
    place: "ชัยภูมิ หมวดหินโคกกรวด",
    diet: "กินพืช",
    dietIcon: `${import.meta.env.BASE_URL}assets/images/planticon.PNG`,
    model: `${import.meta.env.BASE_URL}assets/model/psittacosaurusani.glb`,
    img: `${import.meta.env.BASE_URL}assets/images/psittacosaurusicon.png`,
    cameraTarget: "0m 4m 0m",
    cameraOrbit: "60deg 75deg 220m"
  },
  {
    id: 4,
    name: "มินิโมเคอร์เซอร์ ภูน้อยเอนซิส",
    desc: "“นักวิ่งตัวจิ๋วแห่งภูน้อย” ไดโนเสาร์ตัวที่ 13 ของไทยที่ถูกค้นพบเมื่อ มีปากเป็นจะงอยสั้นๆ คล้ายกับนก ไว้กินพืช",
    size: "ยาวประมาณ 2 เมตร",
    place: "กาฬสินธุ์ หมวดหินภูกระดึงตอนล่าง",
    diet: "กินพืช",
    dietIcon: `${import.meta.env.BASE_URL}assets/images/planticon.PNG`,
    model: `${import.meta.env.BASE_URL}assets/model/minimoani.glb`,
    img: `${import.meta.env.BASE_URL}assets/images/minimoicon.png`,
    cameraTarget: "0m 2.5m 0m",
    cameraOrbit: "45deg 75deg 20m"
  },
  {
    id: 5,
    name: "สยามโมไทรันนัส อีสานเอนซิส",
    desc: " “ยักษ์นักล่าแห่งสยาม” เป็นไดโนเสาร์กินเนื้อขนาดใหญ่ เดิน 2 เท้า มีขาหลังที่ใหญ่และแข็งแรง ลักษณะคล้ายกับทีเรกซ์ เป็นไดโนเสาร์วงศ์ไทรันโนซอริเดทที่เก่าแก่ที่สุด มีชีวิตอยู่ในยุคครีเทเชียสตอนต้น เมื่อประมาณ 130 ล้านปีก่อน  ",
    size: "ยาวประมาณ  6.5 - 7 เมตร",
    place: "ขอนแก่น หมวดหินเสาขัว",
    diet: "กินเนื้อ",
    dietIcon: `${import.meta.env.BASE_URL}assets/images/meaticon.PNG`,
    model: `${import.meta.env.BASE_URL}assets/model/siamotyranusani.glb`,
    img: `${import.meta.env.BASE_URL}assets/images/siamotyranusimg.PNG`,
    cameraTarget: "0m 4m 0m",
    cameraOrbit: "-45deg 75deg 70m"
  },
  {
    id: 6,
    name: " อิสานโนซอรัส อรรถวิภัชน์ชิ",
    desc: "ไดโนเสาร์กินพืชคอยาวที่มีลักษณะโบราณที่สุดที่เคยพบในประเทศไทยและเอเชียตะวันออกเฉียงใต้ มีอายุประมาณ 210 ล้านปี อยู่ในยุคไทรแอสซิกตอนปลาย",
    size: "ยาวประมาณ 12 - 16 เมตร",
    place: "ชัยภูมิ หมวดหินน้ำทอง",
    diet: "กินพืช",
    dietIcon: `${import.meta.env.BASE_URL}assets/images/planticon.PNG`,
    model: `${import.meta.env.BASE_URL}assets/model/Isanosaurusani.glb`,
    img: `${import.meta.env.BASE_URL}assets/images/Isanosaurusimg.PNG`,
    cameraTarget: "0m 4m 0m",
    cameraOrbit: "-40deg 75deg 80m"
  },
];

function App() {
  const [index, setIndex] = useState(0);
  const currentDino = dinoData[index];
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(assets.bgmusic));
  const clickAudio = useRef(new Audio(assets.clickSfx));

  const playSelectSound = (newIndex) => {
    setIndex(newIndex);
    if (!isMuted) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(() => { });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    const bgm = audioRef.current;
    bgm.loop = true;
    bgm.volume = 0.3;
    if (!isMuted) { bgm.play().catch(() => { }); }
    else { bgm.pause(); }
    return () => bgm.pause();
  }, [isMuted]);

  const scrollToContent = () => {
    const element = document.getElementById('content-section');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="font-family-Regular relative h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth font-Regular">
      {/* --- Navigation --- */}
      <nav className="fixed top-4 right-4 md:top-8 md:right-8 z-[100] flex flex-row gap-2 md:gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="bg-[#5c3d20] text-[#f3edd7] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-2 border-[#f3edd7]/20"
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.5a.75.75 0 0 1-.75-.75V9.75a.75.75 0 0 1 .75-.75h2.25Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.5a.75.75 0 0 1-.75-.75V9.75a.75.75 0 0 1 .75-.75h2.25Z" />
            </svg>
          )}
        </button>
        <Link to="/" className="bg-[#5c3d20] text-[#f3edd7] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-[#f3edd7]/20" title="กลับหน้าหลัก">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </Link>
      </nav>

      {/* --- หน้าที่ 1: Intro --- */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-cover bg-center bg-no-repeat text-center"
        style={{ backgroundImage: `url(${image.backgroundImage})`, backgroundColor: '#8D6E63' }}>
        <div className="max-w-4xl space-y-6 md:space-y-10 animate-fade-in-up">
          <h1 className="text-[clamp(1.5rem,5vw,3.5rem)] leading-tight text-[#F5ECDD]">
            จากซากดึกดำบรรพ์<br />สู่การค้นพบ 'ไดโนเสาร์ไทย' สายพันธุ์ใหม่ของโลก!
          </h1>
          <p className="text-[clamp(1rem,2vw,1.5rem)] text-[#F5ECDD] font-medium leading-relaxed px-4">
            เพราะซากดึกดำบรรพ์ จึงทำให้เราจินตนาการหน้าตาของไดโนเสาร์ขึ้นมาใหม่ได้อีกครั้ง มาดูตัวอย่างไดโนเสาร์ไทยทั้ง 7 ตัวกันเถอะ!
          </p>
          <button
            onClick={scrollToContent}
            className="bg-[#3E2723] text-white px-8 py-3 md:px-12 md:py-5 rounded-full text-lg md:text-2xl hover:bg-[#5D4037] transition-all shadow-xl hover:scale-110"
          >
            สำรวจด้านล่างเลย ⬇
          </button>
        </div>
      </section>

      {/* --- หน้าที่ 2: Content --- */}
      <section
        id="content-section"
        ref={sectionRef}
        className={`relative h-screen w-full snap-start flex flex-col justify-center overflow-hidden 
          transition-all duration-500 bg-cover bg-center bg-no-repeat ${isVisible ? 'start-anim' : ''}`}
        style={{
          backgroundImage: `url(${image.bookletImage}), url(${image.backgroundImage})`,
          backgroundColor: '#5D4037'
        }}
      >
        <div className="model-layout w-full h-full max-w-[1600px] mx-auto flex items-center justify-center relative p-4">

          {/* 1. ส่วนโมเดล 3D (ปรับตำแหน่งให้สมดุลในมือถือ) */}
          <div className="model-3d w-full h-[40%] md:h-full md:w-[40%] flex items-center justify-center z-0 animate-stagger md:ml-20 lg:ml-32">
            <model-viewer
              key={currentDino.id}
              src={currentDino.model}
              camera-target={currentDino.cameraTarget}
              camera-orbit={currentDino.cameraOrbit || "45deg 75deg 20m"}
              disable-pan autoplay loop camera-controls auto-rotate
              shadow-intensity="1.5"
              style={{ width: '100%', height: '100%' }}
            ></model-viewer>
          </div>

          {/* 2. ส่วนเนื้อหา */}
          <div className="model-info w-full md:w-[50%] flex flex-col justify-center px-[5%] md:px-0 md:ml-[2%] lg:ml-[4%]
             z-10 animate-stagger " style={{ animationDelay: '0.2s' }}>

            <h2 className="text-[5vw] md:text-[3vw] lg:text-[2.5vw] text-[#3E2723] mb-[2%] border-l-[1vw] md:border-l-[0.5vw]
             border-[#5D4037] pl-[3%] leading-tight ">
              {currentDino.name}
            </h2>

            <div className="text-[#4E342E] text-[100%] md:text-[90%] lg:text-[110%] mb-[4%] 
            leading-[1.4] ">
              <img
                src={image.info}
                className="inline-block w-[6%] md:w-[4%] lg:w-[3%] h-auto mr-[2%] object-contain align-middle"
                alt="info"
              />
              <span className="inline-block  md:w-[70%] lg:w-[80%] h-auto mr-[2%] object-contain align-middle">
                {currentDino.desc}
              </span>
            </div>

            {/* ส่วนข้อมูลสถิติ: ใช้ Gap และ Padding เป็นเปอร์เซ็นต์ */}
            <div className="space-y-[2%]">
              {[
                { label: "สถานที่ค้นพบ", value: currentDino.place },
                { label: "ขนาด", value: currentDino.size },
                { label: "ประเภท", value: currentDino.diet, icon: currentDino.dietIcon }
              ].map((item, i) => (
                <div key={i} className="flex flex-row items-center gap-[3%]">

                  {/* ป้ายกำกับ: ใช้ความกว้างเป็นเปอร์เซ็นต์ของ Container */}
                  <span className="text-[#4E342E] px-[3%] py-[0.5%] rounded-full text-[2.5vw] md:text-[1.2vw] shadow-sm text-center min-w-[25%] md:min-w-[100px]">
                    {item.label}
                  </span>

                  {/* ข้อมูล: ปรับขนาด Icon และ Text ตาม Viewport */}
                  <div className="flex items-center gap-[2%] text-[#3E2723] text-[3vw] md:text-[1.5vw] ">
                    {item.icon && <img src={item.icon} className="w-[6vw] h-[6vw] md:w-[3.5vw] md:h-[3.5vw] object-contain" alt="diet icon" />}
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 3. ปุ่มเลือกไดโนเสาร์ (Responsive: แนวนอนในมือถือ, แนวตั้งในคอม) */}
          {/* ปรับตำแหน่งหลักให้รองรับการเปลี่ยนทิศทาง */}
          <div className="dino-selector-wrapper absolute z-20 transition-all">
            <div className="flex flex-col md:flex-row items-center justify-center 
              gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 max-h-[60vh] md:max-h-none overflow-y-auto 
              md:overflow-y-visible">
              {dinoData.map((dino, i) => (
                <div
                  key={dino.id}
                  onClick={() => playSelectSound(i)}
                  className={`dino-selector-btn flex-shrink-0 
                      w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18
                      rounded-md sm:rounded-lg md:rounded-xl cursor-pointer overflow-hidden 
                      transition-all duration-300 border-[1.5px] 
                      ${index === i
                      ? 'border-[#3E2723] scale-110 shadow-lg ring-2 ring-[#3E2723]/30'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110'
                    }`}
                >
                  <img src={dino.img} alt={dino.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#5c3d20] py-6 md:py-10 text-center text-[#f3edd7]/40 text-[10px] md:text-sm">
        <p>© 2026 CMM KMUTT Thesis Fossil World Interactive - Explore the Past</p>
      </footer>
    </div>
  );
}

export default App;