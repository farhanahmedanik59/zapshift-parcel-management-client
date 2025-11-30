import React from "react";
import { useForm, useWatch } from "react-hook-form";
import rider from "../../assets/agent-pending.png";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const regions = serviceCenters.map((serviceCenter) => {
    return serviceCenter.region;
  });
  const filterdRegions = [...new Set(regions)];
  const region = useWatch({ control, name: "region" });
  const filterdistrict = (region) => {
    if (!region) {
      return [];
    }
    console.log(region);
    const matchedRegion = serviceCenters.filter((serviceCenter) => serviceCenter.region === region);
    const district = matchedRegion.map((dis) => dis.district);
    return district;
  };
  const onSubmit = (data) => {
    axiosSecure.post("/riders", data).then((res) => console.log(res));
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

          {/* Region */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Region</label>
            <select {...register("region")} className="w-full px-3 py-2 border rounded-md bg-gray-100">
              <option value="">Select your District</option>
              {filterdRegions.map((region) => (
                <option value={region}>{region}</option>
              ))}
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

          {/* District */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your District</label>
            <select {...register("district")} className="w-full px-3 py-2 border rounded-md bg-gray-100">
              <option value="">Select your District</option>
              {filterdistrict(region).map((reg) => {
                return <option value={reg}>{reg}</option>;
              })}
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
