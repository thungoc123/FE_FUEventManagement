import React, { useState } from 'react';
import { useGetSponsorProfitsQuery } from '../../../Features/Sponsor/sponsorProfit';
import { useNavigate } from 'react-router-dom';

const SponsorEventProfit = () => {
  const [totalEventProfit, setTotalEventProfit] = useState<number | string>('');
  const [eventId, setEventId] = useState<number>(3); // Assuming eventId is 3 for the example
  const { data: sponsorProfits, error, isLoading } = useGetSponsorProfitsQuery({ eventId, totalEventProfit: Number(totalEventProfit) }, {
    skip: !totalEventProfit,
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalEventProfit(e.target.value);
  };

  // Display loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error loading sponsor profits</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <label htmlFor="totalProfit" className="block text-sm font-medium text-gray-700">Total Event Profit</label>
        <input
          type="number"
          id="totalProfit"
          value={totalEventProfit}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden px-4 py-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Sponsor ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Sponsor Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Profit Percentage
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {sponsorProfits?.map((profit) => (
              <tr key={profit.sponsorId}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-gray-800">{profit.sponsorId}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-gray-800">{profit.sponsorName}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-gray-800">{profit.profitPercentage}%</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => navigate(`/sponsor-program/${profit.sponsorId}`)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SponsorEventProfit;
