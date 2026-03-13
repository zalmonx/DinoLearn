// src/animations.js
import { gsap } from "gsap";

export const animateRevealText = (containerRef) => {
  // ใช้ gsap.fromTo เพื่อกำหนดจุดเริ่มและจุดจบที่ชัดเจน
  return gsap.fromTo(
    containerRef.current.querySelectorAll(".reveal-text"),
    { 
      opacity: 0, 
      y: 50 
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        // เนื่องด้วยเป็น Parallax บางครั้งตำแหน่ง 'top' อาจเพี้ยน 
        // ให้ใช้ start แบบกว้างๆ หรือใช้การตรวจจับจากตัว Parallax เอง
        start: "top 80%", 
        toggleActions: "play none none reverse",
      },
    }
  );
};