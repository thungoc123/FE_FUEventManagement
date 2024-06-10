import React from 'react';

export const QuestionForm: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Let's start with question</h2>
        <p className="mb-8 text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
        </p>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="question">
              Question
            </label>
            <input
              id="question"
              name="question"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
              placeholder="Enter Question"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="type">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
            >
              <option>Multi choice</option>
              <option>Single choice</option>
              <option>Open-ended</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="answer1">
              Answer 1
            </label>
            <input
              id="answer1"
              name="answer1"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
              placeholder="Enter Answer 1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="answer2">
              Answer 2
            </label>
            <input
              id="answer2"
              name="answer2"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
              placeholder="Enter Answer 2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="answer3">
              Answer 3
            </label>
            <input
              id="answer3"
              name="answer3"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
              placeholder="Enter Answer 3"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">
              Cancel
            </button>
            <div className="flex space-x-4">
              <button type="submit" className="px-4 py-2 text-white bg-black rounded-lg">
                Done
              </button>
              <button type="button" className="px-4 py-2 text-white bg-black rounded-lg">
                More Question
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
