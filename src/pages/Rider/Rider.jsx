import React from "react";
import { useForm } from "react-hook-form";
import rider from "../../assets/agent-pending.png";
const Rider = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="flex pb-12">
      <div className="max-w-4xl mx-auto flex-1 bg-white p-8 rounded-md shadow-md mt-10">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Tell us about yourself</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Name</label>
            <input {...register("name")} type="text" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your age</label>
            <input {...register("age")} type="number" placeholder="Your age" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Email</label>
            <input {...register("email")} type="email" placeholder="Your Email" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>

          {/* District */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your District</label>
            <select {...register("district")} className="w-full px-3 py-2 border rounded-md bg-gray-100">
              <option value="">Select your District</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rajshahi">Rajshahi</option>
            </select>
          </div>

          {/* NID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">NID No</label>
            <input {...register("nid")} type="text" placeholder="NID" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact</label>
            <input {...register("contact")} type="text" placeholder="Contact" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>

          {/* Wire-house */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Which wire-house you want to work?</label>
            <select {...register("warehouse")} className="w-full px-3 py-2 border rounded-md bg-gray-100">
              <option value="">Select wire-house</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="md:col-span-2 w-full py-3 bg-lime-400 text-black font-semibold rounded-md">
            Submit
          </button>
        </form>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={rider} alt="" />
      </div>
    </div>
  );
};

export default Rider;
