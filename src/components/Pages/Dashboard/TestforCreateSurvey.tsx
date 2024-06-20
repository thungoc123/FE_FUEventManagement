import React from "react";
import { Button, Checkbox, Input, Label, Textarea } from "@relume_io/relume-ui";
import EventTag from "../../Atoms/EventTag";
// import EventTag from "../Atoms/EventTag";

export const SurveyForm: React.FC = () => {
  return (
    <div className="flex items-left justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-lg p-8 bg-white h-1/3 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Let's start with your survey
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros.
        </p>
        <form>
          <div className="mb-4">
          <Label htmlFor="Email">Survey</Label>

            <Input
              type="email"
              id="email"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="objectives"
            >
              Objectives
            </label>
            <Textarea
              id="message"
              placeholder="Type your message..."
              className="min-h-[11.25rem] overflow-auto"
              value=""
              // onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="event"
            >
              Event
            </label>
            <Input
              type="email"
              id="email"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div className="mb-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
              <span>Event Name</span>
              <button type="button" className="text-red-500">×</button>
            </div>
          </div> */}
          <EventTag text="Event Name" />
          <div className="flex items-center justify-between">
          <Button
              variant="secondary"
              size="sm"
            >
              Cancel
            </Button>
            
            <Button
              variant="primary"
              size="sm"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
