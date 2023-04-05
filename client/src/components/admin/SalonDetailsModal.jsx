import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useDispatch } from "react-redux";
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, useControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const Geocoder = () => {
  const ctrl = new MapboxGeocoder({
    accessToken: import.meta.env.VITE_MAP_TOKEN,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
  });
  return null;
};

function SalonDetailsModal({ salons, setModal, id, handleBlock, handleApprove }) {
  const [salon, setSalon] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const adminToken = localStorage.getItem("admin");
    axios
      .get(`/admin/salon/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminToken,
        },
      })
      .then(({ data }) => {
        setSalon(data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => console.log("completed"));
  }, [salons]);

  return (
    <>
      {salon && (
        <div id="extralarge-modal" tabIndex="-1" className={`fixed flex justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}>
          <div className="relative w-full h-full max-w-7xl md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{salon.venueName}</h3>
                <button
                  onClick={() => setModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="extralarge-modal"
                >
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className=" lg:flex ">
                  <div>
                    <label htmlFor="vmName" className="text-gray-700">
                      Manager :{" "}
                    </label>
                    <input type="text" name="vmName" id="vmName" defaultValue={salon.vmId.name} className="text-black capitalize" />
                  </div>
                  <div>
                    <label htmlFor="vmName" className="text-gray-700">
                      Place :{" "}
                    </label>
                    <input type="text" name="vmName" id="vmName" defaultValue={salon.place} className="text-black capitalize" />
                  </div>
                  <div>
                    <label htmlFor="vmName" className="text-gray-700">
                      District :{" "}
                    </label>
                    <input type="text" name="vmName" id="vmName" defaultValue={salon.district} className="text-black capitalize" />
                  </div>
                </div>
                <div className="lg:flex">
                  <div>
                    <label htmlFor="vmName" className="text-gray-700">
                      mobile :{" "}
                    </label>
                    <input type="text" name="vmName" id="vmName" defaultValue={salon.mobile} className="text-black capitalize" />
                  </div>
                  <div>
                    <label htmlFor="vmName" className="text-gray-700">
                      actual Price :{" "}
                    </label>
                    <input type="text" name="vmName" id="vmName" defaultValue={salon.actualPrice} className="text-black capitalize" />
                  </div>
                  <div>
                    <label htmlFor="vmName" className="text-gray-700">
                      Discount % :{" "}
                    </label>
                    <input type="text" name="vmName" id="vmName" defaultValue={salon.discountPercentage} className="text-black capitalize" />
                  </div>
                  <div>
                    <label htmlFor="vmName" className="text-gray-700">
                      Description :{" "}
                    </label>
                    <input type="text" name="vmName" id="vmName" defaultValue={salon.description} className="text-black capitalize" />
                  </div>
                </div>
                <div>
                  <div className="overflow-x-auto whitespace-nowrap">
                    <div className="inline-flex space-x-4">
                      {salon.slots.map((slot) => (
                        <label className="flex items-center space-x-2 bg-gray-100 rounded-lg p-4">
                          <span className="text-gray-700">{slot.day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div>
                    <img src={salon.image} className="w-72" alt="" />
                  </div>
                  <div>
                    <img src={salon.document} className="w-72" alt="" />
                  </div>
                </div>
                <div>
                  <ReactMapGL
                    mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
                    initialViewState={{
                      longitude: salon.lng,
                      latitude: salon.lat,
                      zoom: 7,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                  >
                    <Marker latitude={salon.lat} longitude={salon.lng} draggable onDragEnd={(e) => { }} />
                    <NavigationControl position="bottom-right" />
                    <GeolocateControl position="top-left" trackUserLocation onGeolocate={(e) => { }} />
                    <Geocoder />
                  </ReactMapGL>
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                {!salon.approved ? (
                  <>
                    <button
                      data-modal-hide="extralarge-modal"
                      onClick={() => handleApprove(salon._id, "approve")}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Approve
                    </button>
                    <button
                      data-modal-hide="extralarge-modal"
                      type="button"
                      onClick={() => handleApprove(salon._id, "decline")}
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Decline
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleBlock(salon._id, salon.isBlocked)
                      }}
                      data-modal-hide="extralarge-modal"
                      type="button"
                      className={`text-white ${salon.isBlocked ? "bg-green-600 hover:bg-green-700 duration-300" : "bg-red-600 hover:bg-red-700 duration-300"
                        } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    >
                      {salon.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SalonDetailsModal;
