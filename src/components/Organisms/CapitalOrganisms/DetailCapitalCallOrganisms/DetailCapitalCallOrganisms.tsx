import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetEventDetailsQuery } from "../../../../Features/Event/eventDisplayApi";
import NavbarZZ from "../../../Molecules/NavbarZZ";
import Payment from "../PaymentOrganisms/PaymentOrganisms";
import TransactionTerms from "../TransactionTerms/TransactionTerms"; // Adjust the import path as needed
import "react-toastify/dist/ReactToastify.css";

const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}(${hours}:${minutes}:${seconds})`;
};

const DetailCapitalCallOrganisms: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { data: event, error, isLoading } = useGetEventDetailsQuery(eventId!);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading event details.</div>;
  }

  if (!event) {
    return <div>No event found.</div>;
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  const handleTermsAccepted = () => {
    setHasReadTerms(true);
    setIsChecked(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <NavbarZZ />
      <div
        style={{
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h1 style={{ fontSize: "30px" }}>Event Details</h1>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "30px",
            padding: "30px",
          }}
        >
          <div style={{ width: "60%" }}>
            {Array.isArray(event.eventImages) ? (
              event.eventImages.map((image, index) => (
                <img
                  style={{
                    width: "80%",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  key={index}
                  src={image.url}
                  alt={`Event Image ${index}`}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <h3>Event name: {event.name}</h3>
            <p>Time open event: {formatDateTime(event.timestart)}</p>
            <p>Time closed event : {formatDateTime(event.timeend)}</p>
            <p>Description: {event.description}</p>
            <p>Price: {event.price} VND</p>
            <p>Time Open Sale: {formatDateTime(event.timeopensale)}</p>
            <p>Time Close Sale: {formatDateTime(event.timeclosesale)}</p>
            <p>State: {event.stateEvent.name}</p>
            <div>
              <h4>Schedules:</h4>
              {event.eventSchedules && event.eventSchedules.length > 0 ? (
                <ul>
                  {event.eventSchedules.map((schedule) => (
                    <li key={schedule.id}>
                      <p>Name: {schedule.name}</p>
                      <p>Actor: {schedule.actor}</p>
                      <p>Date: {formatDateTime(schedule.date)}</p>
                      <p>Time Start: {formatDateTime(schedule.timestart)}</p>
                      <p>Duration: {schedule.duration}</p>
                      <p>Type: {schedule.eventType}</p>
                      <p>Description: {schedule.description}</p>
                      <p>Location: {schedule.location}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No schedules available</p>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <span>
              I have read and agree to the transaction terms and conditions
            </span>
            <input
              type="checkbox"
              disabled={!hasReadTerms}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleModalOpen}
            >
              Transaction terms
            </button>
          </div>
        </div>
        {hasReadTerms && isChecked && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button onClick={handlePaymentClick}>
              Pay for this event call capital
            </button>
          </div>
        )}
        <TransactionTerms isOpen={isModalOpen} onClose={handleModalClose} onTermsAccepted={handleTermsAccepted} />

        <Payment isOpen={isPaymentModalOpen} onClose={handlePaymentModalClose} eventId={eventId!} />
      </div>
    </>
  );
};

export default DetailCapitalCallOrganisms;
