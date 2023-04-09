import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { clearBooking } from "../../redux/features/bookingSlice";
import swal from "sweetalert";
import { updateWallet } from "../../redux/features/userSlice";
import toast from "react-hot-toast";

import BookingCalendar from "./BookingCalendar";

import { EmptyCart } from "../../assets/CartIcon";

function BookingSection({ salon }) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const slotBooking = useSelector((state) => state.booking);
  const { isLoggedIn, wallet } = useSelector((state) => state.user);



  useEffect(() => {
    return () => {
      dispatch(clearBooking());
    };
  }, []);

  function showPaymentOptions() {
    if (!wallet) return handleBooknow("online");
    swal({
      title: "Select Payment Option",
      text: `Choose your preferred payment option, wallet balance Rs.${wallet}.00 , amount to be paid in online
       ${salon.actualPrice - salon.actualPrice * (salon.discountPercentage / 100) - wallet < 0 ? "0" : salon.actualPrice - salon.actualPrice * (salon.discountPercentage / 100) - wallet
        }`,
      buttons: {
        offline: {
          text: "include wallet",
          value: "wallet",
          className: "bg-green-500 uppercase",
        },
        online: {
          text: "fully Online Payment",
          value: "online",
          className: "bg-green-500 uppercase",
        },
      },
    }).then((value) => {
      // The value parameter contains the value of the clicked button
      if (value === "wallet") return handleBooknow("wallet");
      else if (value === "online") return handleBooknow("online");
    });
  }

  async function handleBooknow(method) {
    const token = localStorage.getItem("user");
    console.log(token)
    try {
      let response = await axios.post(
        "/book",
        { salon: salon._id, method, slotDate: slotBooking.date, slotTime: slotBooking.slot },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response", response);
      if (response.status === 201) {
        dispatch(updateWallet({ wallet: response.data.wallet }));
        toast.success(`salon Booked Successfully`);
        navigate("/confirmation");
        return;
      }
      initPayment(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  function initPayment(datas) {
    const token = localStorage.getItem("user");
    try {

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEYID,
        amount: datas.amount,
        currency: datas.currency,
        name: salon.venueName,
        description: "payment for book a slot",
        image: salon.image,
        order_id: datas.id,
        handler: async (response) => {
          try {
            console.log("hey");
            const { data } = await axios.post(
              "/verifyPayment",
              {
                ...response,
                salonId: salon._id,
                slotDate: slotBooking.date,
                slotTime: slotBooking.slot,
                price: datas.amount,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            dispatch(updateWallet({ wallet: data.wallet }))
            navigate("/confirmation");
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="bg-[#F3F5F9]">
      <div className="container">
        <div className="flex flex-col md:flex-row space-x-10">
          {isLoggedIn ? (
            <>
              <div className=" md:mx-0 md:w-8/12 my-11 space-y-6   ">
                {
                  salon.slots?.length && (
                    <div className="bg-white rounded-lg">
                      <div className="py-2 hidden sm:block">
                        <span className=" py-2 px-3 w-3 -ml-7 bg-[#1a273a] text-white rounded-full">2</span>
                        <a className="text-2xl font-roboto font-semibold mx-2 text-[#504a4a] ">Select Slots</a>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 px-4 py-5">
                        <BookingCalendar slots={salon.slots} salonId={salon._id} />
                      </div>
                    </div>
                  )}
              </div>
              {slotBooking.slot ? (
                <>
                  <div className="basis-4/12 bg-white h-80 rounded-lg my-11 grid p-2 relative">
                    <div className="text-[#504a4a64] h-16 rounded bg-[#a7b4ca3c] flex items-start justify-between px-2 w-full text-2xl">
                      <div>
                        <p>{slotBooking.date}</p>

                      </div>
                      <div className="flex flex-col items-end">
                        <p>{slotBooking.slot}</p>
                        <p className="text-sm">₹{salon.actualPrice - (salon.actualPrice * salon.discountPercentage) / 100}</p>
                      </div>
                    </div>
                    <div className="bg-green-400/70 absolute bottom-0 rounded-b-md text-xl w-full">
                      <div className="p-1 text-white">
                        <button className="bg-green-600/90 rounded py-1 px-2" onClick={showPaymentOptions}>
                          BOOK NOW{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="basis-4/12 bg-white h-80 rounded-lg my-11 grid justify-items-center relative">
                    <div className="mt-16 justify-items-center space-y-5 grid absolute top-0">
                      <div className="text-[#504a4a64] text-8xl">
                        <EmptyCart />
                      </div>
                      <h1 className="font-bold text-[#504a4ad0]">Hudle Up!</h1>
                      <p className="text-[#504a4ad0]">Book your style now! &#129321;</p>
                    </div>
                    <div className="bg-green-400/70 absolute bottom-0 rounded-b-md text-xl py-2 w-full">
                      <h1 className="ml-4 text-white">Please select slots</h1>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full my-11 space-y-6   ">
              <div className="bg-[#a7b4ca3c] rounded-lg">
                <div className="flex px-4 justify-between py-5 space-x-9 ">
                  <p className="text-[#504a4ad0]">Please login to see available facility and slots</p>
                  <Link to="/signin" className="bg-green-700 hover:bg-green-800 text-white rounded px-4 py-2">
                    LOGIN
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingSection;
