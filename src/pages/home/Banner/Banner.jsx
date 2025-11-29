import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import { FaArrowRight } from "react-icons/fa";
const Banner = () => {
  return (
    <div>
      <Carousel infiniteLoop={true} autoPlay={true} interval={2000}>
        <div>
          <img src={banner1} />
        </div>
        <div>
          <img src={banner2} />
        </div>
        <div className="relative">
          <img src={banner3} />

          <div className="absolute bottom-40 left-35 z-10 flex items-center gap-3">
            <button className="btn bg-primary text-white py-3 px-6 whitespace-nowrap">Track Your Parcel</button>

            <FaArrowRight className="text-primary btn bg-black p-2 rounded-2xl text-4xl" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
