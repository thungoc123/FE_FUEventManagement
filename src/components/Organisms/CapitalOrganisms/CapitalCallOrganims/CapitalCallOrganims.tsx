// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useGetAllEventsQuery } from "../../../../Features/EventManage/eventApi"; // Adjust the import path as needed
// import { EOevent } from "../../../../Types/eo.type"; // Adjust the import path as needed
// import NavbarZ from "../../../Molecules/NavbarZ"; // Adjust the import path as needed
// import Adventage from "../../../Molecules/Adventage";

// // Function to format date
// const formatDateTime = (dateTimeString: string): string => {
//   const date = new Date(dateTimeString);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const seconds = String(date.getSeconds()).padStart(2, "0");
//   return `${year}-${month}-${day}(${hours}:${minutes}:${seconds})`;
// };

// // Function to subtract days from a date
// const subtractDays = (dateString: string, days: number): string => {
//   const date = new Date(dateString);
//   date.setDate(date.getDate() - days);
//   return date.toISOString();
// };

// const EventLoading: React.FC = () => {
//   const [currentPublishedPage, setCurrentPublishedPage] = useState(1);
//   const [currentUnpublishedPage, setCurrentUnpublishedPage] = useState(1);
//   const [currentHappenedPage, setCurrentHappenedPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const eventsPerPage = 4;

