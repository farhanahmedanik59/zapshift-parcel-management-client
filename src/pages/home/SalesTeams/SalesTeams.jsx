import React from "react";
import amazon from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstar from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import starPeople from "../../../assets/brands/start_people.png";
import Marquee from "react-fast-marquee";
const SalesTeams = () => {
  const logos = [amazon, casio, moonstar, randstar, star, starPeople];
  return (
    <div className="mt-6">
      <h1 className="text-3xl text-center">We've helped thousands of sales teams</h1>
      <div className="mt-3.5">
        <Marquee>
          {logos.map((logo, index) => (
            <img key={index} src={logo} className="ml-9" />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default SalesTeams;
