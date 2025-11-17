import React from "react";
import serviceIcon from "../../../assets/service.png";
const OurServices = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      highlight: false,
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      highlight: true,
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      highlight: false,
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      highlight: false,
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
      highlight: false,
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      highlight: false,
    },
  ];

  return (
    <div>
      <div className="bg-[#063b3a] text-center px-6 md:px-12 lg:px-20 py-20 rounded-3xl mt-10">
        {/* Title Section */}
        <div className="border border-dashed border-[#4fa49a] p-6 rounded-xl inline-block mb-12">
          <h2 className="text-3xl font-bold text-white">Our Services</h2>
          <p className="text-gray-300 max-w-2xl mt-2">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl shadow-md border
              ${item.highlight ? "bg-[#c8e764]" : "bg-white"}
            `}
            >
              <div className="flex justify-center mb-4">
                <img src={serviceIcon} alt="icon" className="w-14" />
              </div>

              <h3
                className={`font-semibold text-lg mb-3 
                ${item.highlight ? "text-[#063b3a]" : "text-[#063b3a]"}
              `}
              >
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
