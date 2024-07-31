import { useState, ChangeEvent, FormEvent } from "react";
import { useGetEventDetailsQuery } from "../../../Features/Event/eventDisplayApi";
import { useCallCapitalMutation } from "../../../Features/CreateCapital/CreateCapital";
import { ToastContainer, toast } from "react-toastify";
import NavbarS from "../../Molecules/NavbarS";
import "react-toastify/dist/ReactToastify.css";

const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} (${hours}:${minutes}:${seconds})`;
};

const CreateCallCapitalOrganisms = () => {
  const [eventId, setEventId] = useState<string>("");
  const [fetchEventId, setFetchEventId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [capital, setCapital] = useState<number | null>(null);
  const [eoShare, setEoShare] = useState<number>(0);
  const [callCapitalShare, setCallCapitalShare] = useState<number>(0);
  const [callCapital, { isLoading: isCallingCapital }] =
    useCallCapitalMutation();

  const {
    data: event,
    error,
    isLoading,
  } = useGetEventDetailsQuery(fetchEventId!, {
    skip: !fetchEventId,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventId(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchEventId(eventId);
    setShowDetails(false); // Reset the details view when a new event is fetched
  };

  const handleCapitalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setCapital(value);
      setEoShare(value * 0.3);
      setCallCapitalShare(value * 0.7);
    } else {
      setCapital(null);
      setEoShare(0);
      setCallCapitalShare(0);
    }
  };

  const handleCapitalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (capital && eventId) {
      try {
        const result = await callCapital({
          eventId: eventId,
          fundraising: capital,
        }).unwrap();
        toast.success("Capital call initiated successfully!");
        console.log("Capital call response:", result);
      } catch (err) {
        console.error("Failed to initiate capital call:", err);
        toast.error("Failed to initiate capital call.");
      }
    } else {
      toast.error(
        "Please enter a valid capital amount and fetch the event first."
      );
    }
  };

  return (
    <>
      <NavbarS />
      <div style={{ width: "100%", padding: "10px" }}>
        <ToastContainer />
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            padding: "40px 0px",
            fontSize: "30px",
          }}
        >
          What event do you want to call capital?
        </h1>
        <form
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
          onSubmit={handleFormSubmit}
        >
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid black",
            }}
          >
            <label htmlFor="eventId">Enter Event ID: </label>
            <input
              style={{ textAlign: "center" }}
              type="text"
              id="eventId"
              value={eventId}
              onChange={handleInputChange}
              required
            />
            <button
              style={{
                borderRadius: "20px",
                border: "1px solid black",
                padding: "10px",
              }}
              type="submit"
            >
              Call capital for this event
            </button>
          </div>
        </form>
        {isLoading && <div>Loading...</div>}
        {!isLoading && error && <div>Error loading event details.</div>}
        {!isLoading && !event && fetchEventId && (
          <div style={{ width: "100%", textAlign: "center" }}>
            No event found with ID {fetchEventId}
          </div>
        )}
        {!isLoading && event && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div style={{ width: "100%", padding: "20px" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setShowDetails(!showDetails)}
              >
                <h1 style={{ fontSize: "20px" }}>Some information of event</h1>
                <span style={{ fontSize: "20px" }}>
                  {showDetails ? "▲" : "▼"}
                </span>
              </div>
              {showDetails && (
                <div
                  style={{ width: "100%", display: "flex", marginTop: "20px" }}
                >
                  <div style={{ width: "400px", height: "400px" }}>
                    {Array.isArray(event.eventImages) ? (
                      event.eventImages.map((image, index) => (
                        <img
                          style={{ width: "80%", borderRadius: "20px" }}
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
                      width: "60%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "20px",
                    }}
                  >
                    <h3>Event name: {event.name}</h3>
                    <p>Time open event: {formatDateTime(event.timestart)}</p>
                    <p>Time closed event: {formatDateTime(event.timeend)}</p>
                    <p>Description: {event.description}</p>
                    <p>Price: {event.price} VND</p>
                    <p>Time Open Sale: {formatDateTime(event.timeopensale)}</p>
                    <p>
                      Time Close Sale: {formatDateTime(event.timeclosesale)}
                    </p>
                    <p>State: {event.stateEvent.name}</p>
                    <div>
                      <h4>Schedules:</h4>
                      {event.eventSchedules &&
                      event.eventSchedules.length > 0 ? (
                        <ul>
                          {event.eventSchedules.map((schedule) => (
                            <li key={schedule.id}>
                              <p>Name: {schedule.name}</p>
                              <p>Actor: {schedule.actor}</p>
                              <p>Date: {formatDateTime(schedule.date)}</p>
                              <p>
                                Time Start: {formatDateTime(schedule.timestart)}
                              </p>
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
              )}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1
                style={{ width: "100%", textAlign: "center", fontSize: "25px" }}
              >
                Create Call Capital Event
              </h1>
              <form
                onSubmit={handleCapitalSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    border: "1px solid black",
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                >
                  <label htmlFor="capital">Enter capital money: </label>
                  <input
                    type="text"
                    id="capital"
                    onChange={handleCapitalChange}
                    required
                    style={{ textAlign: "center", marginBottom: "10px" }}
                  />
                  <button
                    type="submit"
                    style={{
                      borderRadius: "20px",
                      border: "1px solid black",
                      padding: "10px",
                    }}
                    disabled={isCallingCapital}
                  >
                    {isCallingCapital ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
              <div style={{ display: "flex", gap: "20rem", padding: "20px" }}>
                <div
                  style={{
                    border: "1px solid black",
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                >
                  <p>Own capital: (EO% always 30%)</p>
                  <p style={{ textAlign: "center" }}>{eoShare} VND</p>
                </div>
                <div
                  style={{
                    border: "1px solid black",
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                >
                  <p>Call capital: (Sponsor% always 70%)</p>
                  <p style={{ textAlign: "center" }}>{callCapitalShare} VND</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateCallCapitalOrganisms;
