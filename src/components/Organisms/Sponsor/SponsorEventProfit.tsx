import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import { useGetSponsorProfitsQuery } from "../../../Features/Sponsor/sponsorProfit";
import { accountID } from "../../../ulities/ProtectedRoute";

const SponsorEventProfit = () => {
  const token = sessionStorage.getItem("token");
  const accountId = token ? accountID(token) : null;

  console.log(typeof(accountId));

  useEffect(() => {
    console.log("Current accountId:", accountId);
  }, [accountId]);

  // Only call API if accountId is not null
  const {
    data: sponsorProfits,
    error,
    isLoading,
  } = useGetSponsorProfitsQuery(accountId!, {
    skip: accountId === null,
  });

  const tableHeaders = [
    "Event Name",
    "Sponsor Name",
    "Profit Percentage",
    "Amount Received",
  ];

  const tableRows =
    sponsorProfits?.map((profit) => ({
      "Event Name": profit.eventName,
      "Sponsor Name": profit.companyName,
      "Profit Percentage": `${profit.sponsorProfitPercent} %`,
      "Amount Received": `${profit.profitAmount} VND`,
    })) || [];

  const tableHeaderClasses = [
    "px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider",
    "px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider",
    "px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider",
    "px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
                  >
                    <div className="text-sm leading-5 text-gray-800">
                      {cell}
                    </div>
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
