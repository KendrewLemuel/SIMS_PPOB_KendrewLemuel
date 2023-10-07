import React, { useEffect, useState } from "react";
import "./Services.css";
import { servicesList } from "../../Api/Api";
import { Link, useParams } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    servicesList()
      .then((response) => {
        console.log(response.data);
        setServices(response.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  return (
    <div className="services-wrapper">
      <div className="services-list">
        {services.map((service) => (
          <Link
            to={`/payment/${service.service_code}`}
            className="service-card"
            key={service.service_code}
          >
            <img src={service.service_icon} alt={service.service_name} />
            <p className="name">{service.service_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