//   const { data: events, error, isLoading } = useGetAllEventsQuery();

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const filterEvents = (events: EOevent[]) => {
//     return events.filter(event =>
//       event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (event.eventSchedules && event.eventSchedules.some(schedule =>
//         schedule.location.toLowerCase().includes(searchTerm.toLowerCase())
//       )) ||
//       event.timestart.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   if (isLoading) {
//     return <div className="loader"></div>; // Apply the loader class for loading state
//   }

//   if (error) {
//     const errorMessage =
//       "status" in error
//         ? `Error: ${error.status}`
//         : "message" in error
//         ? error.message
//         : "An unknown error occurred";

//     return <div>{errorMessage}</div>;
//   }

//   const publishedEvents = filterEvents(events?.filter((event: EOevent) => event.stateEvent.name === "PUBLISHED") || []);
//   const unpublishedEvents = filterEvents(events?.filter((event: EOevent) => event.stateEvent.name === "UNPUBLISHED") || []);
//   const happenedEvents = filterEvents(events?.filter((event: EOevent) => event.stateEvent.name === "HAPPENED") || []);

//   // Pagination calculations
//   const paginate = (events: EOevent[], currentPage: number) => {
//     const indexOfLastEvent = currentPage * eventsPerPage;
//     const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//     return events.slice(indexOfFirstEvent, indexOfLastEvent);
//   };

//   const currentPublishedEvents = paginate(publishedEvents, currentPublishedPage);
//   const currentUnpublishedEvents = paginate(unpublishedEvents, currentUnpublishedPage);
//   const currentHappenedEvents = paginate(happenedEvents, currentHappenedPage);

//   const totalPublishedPages = Math.ceil(publishedEvents.length / eventsPerPage);
//   const totalUnpublishedPages = Math.ceil(unpublishedEvents.length / eventsPerPage);
//   const totalHappenedPages = Math.ceil(happenedEvents.length / eventsPerPage);

//   const handleNextPage = (setCurrentPage: React.Dispatch<React.SetStateAction<number>>, currentPage: number, totalPages: number) => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = (setCurrentPage: React.Dispatch<React.SetStateAction<number>>, currentPage: number) => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const renderEvents = (events: EOevent[], isPublished: boolean) => (
//     events.map(event => (
//       <li key={event.id} style={{ width: "300px", border: "1px solid black", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
//         <div style={{ position: "relative", height: "150px", overflow: "hidden" }}>
//           {Array.isArray(event.eventImages) ? (
//             event.eventImages.map((image, index) => (
//               <img key={index} src={image.url} alt={`Event ${index}`} style={{ width: "100%", height: "auto" }} />
//             ))
//           ) : (
//             <p>{event.eventImages ?? "No images available"}</p>
//           )}
//         </div>
//         <div style={{ padding: "10px" }}>
//           <p style={{ fontSize: "11px" }}>{formatDateTime(subtractDays(event.timestart, 100))} to {formatDateTime(subtractDays(event.timestart, 10))}</p>
//           <h3 style={{ fontSize: "1.2em", margin: "10px 0" }}>{event.name}</h3>
//           {event.eventSchedules && event.eventSchedules.length > 0 ? (
//             <ul>
//               {event.eventSchedules.map(schedule => (
//                 <li key={schedule.id} style={{ marginBottom: "10px" }}>
//                   <p>Type: {schedule.eventType}</p>
//                   <p>Location: {schedule.location}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No schedules available</p>
//           )}
//           <p style={{ color: "green", fontWeight: "bold" }}>Ticket selling price: {event.price}VND</p>
//           {isPublished && (
//             <Link to={`/sponsor/dashboard/program/call-capital/detail/${event.id}`} style={{ textDecoration: "none", color: "blue" }}>
//               View detail
//             </Link>
//           )}
//         </div>
//       </li>
//     ))
//   );

//   return (
//     <>
//       <NavbarZ />
//       <Adventage />
//       <div style={{width:"100%", display:"flex", justifyContent:"flex-end", padding:"20px"}}>
//         <div style={{width:"20%"}}>
//           <input 
//             type="text" 
//             placeholder="Search event" 
//             style={{width:"100%", padding:"10px", borderRadius:"10px", border:"1px solid black", margin:"20px 0"}}
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>
//       </div>
//       <div style={{ width: "100%", padding: "20px" }}>
//         <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize:"40px" }}>LIST OF EVENTS CALLING FOR CAPITAL</h1>
//         <div>
//         <div style={{padding:"20px", textAlign:"center"}}>
//              <h2 style={{background:"black", color:"whitesmoke"}}> PUBLISHED EVENTS</h2>
//           </div>
//           {publishedEvents.length === 0 ? (
//             <p>No published events found.</p>
//           ) : (
//             <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginBottom: "40px" }}>
//               {renderEvents(currentPublishedEvents, true)}
//             </ul>
//           )}
//           <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
//             <button style={{width:"150px", background:"black", borderRadius:"10px", color:"whitesmoke"}} onClick={() => handlePrevPage(setCurrentPublishedPage, currentPublishedPage)} disabled={currentPublishedPage === 1}>
//               Previous
//             </button>
//             <button style={{width:"150px", background:"black", borderRadius:"10px", color:"whitesmoke"}} onClick={() => handleNextPage(setCurrentPublishedPage, currentPublishedPage, totalPublishedPages)} disabled={currentPublishedPage === totalPublishedPages}>
//               Next
//             </button>
//           </div>
//         </div>
//         <div>
//           <div style={{padding:"20px", textAlign:"center"}}>
//              <h2 style={{background:"black", color:"whitesmoke"}}>UNPUBLISHED EVENTS</h2>
//           </div>
//           {unpublishedEvents.length === 0 ? (
//             <p>No unpublished events found.</p>
//           ) : (
//             <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginBottom: "40px" }}>
//               {renderEvents(currentUnpublishedEvents, false)}
//             </ul>
//           )}
//           <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
//             <button style={{width:"150px", background:"black", borderRadius:"10px", color:"whitesmoke"}} onClick={() => handlePrevPage(setCurrentUnpublishedPage, currentUnpublishedPage)} disabled={currentUnpublishedPage === 1}>
//               Previous
//             </button>
//             <button style={{width:"150px", background:"black", borderRadius:"10px", color:"whitesmoke"}} onClick={() => handleNextPage(setCurrentUnpublishedPage, currentUnpublishedPage, totalUnpublishedPages)} disabled={currentUnpublishedPage === totalUnpublishedPages}>
//               Next
//             </button>
//           </div>
//         </div>
//         <div>
//           <div style={{padding:"20px", textAlign:"center"}}>
//              <h2 style={{ background:"black", color:"whitesmoke"}}>HAPPENED EVENTS</h2>
//           </div>
//           {happenedEvents.length === 0 ? (
//             <p>No happened events found.</p>
//           ) : (
//             <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginBottom: "40px" }}>
//               {renderEvents(currentHappenedEvents, false)}
//             </ul>
//           )}
//           <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
//             <button style={{width:"150px", background:"black", borderRadius:"10px", color:"whitesmoke"}} onClick={() => handlePrevPage(setCurrentHappenedPage, currentHappenedPage)} disabled={currentHappenedPage === 1}>
//               Previous
//             </button>
//             <button style={{width:"150px", background:"black", borderRadius:"10px", color:"whitesmoke"}} onClick={() => handleNextPage(setCurrentHappenedPage, currentHappenedPage, totalHappenedPages)} disabled={currentHappenedPage === totalHappenedPages}>
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EventLoading;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery } from "../../../../Features/EventManage/eventApi"; // Adjust the import path as needed
import { EOevent } from "../../../../Types/eo.type"; // Adjust the import path as needed
import NavbarZ from "../../../Molecules/NavbarZ"; // Adjust the import path as needed
import Adventage from "../../../Molecules/Adventage";

