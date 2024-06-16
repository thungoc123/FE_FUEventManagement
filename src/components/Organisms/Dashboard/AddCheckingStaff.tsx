import React from 'react'
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
    SelectValue
} from "@relume_io/relume-ui"

export const AddCheckingStaff: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-common">Add Checking Staff</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/25" />
        <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12 md:data-[state=open]:duration-300 md:data-[state=open]:animate-in md:data-[state=closed]:animate-out md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0 md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=open]:slide-in-from-left-1/2">
          <DialogHeader>
            <DialogTitle className="mb-2">Add Checkings Staff</DialogTitle>
            <DialogDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="feedback">Staff ID</Label>
              <Select>
                <SelectTrigger id="feedback">
                  <SelectValue placeholder="Select one..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feedback1">Feedback 1</SelectItem>
                  <SelectItem value="feedback2">Feedback 2</SelectItem>
                  <SelectItem value="feedback3">Feedback 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
            <Button>Done</Button>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default AddCheckingStaff;
