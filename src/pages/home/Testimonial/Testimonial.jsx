import React, { use } from "react";
import customer from "../../../assets/customer-top.png";
import TertimonialCard from "./TertimonialCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonial = ({ promise }) => {
  const reviews = use(promise);

  return (
    <div>
      <section className="w-full bg-gray-100 py-16 flex flex-col items-center text-center px-4">
        <img src={customer} alt="customer illustration" className="w-40 mb-6" />

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What our customers are sayings</h2>

        <p className="max-w-2xl text-gray-600 leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </section>

      <div className="md:max-w-[80%] md:mx-auto pb-14">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          slidesPerView={"3"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <TertimonialCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
