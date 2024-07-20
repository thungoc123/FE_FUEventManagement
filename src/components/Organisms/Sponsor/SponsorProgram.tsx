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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { sponsorApi, useDeleteEventFromSponsorProgramMutation, useDeleteSponsorProgramMutation, useGetEventByAccountQuery, useGetEventByStateQuery, useGetListSponsorProgramQuery } from "../../../Features/Sponsor/sponsorApi";
import { truncateString } from "../../../ulities/Stringhandle";

import { BiLogoGoogle, BiX } from "react-icons/bi";
import SearchFilterForm from "../../Atoms/SearchFilterForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import { useEffect, useState } from "react";
import { EOevent, sponsorEvent } from "../../../Types/eo.type";
import { useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { accountID } from "../../../ulities/ProtectedRoute";
import { AddEventToSponsor } from "../Dashboard/AddEventToSponsor";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { setTab } from "../../../Features/Utils/tabSlice";
import EventTag from "../../Atoms/EventTag";

export const GridList6 = () => {
  const { data: sponsor, isLoading, error } = useGetListSponsorProgramQuery()
  const { data: events, isLoading: eventLoading, error: eventError } = useGetEventByAccountQuery()
  console.log(events)
  console.log(sponsor)
  const sponsorwithEvent = events?.filter((event) => event.sponsorProgramEvents?.some(e => e.sponsorProgramId === 2))
  console.log(sponsorwithEvent)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [deleteSponsorProgram] = useDeleteSponsorProgramMutation()
  const [deleteEventFromSponsorProgram] = useDeleteEventFromSponsorProgramMutation()
  // console.log(sponsor)
  const handleDelete = async (e: MouseEvent<HTMLButtonElement>, sponsorProgramId: number) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của button nếu có

    try {
      await deleteSponsorProgram(sponsorProgramId).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Sponsor Program deleted successfully",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );

      window.location.reload();
    } catch (error) {
      console.error('Failed to delete the staff:', error);
      alert('Failed to delete the staff');
    }
  };

  const handleEventDelete = async (e: MouseEvent<HTMLButtonElement>, sponsorProgramId: number, eventId: number) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của button nếu có

    try {
      await deleteEventFromSponsorProgram({sponsorProgramId:sponsorProgramId ,eventId: eventId}).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Event deleted successfully",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );

      window.location.reload();
    } catch (error) {
      console.error('Failed to delete the staff:', error);
      alert('Failed to delete the staff');
    }
  };
  return (
    <section>
      {isLoading ? "isLoading" : (
        <>
          <div className="grid auto-cols-fr grid-cols-1 items-end gap-4 pb-5 md:grid-cols-[1fr_max-content] md:gap-6 md:pb-6">
            <div className="w-full max-w-lg">
              {/* <h1 className="text-xl font-bold md:text-2xl">{heading}</h1> */}
              {/* <p className="mt-2">{description}</p> */}
            </div>
            <div className="flex items-center justify-between md:justify-normal">

              <Button className="w-[110px] mx-4 py-2" onClick={(e) => navigate("/sponsor/dashboard/create")}>New</Button>
            </div>
          </div>
          <div className="grid w-full auto-cols-fr grid-cols-1 gap-6 lg:grid-cols-2">
            {sponsor.map((property, index) => (
              <div
                key={index}
                className="grid auto-cols-fr grid-cols-1 items-center border border-border-primary md:grid-cols-[0.5fr_1fr]"
              >
                <div className="size-full overflow-hidden">
                  <img
                    src={property.thumbnail}
                    alt=""
                    className="aspect-square size-full object-cover"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <h2 className="text-md font-bold leading-[1.4] md:text-xl">{property.title}</h2>
                    <div className="p-2">

                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <BiDotsHorizontalRounded className="size-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem><Button size="link" variant="link" onClick={(e) => handleDelete(e, property.id)}>Delete</Button></DropdownMenuItem>
                          <DropdownMenuItem><Button size="link" variant="link" onClick={(e) => navigate(`/sponsor/dashboard/program/update/${property.id}`)}>Edit</Button></DropdownMenuItem>
                          <DropdownMenuItem>Publish</DropdownMenuItem>
                          {/* <DropdownMenuItem><Button onClick={(e) => navigate(`/sponsor/dashboard/program/addEvent/${property.id}`)}>Add Event</Button></DropdownMenuItem> */}

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="mb-3 md:mb-4" dangerouslySetInnerHTML={{ __html: truncateString(property.description, 150, "...") }} />
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <BiMap className="size-6" />
                      <span className="text-sm">{property.location}</span>
                      
                    </div>
                   
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                  {events?.filter((event) => event.sponsorProgramEvents?.some(e => e.sponsorProgramId === property.id)).map((event) => (
                        <div className="bg-gray-100 text-gray-800 font-semibold py-1 px-3  inline-block mb-10 flex">
                          <span className='flex items-center' data-id = {property.id}>{event.name}<BiX onClick={(e) => handleEventDelete(e,property.id,event.id)} className='ml-1 text-red-600 cursor-pointer' /></span>
                        </div>))}
                        </div>
                  <div className="mt-5 flex items-center justify-between gap-4 md:mt-6">
                    <div>
                      {/* <span className="text-xl font-bold md:text-2xl">{property.state}</span> */}
                      <span className={`before:content-['_']`}>{property.state}</span>
                    </div>
                    {/* <Button >Add Event</Button> // dialog */}
                    <AddEventToSponsor sponsorId={property.id} />

                  </div>
                </div>
                <Button >Add Survey</Button>
              </div>
            ))}
          </div>
        </>
      )}


    </section>
  );
};
