import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="w-[70%] h-[500px] md:h-[600px] lg:h-[500px]">
      <Carousel infiniteLoop autoPlay interval={3000} showThumbs={false} showStatus={false}>
        {/* Slide 1 */}
        <div className="h-full">
          <img src={banner1} alt="Banner 1" className="h-full w-full object-cover" />
        </div>

        {/* Slide 2 */}
        <div className="h-full">
          <img src={banner2} alt="Banner 2" className="h-full w-full object-cover" />
        </div>

        {/* Slide 3 with button overlay */}
        <div className="h-full relative">
          <img src={banner3} alt="Banner 3" className="h-full w-full object-cover" />

          <div className="absolute bottom-20 left-10 md:bottom-32 md:left-20 flex items-center gap-3">
            <button className="btn bg-primary text-white py-3 px-6 whitespace-nowrap">Track Your Parcel</button>
            <FaArrowRight className="text-white bg-black p-2 rounded-2xl text-3xl md:text-4xl" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
