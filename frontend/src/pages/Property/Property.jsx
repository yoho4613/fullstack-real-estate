import React, { useContext, useState } from "react";
import "./Property.css";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import UserDetailContext from "../../context/UserDetailContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["property", id], () =>
    getProperty(id)
  );
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("Booking Cancelled", { position: "bottom-right" });
    },
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="lie">
          <Heart id={id} />
        </div>
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ${data?.price}
              </span>
            </div>

            <div className="flexStart facilities">
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Rooms</span>
              </div>
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility"></div>
              <AiTwotoneCar size={20} color="#1F3E72" />
              <span>{data?.facilities?.parking || 0} Parking</span>
            </div>
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}, {data?.suburb}, {data?.city}
              </span>
            </div>

            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button disabled={cancelling} variant="outline" w={"100%"} color="red" onClick={() => cancelBooking()}>
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  Your viewing already booked for date{" "}
                  {bookings?.find((booking) => booking.id === id).date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your viewing
              </button>
            )}

            {modalOpened && (
              <BookingModal
                opened={modalOpened}
                setOpened={setModalOpened}
                propertyId={id}
                email={user?.email}
              />
            )}
          </div>

          <div className="map">
            <Map
              address={data?.address}
              suburb={data?.suburb}
              city={data?.city}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
