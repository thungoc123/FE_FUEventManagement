import React from 'react';

export const SurveyForm: React.FC = () => {
  return (
    <div className="flex items-left justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Let's start with your survey</h2>
        <p className="mb-8 text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
        </p>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="surveyName">
              Survey Name
            </label>
            <input
              id="surveyName"
              name="surveyName"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
              placeholder="Enter Survey Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="objectives">
              Objectives
            </label>
            <input
              id="objectives"
              name="objectives"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
              placeholder="Enter Objectives"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="event">
              Event
            </label>
            <input
              id="event"
              name="event"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
              placeholder="Enter Event"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
              <span>Event Name</span>
              <button type="button" className="text-red-500">×</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-black rounded-lg">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
