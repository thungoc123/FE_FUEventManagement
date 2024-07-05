import React, { ChangeEvent, useState } from "react";
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
  Button,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Input,
} from "@relume_io/relume-ui";
import Modal from "react-modal";
import { useGetListSponsorPersonQuery } from "../../../Features/Sponsor/sponsorApi";
import { useParams } from "react-router-dom";
import { useAddSponsorToEventMutation } from "../../../Features/EventManage/eventApi";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { setTab } from "../../../Features/Utils/tabSlice";
import { Alert } from "../../Molecules/Alert";



const AddSponsor: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSponsorId, setSelectedSponsorId] = useState(0)
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [seletedSponsor, setSeletedSponsor] = useState('');
  const [fill, setFill] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { data: sponsors } = useGetListSponsorPersonQuery();
  const [sponsorData, setSponsorData] = useState({
    sponsorId: selectedSponsorId,
    eventId: id,
    profitPercentage: profitPercentage,
  });

  const [addSponsorToEvent, {isLoading}] = useAddSponsorToEventMutation()
  const handleSubmit = async (e) => {
    // console.log(sponsorData);
    e.preventDefault();
    sponsors?.find((sponsor) => {
      if (sponsor.companyName === seletedSponsor) {
        sponsorData.sponsorId = sponsor.id;
      }
    },
      setSponsorData({
        ...sponsorData,
        profitPercentage: profitPercentage,
      })
    )
    // console.log(JSON.stringify(sponsorData));
    try {
       await addSponsorToEvent({ eventId: id,newData:sponsorData }).unwrap()
       dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Create staff successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        }),
      );
      dispatch(setTab("sponsor"));
      window.location.reload();

    }catch (error) {
      setFill(true)

      // console.error('Failed to delete the staff:', error);
      // alert('Failed to delete the staff');
    }
  }

  // console.log(sponsors);
  return (
    <>
      <Button onClick={openModal}>Add Sponsor</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        // className="z-"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true} // Đóng khi nhấn phím Escape
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Đảm bảo overlay có thể nhìn thấy được
            pointerEvents: "auto", // Đảm bảo overlay có thể nhận sự kiện nhấp chuột
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <form onSubmit={handleSubmit}>

          <h2 className="mb-4 text-2xl font-bold text-center">
            Add Sponsor      </h2>
          <p className="mb-8 text-center text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros.
          </p>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="time"
            >
              Choose Sponsor
            </label>
            <Select onValueChange={(value) => setSeletedSponsor(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                {sponsors?.map((sponsor) => (<SelectItem value={sponsor.companyName}>{sponsor.companyName}</SelectItem>))
                }
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label htmlFor="profit">Add % Profit</Label>

            <Input
              type="number"
              id="profit"
              // value=""
              name="profitPercentage"
              // onChange={handleChange}
              onChange={(e) => setProfitPercentage(parseInt(e.target.value))}
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button>
              {isLoading ? "Adding" : "Add"}
            </Button>
          </div>
          {fill && <Alert text="This sponsor has already been added !" />}
        </form>

      </Modal >
    </>
  );
};

export default AddSponsor;
