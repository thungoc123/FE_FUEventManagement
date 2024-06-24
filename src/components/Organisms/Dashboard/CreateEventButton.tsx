import React, { Component } from 'react'
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
    Input,
  } from "@relume_io/relume-ui"
  import { BiLogoGoogle } from "react-icons/bi";
export default class CreateEventButton extends Component {
  render() {
    return (
<Dialog>
  <DialogTrigger asChild>
    <Button>Create Event</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogOverlay className="bg-black/25" />
    <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12 md:data-[state=open]:duration-300 md:data-[state=open]:animate-in md:data-[state=closed]:animate-out md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0 md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=open]:slide-in-from-left-1/2">
      <DialogHeader>
        <DialogTitle className="mb-2">CREATE EVENT</DialogTitle>
        <DialogDescription>Input The Information Of Your Event</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center gap-2">
          <Label htmlFor="time">Time</Label>
          <Input id="time" placeholder='Time'/>
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="tittle">Tittle</Label>
          <Input id="tittle" type="tittle" placeholder='Tittle'/>
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="tag">Tag</Label>
          <Input id="tag" type="tag" placeholder='Tag'/>
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="speaker">Speaker</Label>
          <Input id="speaker" type="speaker" placeholder='Speaker'/>
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" type="location" placeholder='Location'/>
        </div>
      </div>
      <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
        <Button>Submit</Button>
       
      </div>
      <DialogFooter className="mt-6">
        <span>Already have an account?</span>
        <Button asChild variant="link" size="link">
          <a href="https://drive.google.com/drive/u/0/folders/1SsuRQxIvdQ8OX2dGVRL-1sC0EuuntUKX" target="_blank" rel="noopener" className="underline">
            Log in
          </a>
        </Button>
      </DialogFooter>
    </DialogContent>
  </DialogPortal>
</Dialog>
    )
  }
}
