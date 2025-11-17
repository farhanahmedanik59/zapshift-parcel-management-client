import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import "./fixLeafletIcon";

const Coverage = () => {
  const mapRef = useRef(null);
  const services = useLoaderData();
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.loc.value;

    const district = services.find((e) => e.district.toLowerCase().includes(location.toLowerCase()));
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div>
      <section className="px-5">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#005f73] mb-8">We are available in 64 districts</h1>

        <div className="form-control max-w-lg mb-10">
          <div className="input-group flex">
            <form className="flex" onSubmit={handleSearch}>
              <div>
                <label className="input input-lg input-bordered flex items-center gap-2 w-full bg-gray-100 border-none rounded-r-none pr-0">
                  <FaSearch size={20} className="text-gray-500" />
                  <input name="loc" type="text" placeholder="Search here" className="grow bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none" />
                </label>
              </div>

              <button className="btn btn-lg bg-[#a7f050] hover:bg-[#92d645] text-gray-800 font-bold border-none rounded-l-none">Search</button>
            </form>
          </div>
        </div>

        <hr className="border-gray-200 my-6 max-w-5xl" />

        <p className="text-lg font-semibold text-[#005f73] mt-8">We deliver almost all over Bangladesh</p>

        <div className="h-[700px]">
          <MapContainer center={[23.68, 90.35]} zoom={8} scrollWheelZoom={false} className="h-full" ref={mapRef}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {services.map((service) => (
              <Marker position={[service.latitude, service.longitude]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default Coverage;
