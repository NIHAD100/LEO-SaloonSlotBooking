import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

function VMDashboardjsx() {
  const [latestBooking, setLatestBooking] = useState([]);

  useEffect(() => {
    const getDashboardDetails = async () => {
      try {
        const token = localStorage.getItem("vm");
        let { data } = await axios.get("/vm", {
          headers: {
            Authorization: token,
          },
        });
        console.table(data.latestBooking);
        setLatestBooking(data.latestBooking);
      } catch (error) {
        console.log(error);
      }
    };
    getDashboardDetails();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col p-2 items-center shadow-md justify-center space-y-2 h-auto rounded bg-gradient-to-b from-gray-100 to-gray-300 dark:bg-gray-800">
            <p className="text-sm font-roboto text-gray-500 dark:text-gray-500">TOTAL ONLINE BOOKING</p>
            <p className="text-4xl text-gray-700 font-bold">5</p>
          </div>
          <div className="flex flex-col p-2 items-center shadow-md justify-center space-y-2 h-auto rounded bg-gradient-to-b from-gray-100 to-gray-300 dark:bg-gray-800">
            <p className="text-sm font-roboto text-gray-500 dark:text-gray-500">TOTAL ONLINE COLLECTION</p>
            <p className="text-4xl text-gray-700 font-bold">1</p>
          </div>
          <div className="flex flex-col p-2 items-center shadow-md justify-center space-y-2 h-auto rounded bg-gradient-to-b from-gray-100 to-gray-300 dark:bg-gray-800">
            <p className="text-sm font-roboto text-gray-500 dark:text-gray-500">UPCOMING BOOKING</p>
            <p className="text-4xl text-gray-700 font-bold">3</p>
          </div>
        </div>
        <div className="flex-col sm:flex-row h-auto justify-center md:justify-start mb-4 rounded border bg-gray-50 dark:bg-gray-800">
          <div className="p-2">
            <h1 className="text-md bg-gradient-to-r from-gray-100 to-gray-300 p-3 border">QUICK BOOKING</h1>
          </div>
          <div>
            <div className=" rounded-lg">
              <div className="flex px-4 py-5  space-x-9 ">
                <div className="border rounded-md">
                  <div className="p-2">
                    <h1 className="font-semibold text-xl text-[#504a4ad0] ">ANFIELD SALON </h1>
                    <p className="text-[#504a4ad0]">
                      <span>3</span> facilities/session available
                    </p>
                  </div>
                  <div className="pt-3">
                    <div className="border p-1 flex justify-between items-center bg-[#F3F5F9]">
                      <div>
                        <h1 className="text-bold text-xl">₹250</h1>
                        <p className="text-sm text-[#504a4ad0]">onwards</p>
                      </div>
                      {/* <div>
                        <button className="bg-emerald-400/70 text-white px-2 rounded">BOOK</button>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="border rounded-md">
                  <div className="p-2">
                    <h1 className="font-semibold text-xl text-[#504a4ad0] ">MARCA SALON</h1>
                    <p className="text-[#504a4ad0]">
                      <span>3</span> facilities/session available
                    </p>
                  </div>
                  <div className="pt-3">
                    <div className="border p-1 flex justify-between items-center bg-[#F3F5F9]">
                      <div>
                        <h1 className="text-bold text-xl">₹150</h1>
                        <p className="text-sm text-[#504a4ad0]">onwards</p>
                      </div>
                      {/* <div>
                        <button className="bg-emerald-400/70 text-white px-2 rounded">BOOK</button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-2 gap-4 mb-4">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <p className="my-2">LATEST BOOKING</p>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    VENUE NAME
                  </th>
                 
                  <th scope="col" class="px-6 py-3">
                    TIME
                  </th>
                  <th scope="col" class="px-6 py-3">
                    DATE
                  </th>
                  <th scope="col" class="px-6 py-3">
                    PRICE
                  </th>
                </tr>
              </thead>
              <tbody>
                {latestBooking.length ? (
                  latestBooking.map((per, index) => (
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        {per.venueName}
                      </th>
                      <td class="px-6 py-4">{per.slotTime + " " + per.slotDate}</td>
                      <td class="px-6 py-4">{per.slotDate}</td>
                      <td class="px-6 py-4">₹{per.price}</td>
                    </tr>
                  ))
                ) : (
                  <div className="flex justify-center items-center p-5">
                    <p className="text-2xl sm:text-4xl">No bookings available</p>
                  </div>
                )}
              </tbody>
            </table>
          </div>

          { }
        </div>
      </div>
    </div>
  );
}

export default VMDashboardjsx;