// Function to format date
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

// Function to subtract days from a date
const subtractDays = (dateString: string, days: number): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const EventLoading: React.FC = () => {
  const [currentPublishedPage, setCurrentPublishedPage] = useState(1);
  const [currentUnpublishedPage, setCurrentUnpublishedPage] = useState(1);
  const [currentHappenedPage, setCurrentHappenedPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const eventsPerPage = 4;

  const { data: events, error, isLoading } = useGetAllEventsQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterEvents = (events: EOevent[]) => {
    return events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.eventSchedules && event.eventSchedules.some(schedule =>
        schedule.location.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
      event.timestart.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (isLoading) {
    return <div className="loader"></div>; // Apply the loader class for loading state
  }

  if (error) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status}`
        : "message" in error
        ? error.message
        : "An unknown error occurred";

    return <div>{errorMessage}</div>;
  }

  const publishedEvents = filterEvents(events?.filter((event: EOevent) => event.stateEvent.name === "PUBLISHED") || []);
  const unpublishedEvents = filterEvents(events?.filter((event: EOevent) => event.stateEvent.name === "UNPUBLISHED") || []);
  const happenedEvents = filterEvents(events?.filter((event: EOevent) => event.stateEvent.name === "HAPPENED") || []);

  // Pagination calculations
  const paginate = (events: EOevent[], currentPage: number) => {
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    return events.slice(indexOfFirstEvent, indexOfLastEvent);
  };

  const currentPublishedEvents = paginate(publishedEvents, currentPublishedPage);
  const currentUnpublishedEvents = paginate(unpublishedEvents, currentUnpublishedPage);
  const currentHappenedEvents = paginate(happenedEvents, currentHappenedPage);

  const totalPublishedPages = Math.ceil(publishedEvents.length / eventsPerPage);
  const totalUnpublishedPages = Math.ceil(unpublishedEvents.length / eventsPerPage);
  const totalHappenedPages = Math.ceil(happenedEvents.length / eventsPerPage);

  const handleNextPage = (setCurrentPage: React.Dispatch<React.SetStateAction<number>>, currentPage: number, totalPages: number) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = (setCurrentPage: React.Dispatch<React.SetStateAction<number>>, currentPage: number) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderEvents = (events: EOevent[], showDetails: boolean) => (
    events.map(event => (
      <li key={event.id} style={{ width: "300px", border: "1px solid black", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ position: "relative", height: "150px", overflow: "hidden" }}>
          {Array.isArray(event.eventImages) ? (
            event.eventImages.map((image, index) => (
              <img key={index} src={image.url} alt={`Event ${index}`} style={{ width: "100%", height: "auto" }} />
            ))
          ) : (
            <p>{event.eventImages ?? "No images available"}</p>
          )}
        </div>
        <div style={{ padding: "10px" }}>
          <p style={{ fontSize: "11px" }}>{formatDateTime(subtractDays(event.timestart, 100))} to {formatDateTime(subtractDays(event.timestart, 10))}</p>
          <h3 style={{ fontSize: "1.2em", margin: "10px 0" }}>{event.name}</h3>
          {event.eventSchedules && event.eventSchedules.length > 0 ? (
            <ul>
              {event.eventSchedules.map(schedule => (
                <li key={schedule.id} style={{ marginBottom: "10px" }}>
                  <p>Type: {schedule.eventType}</p>
                  <p>Location: {schedule.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No schedules available</p>
          )}
          <p style={{ color: "green", fontWeight: "bold" }}>Ticket selling price: {event.price}VND</p>
          {showDetails && (
            <Link to={`/sponsor/dashboard/program/call-capital/detail/${event.id}`} style={{ textDecoration: "none", color: "blue" }}>
              View detail
            </Link>
          )}
        </div>
      </li>
    ))
  );

  return (
    <>
      <NavbarZ />
      <Adventage />
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: "20px" }}>
        <div style={{ width: "20%" }}>
          <input 
            type="text" 
            placeholder="Search event" 
            style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid black", margin: "20px 0" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div style={{ width: "100%", padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize:"40px" }}>LIST OF EVENTS CALLING FOR CAPITAL</h1>
        <div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2 style={{ background: "black", color: "whitesmoke" }}>PUBLISHED EVENTS</h2>
          </div>
          {publishedEvents.length === 0 ? (
            <p>No published events found.</p>
          ) : (
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginBottom: "40px" }}>
              {renderEvents(currentPublishedEvents, false)}
            </ul>
          )}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
            <button style={{ width: "150px", background: "black", borderRadius: "10px", color: "whitesmoke" }} onClick={() => handlePrevPage(setCurrentPublishedPage, currentPublishedPage)} disabled={currentPublishedPage === 1}>
              Previous
            </button>
            <button style={{ width: "150px", background: "black", borderRadius: "10px", color: "whitesmoke" }} onClick={() => handleNextPage(setCurrentPublishedPage, currentPublishedPage, totalPublishedPages)} disabled={currentPublishedPage === totalPublishedPages}>
              Next
            </button>
          </div>
        </div>
        <div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2 style={{ background: "black", color: "whitesmoke" }}>UNPUBLISHED EVENTS</h2>
          </div>
          {unpublishedEvents.length === 0 ? (
            <p>No unpublished events found.</p>
          ) : (
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginBottom: "40px" }}>
              {renderEvents(currentUnpublishedEvents, true)}
            </ul>
          )}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
            <button style={{ width: "150px", background: "black", borderRadius: "10px", color: "whitesmoke" }} onClick={() => handlePrevPage(setCurrentUnpublishedPage, currentUnpublishedPage)} disabled={currentUnpublishedPage === 1}>
              Previous
            </button>
            <button style={{ width: "150px", background: "black", borderRadius: "10px", color: "whitesmoke" }} onClick={() => handleNextPage(setCurrentUnpublishedPage, currentUnpublishedPage, totalUnpublishedPages)} disabled={currentUnpublishedPage === totalUnpublishedPages}>
              Next
            </button>
          </div>
        </div>
        <div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2 style={{ background: "black", color: "whitesmoke" }}>HAPPENED EVENTS</h2>
          </div>
          {happenedEvents.length === 0 ? (
            <p>No happened events found.</p>
          ) : (
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginBottom: "40px" }}>
              {renderEvents(currentHappenedEvents, false)}
            </ul>
          )}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
            <button style={{ width: "150px", background: "black", borderRadius: "10px", color: "whitesmoke" }} onClick={() => handlePrevPage(setCurrentHappenedPage, currentHappenedPage)} disabled={currentHappenedPage === 1}>
              Previous
            </button>
            <button style={{ width: "150px", background: "black", borderRadius: "10px", color: "whitesmoke" }} onClick={() => handleNextPage(setCurrentHappenedPage, currentHappenedPage, totalHappenedPages)} disabled={currentHappenedPage === totalHappenedPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventLoading;
