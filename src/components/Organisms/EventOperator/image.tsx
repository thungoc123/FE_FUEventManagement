import { Button, Input, Label } from "@relume_io/relume-ui";
import { EventImage } from "../../../Types/eo.type";
import React, { ChangeEvent, useState } from "react";
import { RootState } from "../../../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../../../ulities/s3Image";
// import { useAddImageMutation } from "../../../Features/EventManage/eventApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useAddImageMutation, useDeleteImageMutation } from "../../../Features/EventManage/eventApi";
import { BiTrash, BiExport } from "react-icons/bi";
import { setTab } from "../../../Features/Utils/tabSlice";
import { Alert } from "../../Molecules/Alert";



// export type Gallery5Props = React.ComponentPropsWithoutRef<"section"> &
//   Partial<Props>;

export const Gallery5 = () => {
  const { id } = useParams();
  const Events = useSelector((state: RootState) => state.events.events);
  const images = Events?.find(event => event.id === parseInt(id))?.eventImages || []

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileAddress, setFileAddress] = useState("");
  const [annouce, setAnnouce] = useState(Boolean);
  const dispatch = useDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const key = `${selectedFile.name}`; // Ví dụ: path/in/s3/example.jpg

    try {
      const location = await uploadImage(selectedFile, key);
      setFileAddress(
        "https://swpproject.s3.ap-southeast-2.amazonaws.com/" +
          `${selectedFile.name}`
      );
      // console.log("File uploaded successfully at", location)
      setAnnouce(location);
    } catch (error) {
      alert("Error uploading file");
    }
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Đầu tiên, xử lý file change
    await handleFileChange(e);

    // Sau khi file change được xử lý xong, thực hiện upload
    await handleUpload();
  };
  const newImage = {
    eventId: id,
    imagesUrl: fileAddress 
  }
  
  const [addImage, { isLoading, isSuccess, isError, error }] = useAddImageMutation()
  const [deleteImage] = useDeleteImageMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newImage);
    
    try {
      await addImage({id, newImage}).unwrap();
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Add Image successfully!',
        type: 'success',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      dispatch(setTab("img"));
      // window.location.reload()
    } catch (err) {
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Add Image unsuccessfully!',
        type: 'error',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
    }
  };
  const handleDelete = async (e: MouseEvent<HTMLButtonElement>, imageId: string) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của button nếu có

    try {
      await deleteImage({imageId}).unwrap();
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Delete Image successfully!',
        type: 'success',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      dispatch(setTab("img"));
      // window.location.reload()
    } catch (error) {
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Delete Image unsuccessfully!',
        type: 'error',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      console.error('Failed to delete image:', error);
      alert('Failed to delete image');
    }
  };
  return (
    <section className="px-[5%] md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-2 items-start justify-center gap-6 md:gap-8 lg:grid-cols-3">
          {images.map((image, index) => (
             <div
             key={index}
             className="w-40 h-40 relative inline-block m-2"
           >
            <a
              key={index}
              href=""
              className="ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
            >
              <img
                src={image.url}
                
                className="size-full object-cover"

              />
      <Button size="icon" variant="link"  onClick={(e) => handleDelete(e,image.id)}>

              <BiTrash  className="absolute top-2 right-2 text-white bg-red-700 p-1 rounded-full cursor-pointer"
            size={24} />
                  </Button>

            </a>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="Image">Image</Label>
          <p>Vui lòng click vào icon bên dưới trước khi click vào upload, xin lỗi vì sự bất tiện này. </p>
          <Input type="file" onChange={handleFileChange} />
          <Alert text={annouce ? "Upload Image successfully" : "Upload Image unsuccessfully"}/>

          <a href="" onClick={(e)=> e.preventDefault()}> 
          <BiExport onClick={handleUpload} />
          </a>
          <Button>
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
        </form>
      </div>


    </section>
  );
;


}