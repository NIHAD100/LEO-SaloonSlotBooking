import React, { useEffect, useState } from "react";
import SingleVenuejsx from "../../components/user/SingleVenuejsx";
import BookingSection from "../../components/user/BookingSection";
import SalonDetailsPart from "../../components/user/SalonDetailsPart";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

function SingleVenue() {
  const [salon, setSalon] = useState({});

  const [part, setPart] = useState("bookingSection");

  const { id } = useParams();
  useEffect(() => {
    const getPerSalon = async () => {
      try {
        let { data } = await axios.get(`/venue/${id}`);
        setSalon(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPerSalon();
  }, []);

  return (
    <div>
      <SingleVenuejsx salon={salon} part={part} setPart={setPart} />
      {part === "bookingSection" ? <BookingSection salon={salon} /> : <SalonDetailsPart salon={salon} />}
    </div>
  );
}

export default SingleVenue;
