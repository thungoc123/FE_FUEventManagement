import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiPencil, BiBookmark, BiDotsHorizontalRounded, BiMap, BiSearch } from "react-icons/bi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { sponsorApi, useGetEventByStateQuery, useGetListSponsorProgramQuery } from "../../../Features/Sponsor/sponsorApi";
import { truncateString } from "../../../ulities/Stringhandle";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@relume_io/relume-ui"
import SearchFilterForm from "../../Atoms/SearchFilterForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import { useEffect, useState } from "react";
import { EOevent, sponsorEvent } from "../../../Types/eo.type";
// import { useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { accountID } from "../../../ulities/ProtectedRoute";
import { useAddEventToSponsorProgramMutation, useGetEventByAccountQuery } from "../../../Features/Sponsor/sponsorApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";


type AddEventToSponsorProps = {
sponsorId: number 
};
export const AddEventToSponsor:React.FC<AddEventToSponsorProps> = (props) => {
                         // const {id} = useParams();
  const navigate = useNavigate()
  const [fill, setFill] = useState("");
  const dispatch = useDispatch();
  const [addEventToSponsorProgram , isLoading] = useAddEventToSponsorProgramMutation()
  const account = accountID(sessionStorage.getItem('token'));
  const [selectedEvent, setSelectedEvent] = useState('');

  const {data: events, isLoading: eventLoading, error: eventError} = useGetEventByAccountQuery()

  if (eventLoading) return <div>Loading...</div>;
  if (eventError) return <div>Error: {eventError.message}</div>;
//   console.log(events)
                     


  console.log(events)


//   const [sponsorProgramId, setSponsorProgramId] = useState(0);
  const formData = {
    sponsorProgramId: props.sponsorId,
    eventIds: [0] // Giả sử đây là mảng ID sự kiện ban đầu
  };
  

                         
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    formData.eventIds = [parseInt(selectedEvent)];
                    
      
    console.log(JSON.stringify(formData));
  

    try {
      await addEventToSponsorProgram({sponsorProgramId: formData.sponsorProgramId,newSponsorEvent:formData}).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Add event successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      window.location.reload();
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Add event unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      console.error("Failed to create the event:", err);
      setFill("This Email is already existed !")
    }
  }
  if (eventLoading) return <div>Loading...</div>;
  if (eventError) return <div>Error: {eventError.message}</div>;
  return (
      <Dialog>
      <DialogTrigger asChild>
                        <Button>Add Event</Button>
                      </DialogTrigger>
                      <DialogPortal>
                        <DialogOverlay className="bg-black/50" />
                        <DialogContent className="w-full max-w-md bg-white p-10 md:p-12">
                          <DialogHeader>
                            <DialogTitle>Please search and select event</DialogTitle>
                            <DialogDescription>1 Sponsor program can have more than 3 event</DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmit}>
                          <div className="grid items-center gap-2">
                            <Label htmlFor="Objectives">Event</Label>
    
                         <select onChange={(e) => setSelectedEvent(e.target.value)} value={selectedEvent} className="flex min-h-11 w-full items-center justify-between gap-1 whitespace-nowrap border border-border-primary bg-transparent px-3 py-2 text-text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
        <option value="" className="flex min-h-11 w-full items-center justify-between gap-1 whitespace-nowrap border border-border-primary bg-transparent px-3 py-2 text-text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">Select one...</option>
        {events?.map((event) => (
          <option className="flex min-h-11 w-full items-center justify-between gap-1 whitespace-nowrap border border-border-primary bg-transparent px-3 py-2 text-text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>

                          </div>
                          <DialogFooter>
                            <Button size="primary" className="mt-4">
                              {isLoading ? "Add" :"Loading..." }
                            </Button>
                          </DialogFooter>
                          </form>
                        </DialogContent>
                      </DialogPortal>
                    </Dialog>
  );
};

