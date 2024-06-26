import React, { ChangeEvent, useEffect, useState } from "react";
import { Label, Input, Button } from "@relume_io/relume-ui";
import { uploadImage } from "../../../ulities/s3Image";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCreateSponsorMutation } from "../../../Features/Sponsor/sponsorApi";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { RootState } from "../../../Store/Store";
import { useNavigate } from "react-router-dom";
export const CreateProgram = () => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editorData, setEditorData] = useState<string>("");
  const [fileAddress, setFileAddress] = useState("");
  const [createSponsor, { isLoading, isSuccess, isError, error }] = useCreateSponsorMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    // const bucketName = 'your-s3-bucket-name';
    const key = `${selectedFile.name}`; // Ví dụ: path/in/s3/example.jpg

    try {
      const location = await uploadImage(selectedFile, key);
      setFileAddress(
        "https://swpproject.s3.ap-southeast-2.amazonaws.com/" +
          `${selectedFile.name}`
      );
    } catch (error) {
      alert("Error uploading file");
    }
  };
  const accountId = useSelector((state: RootState) => state.auth.accountId);

  const programData = {
    
      title: name,
      websiteLink: website,
      location: location,
      thumbnail: fileAddress,
      description: editorData,
      state: "UNPUBLISH",
      eventIds: [],
      accountId: accountId
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(programData);
    try {
      await createSponsor(programData).unwrap();
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Create sponsor successfully!',
        type: 'success',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      navigate('/sponsor/dashboard/program')
      // alert('Event created successfully!');
    } catch (err) {
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Create sponsor unsuccessfully!',
        type: 'error',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      console.error('Failed to create the event:', err);
    }
  };

  return (
    <div className="w-[70%] m-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid  gap-y-5 m-5">
          <Label htmlFor="email">Name</Label>
          <Input
            id="Name"
            placeholder="Email"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="Website">Website</Label>
          <Input
            id="Website"
            placeholder="Http://"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Address"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="Website">Image</Label>
          <Input type="file" onChange={handleFileChange} />
          <span
            className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3"
            onClick={handleUpload}
          >
            Upload to S3
          </span>
        </div>
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="Website">Description</Label>
          <CKEditor
            editor={ClassicEditor}
            data="<p>Type your content here!</p>"
            // Sử dụng đối tượng cấu hình

            onReady={(editor: any) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setEditorData(data);
              console.log({ event, editor, data });
            }}
            onBlur={(event: any, editor: any) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event: any, editor: any) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
        <div className="flex mt-5 justify-end m-5">
          <Button variant="primary" className="mr-2" type="submit">
            Save
          </Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </form>
    </div>
  );
};
