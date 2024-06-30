import { Button, Input, Label, Textarea } from "@relume_io/relume-ui";
import React, { useState } from "react";
import EventTag from "../Atoms/EventTag";
import { BiCalendarAlt, BiTime, BiHourglass } from "react-icons/bi";

export const EventSchedule = () => {
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
            <Label htmlFor="name">Schedule Name</Label>

            <Input
              type="text"
              id="name"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="objectives"
            >
              Date
            </label>
            {/* <DatePicker /> */}
        
            <Input
              id="search"
              placeholder="Search"
              icon={<BiCalendarAlt className="size-6" />}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="time"
            >
              Time
            </label>
            <Input
              type="email"
              id="time"
              placeholder="Hours"
              value=""
              icon={<BiTime className="size-6" />}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="Duration"
            >
              Duration
            </label>
            <Input
              type="email"
              id="Duration"
              placeholder="Hours"
              value=""
              icon={<BiHourglass className="size-6" />}

              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
