import React, { useEffect, useState } from 'react';
import UserNavbar from '../../components/user/UserNavbar';
import SingleVenuejsx from '../../components/user/SingleVenuejsx';
import BookingSection from '../../components/user/BookingSection';
import UserFooter from '../../components/user/UserFooter';
import venueDetailsPart from '../../components/user/venueDetailsPart';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

function SingleVenue() {

  const [venue, setVenue] = useState({});

  const [part, setPart] = useState("bookingSection");

  const { id } = useParams();
  useEffect(() => {
    const getPerTurf = async () => {
      try {
        let { data } = await axios.get(`/venue/${id}`);
        console.log(data);
        setVenue(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPerTurf();
  }, []);

  
  return (
     <div>
      <SingleVenuejsx venue={venue} part={part} setPart={setPart} />
      {part === "bookingSection" ? <BookingSection venue={venue} /> : <venueDetailsPart venue={venue} /> }
    </div>
  )
}

export default SingleVenue
