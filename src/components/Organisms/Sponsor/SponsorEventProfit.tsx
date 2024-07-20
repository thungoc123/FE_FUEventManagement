import React, { useState } from 'react';
import { useGetSponsorProfitsQuery } from '../../../Features/Sponsor/sponsorProfit';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import { EventProfit } from '../EventOperator/EventProfit';

const SponsorEventProfit = () => {
  const accountIdString = useSelector((state: RootState) => state.auth.accountId);
  const accountId = accountIdString !== null ? Number(accountIdString) : null;
  const [totalEventProfit, setTotalEventProfit] = useState<number | string>('');
  const [eventId, setEventId] = useState<number | string>('');

  const { data: sponsorProfits, error, isLoading, refetch } = useGetSponsorProfitsQuery(
    { eventId: Number(eventId), accountId: accountId!, totalEventProfit: Number(totalEventProfit) },
    { skip: !totalEventProfit || accountId === null || !eventId }
  );

  const navigate = useNavigate();

  const handleFetch = () => {
    if (eventId && accountId && totalEventProfit) {
      refetch();
    }
  };
console.log(accountId)
console.log(eventId)
console.log(totalEventProfit)


  const tableHeaders = [
    'Sponsor ID',
    'Sponsor Name',
    'Profit Percentage',
    'Amount Received',
  ];

  const tableRows = sponsorProfits?.map((profit) => ({
    'Sponsor ID': profit.sponsorId,
    'Sponsor Name': profit.companyName,
    'Profit Percentage': profit.sponsorProfitPercent,
    'Amount Received': profit.profitAmount  
  })) || [];
  console.log(sponsorProfits);

  const tableHeaderClasses = [
    'px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider',
    'px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider',
    'px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider',
    'px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider',
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Event ID:
        </label>
        <input
          type="number"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Total Event Profit:
        </label>
        <input
          type="number"
          value={totalEventProfit}
          onChange={(e) => setTotalEventProfit(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        onClick={handleFetch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Fetch Data
      </button>

      {isLoading && <div className="loader"></div>}

      {error && <div>Error loading sponsor profits</div>}

      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden px-4 py-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} className={tableHeaderClasses[index]}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {tableRows.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-gray-800">{cell}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SponsorEventProfit;
