import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignRider = () => {
  const parcelModalRef = useRef();
  const queryClient = useQueryClient();
  const [modalParcel, setModalParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    isloadig,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assign-parcels");
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["modalParcel", modalParcel?.senderDistrict, "available"],
    enabled: !!modalParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders?status=approved&district=${modalParcel.senderDistrict}&workStatus=available`);
      return res.data;
    },
  });

  const handleModal = (parcel) => {
    setModalParcel(parcel);
    parcelModalRef.current.showModal();
  };
  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      percelId: modalParcel._id,
    };
    axiosSecure.patch(`/percels/${modalParcel._id}`, riderInfo).then((res) => {
      if (res.data.modifiedCount) {
        parcelModalRef.current.close();
        Swal.fire({
          title: `Rider Assigned`,
          icon: "success",
        });
        queryClient.invalidateQueries(["riders", "pending"]);
        refetch();
      }
    });
  };
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Cost</th>
            <th>Tracking Id</th>
            <th>CreatedAt</th>
            <th>Pickup District</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => {
            return (
              <tr>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>
                  <button onClick={() => handleModal(parcel)} className="btn btn-primary text-black ">
                    Assign Rider
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={parcelModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action flex flex-col">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => {
                  return (
                    <tr>
                      <th>{index + 1}</th>
                      <td>{rider.name}</td>
                      <td>{rider.email}</td>
                      <td>
                        <button onClick={() => handleAssignRider(rider)} className="btn btn-primary text-black">
                          Assign
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
