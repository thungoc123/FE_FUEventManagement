import {
<<<<<<< HEAD
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
=======
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from "@relume_io/relume-ui";
  import type { ButtonProps } from "@relume_io/relume-ui";
  import { BiDotsHorizontalRounded, BiMap, BiSearch } from "react-icons/bi";
import {  useNavigate } from "react-router-dom";
// import { sponsorApi, useGetListSponsorProgramQuery } from "../../../Features/Sponsor/sponsorApi";
import { truncateString } from "../../../ulities/Stringhandle";
import { useGetListSponsorProgramQuery } from "../../../Features/Sponsor/sponsorDashboardApi";
  
  type ImageProps = {
    src: string;
    alt?: string;
>>>>>>> TienMerge
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
<<<<<<< HEAD
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
=======
  
  type Props = {
    heading: string;
    description: string;
    inputIcon: React.ReactNode;
    selectPlaceholder: string;
    selectItems: string[];
    options: string[];
    properties: PropertyCard[];
  };
  
  export type GridList6Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;
  
  export const GridList6 = (props: GridList6Props) => {
    const { data: sponsor, isLoading, error } = useGetListSponsorProgramQuery()
    console.log(sponsor)
    const navigate = useNavigate()
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
          {/* <Input placeholder="Search" icon={} className="mr-4" /> */}
          {/* <Select>
            <SelectTrigger className="w-[110px] px-4 py-2">
              <SelectValue placeholder={selectPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {selectItems.map((item, index) => (
                <SelectItem key={index} value={`${item.toLowerCase().replace(/\s/g, "-")}`}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
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
              <DropdownMenuItem>Delete</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Publish</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
                </div>
              </div>
              <div className="mb-3 md:mb-4"dangerouslySetInnerHTML={{ __html: truncateString(property.description,150,"...") }} />
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <BiMap className="size-6" />
                  <span className="text-sm">{property.location}</span>
                </div>
               
               
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 md:mt-6">
                <div>
                  {/* <span className="text-xl font-bold md:text-2xl">{property.state}</span> */}
                  <span className={`before:content-['_']`}>{property.state}</span>
>>>>>>> TienMerge
                </div>
                <Button >Add Survey</Button>
              </div>
<<<<<<< HEAD
            ))}
          </div>
        </>
      )}


    </section>
  );
};
=======
            </div>
          </div>
        ))}
      </div>
      </>
              )}


      </section>
    );
  };
  
  export const GridList6Defaults: GridList6Props = {
    heading: "Popular Properties",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    selectPlaceholder: "Sort by",
    inputIcon: <BiSearch className="size-6" />,
    options: ["Option One", "Option Two", "Option Three"],
    selectItems: ["Option 1", "Option 2", "Option 3"],
    properties: [
      {
        image: {
          src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
          alt: "Property Image 1",
        },
        title: "Program 1",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        date: "Jun 23, 2024",
        state: "Unpublish",
        event : "Event 1",
        button: {
          title: "View",
          size: "sm",
        },
      },
      {
        image: {
          src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
          alt: "Property Image 1",
        },
        title: "Program 1",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        date: "Jun 23, 2024",
        state: "Unpublish",
        event : "Event 1",
        button: {
          title: "View",
          size: "sm",
        },
      },
    ],
  };
  
  GridList6.displayName = "GridList6";
  
>>>>>>> TienMerge
