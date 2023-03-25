import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { venues } from "../../../redux/thunk/vm/turfThunk";
import { updateVenueIsBlocked } from '../../../redux/features/vm/venuesSlice'
import swal from 'sweetalert'
import toast,{ Toaster } from "react-hot-toast";
import axios from "../../../api/axios";

// function VMAllVenue() {

//     const [section, setSection] = useState('venues')
//     const [venues,setVenues] = useState([])

//     useEffect(()=>{
//         const getVenues = async () => {
//             const {data} = await axios.get('/vm/venues');
//             console.log(data);
//             setVenues(data);
//         }
//         getVenues();
//     },[]);

function VMAllVenue() {
  const [section, setSection] = useState("venues");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(venues());
  }, []);
  const selectedvenues = useSelector((state) => state.vmVenues);
  console.log(selectedvenues);

  const handleBlock = (id, status) => {
    const vmToken = localStorage.getItem("vm");
    swal({
      title: `${status ? "Unblock venue?" : "Block venue?"}`,
      text: `Are you sure you want to ${
        status ? "Unblock" : "Block"
      } this venue?`,
      icon: "warning",
      buttons: ["Cancel", `${status ? "Unblock" : "Block"}`],
      dangerMode: status ? false : true,
    }).then((confirm) => {
      if (confirm) {
        // Perform block action
        axios
          .put("/vm/venues/block", JSON.stringify({ id }), {
            headers: {
              "Content-Type": "application/json",
              Authorization: vmToken
            },
            withCredentials: true,
          })
          .then((response) => {
            dispatch(updateVenueIsBlocked({id}))
            toast.success(
              `venues ${status ? "unblocked" : "blocked"} successfully!`
            );
          }).catch(err=>{
            console.log(err.message)
          })
      }
    });
  };

  return (
    <div class="p-4 sm:ml-64">
        <Toaster position="top-right" />
      <div class="p-4 rounded-lg dark:border-gray-700 mt-14">
        <div class="grid gap-4 mb-4">
          <div>
            <Link to="/vm/venues/add" className="bg-green-400 font-roboto p-3 rounded-md shadow-lg hover:bg-green-500 duration-300 cursor-pointer float-right">
              Add new venue
            </Link>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Photo
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Venue name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Slots
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Document
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Admin Approve Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Admin Block status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedvenues.venues.length ? (
                  selectedvenues.venues.map((venue) => (
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img src={venue.image} alt="" className="h-16" />
                      </th>
                      <td class="px-6 py-4">{venue.venueName}</td>
                      <td class="px-6 py-4">{`${venue.place} , ${venue.district} `}</td>
                      <td class="px-6 py-4">{venue.slots.length}</td>
                      <td class="px-6 py-4 ">
                        <span className="mr-3 line-through">&#8377;{venue.actualPrice}</span>
                        &#8377;{venue.sellingPrice}
                      </td>
                      <td class="px-6 py-4">{venue.description}</td>
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img src={venue.document} alt="" className="h-16" />
                      </th>
                      <td class="px-6 py-4">{venue.approved ? 'approved' : 'not approved'}</td>
                      <td class="px-6 py-4">{venue.isBlocked ? "Blocked" : "Unblocked"}</td>
                      <td class="px-6 py-4 space-x-2">
                      <a
                          href="#"
                          onClick={() =>
                            handleBlock(venue._id, venue.vmIsBlocked)
                          }
                          className={`font-medium rounded ${
                            venue.vmIsBlocked
                              ? "bg-green-600 hover:bg-green-700 duration-300"
                              : "bg-red-600 hover:bg-red-700 duration-300"
                          } p-2 text-white `}
                        >
                          {venue.vmIsBlocked ? "Unblock" : "Block"}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No venues Availabel...</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VMAllVenue;
