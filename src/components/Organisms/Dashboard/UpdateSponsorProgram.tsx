import React, { ChangeEvent, useEffect, useState } from "react";
import { Label, Input, Button } from "@relume_io/relume-ui";
import { uploadImage } from "../../../ulities/s3Image";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCreateSponsorMutation, useGetListSponsorProgramQuery, useUpdateSponsorProgramMutation } from "../../../Features/Sponsor/sponsorApi";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { RootState } from "../../../Store/Store";
import { useNavigate, useParams } from "react-router-dom";
import { accountID } from "../../../ulities/ProtectedRoute";
import { ApplicationShell4 } from "./ApplicationShell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
export const UpdateProgram = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  
 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
 
  const accountId = accountID(sessionStorage.getItem('token'));

  const { data: sponsor, isLoading, error } = useGetListSponsorProgramQuery()
  const sponsorProgram = sponsor?.find((sponsor) => sponsor.id == parseInt(id))
  // console.log(sponsorProgram)
  const [name, setName] = useState(sponsorProgram?.title);
  const [website, setWebsite] = useState(sponsorProgram?.link);
  const [location, setLocation] = useState(sponsorProgram?.location);
  const [editorData, setEditorData] = useState(sponsorProgram?.description);
  const [updateSponsorProgram] = useUpdateSponsorProgramMutation()
  const [publish, setPublish] = useState(sponsorProgram?.state);

  const [fileAddress, setFileAddress] = useState(sponsorProgram?.thumbnail);
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

  const program = {
    title: name,
    websiteLink: website,
    location: location,
    thumbnail: fileAddress,
    description: editorData,
    state: publish,
    eventIds: [],
    accountId: accountId
  };

  // useEffect(() => {
  //   if (sponsorProgram) {
  //     setProgram({
  //       title: sponsorProgram.title,
  //       websiteLink: sponsorProgram.link,
  //       location: sponsorProgram.location,
  //       thumbnail: sponsorProgram.thumbnail,
  //       description: sponsorProgram.description,
  //       state: publish,
  //       eventIds: [],
  //       accountId: accountId
  //                          });
  //                        }
  //                      }, [sponsorProgram, accountId]); 
  // console.log(program)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(program));
    try {
      await updateSponsorProgram({sponsorProgramId: id,updateSponsorProgram: program}).unwrap();
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Update sponsor program successfully!',
        type: 'success',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      navigate('/sponsor/dashboard/program')
      // alert('Event created successfully!');
    } catch (err) {
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Update sponsor program unsuccessfully!',
        type: 'error',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      console.error('Failed to create the event:', err);
    }
  };

  return (
    <ApplicationShell4 
    
    MainComponent={
      <div className="w-[70%] m-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid  gap-y-5 m-5">
          <Label htmlFor="email">Name</Label>
          <Input
            id="Name"
            placeholder="Email"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="Website">Website</Label>
          <Input
            id="Website"
            placeholder="Http://"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
        />
        </div>
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="location">Publish</Label>
          <Select onValueChange={(value) => setPublish(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLISH">PUBLISH</SelectItem>
                <SelectItem value="UNPUBLISH">UNPUBLISH</SelectItem>
              </SelectContent>
          </Select>
        </div>
       
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="Website">Image</Label>
          <Input type="file" onChange={handleFileChange} 
          />

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
            data={editorData}
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
          <Button variant="secondary" onClick={(e) => navigate('/sponsor/dashboard/program')}>Cancel</Button>
        </div>
      </form>
    </div>
    }
    />
    
  );
};
