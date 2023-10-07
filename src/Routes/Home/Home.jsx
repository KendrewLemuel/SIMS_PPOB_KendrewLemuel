import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import Services from "../../Components/Services/Services";
import Banner from "../../Components/Banner/Banner";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Banner />
    </>
  );
};

export default Home;
