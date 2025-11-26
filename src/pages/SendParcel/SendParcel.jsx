import React from "react";
import Swal from "sweetalert2";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regions = serviceCenters.map((reg) => reg.region);
  const filtredRegions = [...new Set(regions)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const filterByRegion = (region) => {
    if (!region) return [];
    const regionDistricts = serviceCenters.filter((reg) => reg.region === region);
    return regionDistricts.map((r) => r.district);
  };

  const onSubmit = (data) => {
    const samedistrict = data.senderDistrict === data.receiverDistrict;
    const { senderDistrict, receiverDistrict, parcelType, parcelWeight } = data;
    let cost = 0;
    if (parcelType === "document") {
      cost = samedistrict ? 60 : 80;
    } else {
      if (parseInt(parcelWeight) <= 3) {
        cost = samedistrict ? 110 : 150;
      } else {
        const extraWeight = parseInt(parcelWeight) - 3;
        const minCharge = samedistrict ? 110 : 150;
        cost = minCharge + (samedistrict ? extraWeight * 40 : extraWeight * 40 + 40);
      }
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      const parceldata = { ...data, senderEmail: user.email };
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", parceldata).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Parcel added",
              text: "Your file has been added.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Send A Parcel</h1>
        <p className="mb-6 font-medium">Enter your parcel details</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ======= Parcel Info ======== */}
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-2">
              <input type="radio" {...register("parcelType", { required: true })} value="document" className="radio" />
              Document
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" {...register("parcelType", { required: true })} value="non-document" className="radio" />
              Non-Document
            </label>
          </div>
          {errors.parcelType && <p className="text-red-500 text-sm mb-3">Parcel type is required</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="font-medium">Parcel Name</label>
              <input className="w-full border p-2 rounded mt-1" {...register("parcelName", { required: true })} placeholder="Parcel Name" />
            </div>

            <div>
              <label className="font-medium">Parcel Weight (KG)</label>
              <input className="w-full border p-2 rounded mt-1" {...register("parcelWeight", { required: true })} placeholder="Parcel Weight (KG)" />
            </div>
          </div>

          {/* ========== Sender + Receiver ========== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Sender */}
            <div>
              <h2 className="font-semibold mb-3">Sender Details</h2>

              <label>Sender Name</label>
              <input className="w-full border p-2 rounded mt-1 mb-4" {...register("senderName", { required: true })} placeholder="Sender Name" />

              <label>Address</label>
              <input className="w-full border p-2 rounded mt-1 mb-4" {...register("senderAddress", { required: true })} placeholder="Address" />

              <label>Sender Phone No</label>
              <input className="w-full border p-2 rounded mt-1 mb-4" {...register("senderPhone", { required: true })} placeholder="Sender Phone No" />

              <label>Your Region</label>
              <select className="w-full border p-2 rounded mt-1 mb-4" {...register("senderRegion", { required: true })}>
                <option value="">Select your Region</option>
                {filtredRegions.map((singleregion) => (
                  <option key={singleregion} value={singleregion}>
                    {singleregion}
                  </option>
                ))}
              </select>

              <label>Your District</label>
              <select className="w-full border p-2 rounded mt-1 mb-4" {...register("senderDistrict", { required: true })}>
                <option value="">Select your District</option>
                {filterByRegion(senderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              <label>Pickup Instruction</label>
              <textarea className="w-full border p-2 rounded mt-1" rows="3" {...register("pickupInstruction", { required: true })}></textarea>
            </div>

            {/* Receiver */}
            <div>
              <h2 className="font-semibold mb-3">Receiver Details</h2>

              <label>Receiver Name</label>
              <input className="w-full border p-2 rounded mt-1 mb-4" {...register("receiverName", { required: true })} placeholder="Receiver Name" />

              <label>Receiver Address</label>
              <input className="w-full border p-2 rounded mt-1 mb-4" {...register("receiverAddress", { required: true })} placeholder="Address" />

              <label>Receiver Contact No</label>
              <input className="w-full border p-2 rounded mt-1 mb-4" {...register("receiverPhone", { required: true })} placeholder="Receiver Contact No" />

              <label>Receiver Region</label>
              <select className="w-full border p-2 rounded mt-1 mb-4" {...register("receiverRegion", { required: true })}>
                <option value="">Select your Region</option>
                {filtredRegions.map((singleregion) => (
                  <option key={singleregion} value={singleregion}>
                    {singleregion}
                  </option>
                ))}
              </select>

              <label>Receiver District</label>
              <select className="w-full border p-2 rounded mt-1 mb-4" {...register("receiverDistrict", { required: true })}>
                <option value="">Select your District</option>
                {filterByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              <label>Delivery Instruction</label>
              <textarea className="w-full border p-2 rounded mt-1" rows="3" {...register("deliveryInstruction", { required: true })}></textarea>
            </div>
          </div>

          {/* Note & Submit Button */}
          <p className="mt-6 mb-4 text-sm">* PickUp Time 4pm-7pm Approx.</p>

          <button className="bg-lime-400 px-6 py-3 rounded text-black font-semibold" type="submit">
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
