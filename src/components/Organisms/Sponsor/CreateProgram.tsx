import React from "react";
import { Label, Input, Button } from "@relume_io/relume-ui";
import CkEditor from "../../Atoms/CKEditor";
export const CreateProgram = () => {
  
  return (
    <div className="w-[70%] m-auto">
       
      <div className="grid  gap-y-5 m-5">
        <Label htmlFor="email">Name</Label>
        <Input id="Name" placeholder="Email" />
      </div>
      <div className="grid gap-y-5 m-5">
        <Label htmlFor="Website">Website</Label>
        <Input id="Website" placeholder="Http://" />
      </div>
      <div className="grid gap-y-5 m-5">
        <Label htmlFor="Website">Location</Label>
        <Input id="Website" placeholder="Address" />
      </div>
      <div className="grid gap-y-5 m-5">
        <Label htmlFor="Website">Location</Label>
        <Input type="file" />
      </div>
      <div className="grid gap-y-5 m-5">
        <Label htmlFor="Website">Description</Label>
        <CkEditor />
      </div>
      <div className="flex mt-5 justify-end m-5">
        <Button variant="primary" className="mr-2">Save</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  );
};
