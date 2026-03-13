import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-100 px-4">
            <div className="text-center max-w-2xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-900 mb-6 md:mb-8">
                    🦴 โลกของซากดึกดำบรรพ์ 🦴
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-amber-800 mb-8 md:mb-12 leading-relaxed">
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
                    <p className="italic">("ซากดึกดำบรรพ์คือกุญแจสู่การเข้าใจอดีตของโลก")</p>
                </div>
            </div>
        </div>
    );
}  
export default Home;