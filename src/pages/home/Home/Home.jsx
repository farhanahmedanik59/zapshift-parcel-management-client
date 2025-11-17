import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import SalesTeams from "../SalesTeams/SalesTeams";
import Testimonial from "../Testimonial/Testimonial";
const promise = fetch("/reviews.json").then((res) => res.json());
const Home = () => {
  return (
    <div className="mt-3">
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <SalesTeams></SalesTeams>
      <Testimonial promise={promise}></Testimonial>
    </div>
  );
};

export default Home;
