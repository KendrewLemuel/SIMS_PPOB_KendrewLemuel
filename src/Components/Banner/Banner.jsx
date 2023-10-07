import React, { useEffect, useState } from "react";
import "./Banner.css";
import { bannerList } from "../../Api/Api";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    bannerList()
      .then((response) => {
        console.log(response.data);
        setBanners(response.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  return (
    <div className="banner-wrapper">
      <h3 className="banner-title">Temukan Promo menarik</h3>
      <div className="banner-list">
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            padding: 0,
          }}
        >
          {banners.map((banner) => {
            return (
              <SplideSlide>
                {" "}
                <a href={banner.banner_name} key={banner.banner_name}>
                  <img src={banner.banner_image} alt={banner.banner_name} />
                </a>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};

export default Banner;
