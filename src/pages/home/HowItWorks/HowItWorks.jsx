import { FaTruck, FaMapMarkerAlt } from "react-icons/fa";

const HowItWorks = () => {
  const items = [
    {
      icon: <FaMapMarkerAlt className="text-4xl text-primary" />,
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <FaTruck className="text-4xl text-primary" />,
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <FaTruck className="text-4xl text-primary" />,
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl text-primary" />,
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <div className="bg-[#f3f5f7] py-14">
      <h2 className="text-3xl font-bold mb-10 px-4">How It Works</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-10">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="mb-4">{item.icon}</div>

            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
