import { useParams } from 'react-router-dom';
import { BiCube } from 'react-icons/bi';
import StatCard from '../Sponsor/StateCard';
import { useGetEventTotalAmountQuery } from '../../../Features/Event/eventAmoutApi';
import { useGetSponsorProfitQuery } from '../../../Features/Event/sponsorPercent';
import { useGetNumberAttendancesQuery } from '../../../Features/Order/ticketApi';

const EventProfitDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: totalAmountData, error: totalAmountError, isLoading: isTotalAmountLoading } = useGetEventTotalAmountQuery(id!);

  const totalEventProfit = totalAmountData?.totalAmountRaised ?? 0;

  const { data: totalNumberVisitor, error: numberError, isLoading: isNumberLoading} = useGetNumberAttendancesQuery(id!);

  const { data: sponsorProfitData, error: sponsorProfitError, isLoading: isSponsorProfitLoading } = useGetSponsorProfitQuery(
    { id: id ?? '', totalEventProfit },
    { skip: !id }
  );

  const statCardsData = [
    {
      title: 'Tổng lợi nhuận của sự kiện',
      value: isTotalAmountLoading ? 'Loading...' : totalAmountError ? 'Error' : `${totalAmountData?.totalAmountRaised}`,
      description: '',
      icon: <BiCube className="text-4xl text-gray-600" />,
    },
  ];

  if (sponsorProfitData) {
    sponsorProfitData.forEach((sponsor, index) => {
      const sponsorPercentage = totalEventProfit ? ((sponsor.profitAmount / totalEventProfit) * 100).toFixed(2) : '0.00';

      statCardsData.push({
        title: `Sponsor số ${index + 1} - ${sponsor.companyName}`,
        value: sponsor.profitAmount,
        description: `${sponsorPercentage}%`,
        icon: <BiCube className="text-4xl text-gray-600" />,
      });
    });
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between h-full w-full card_amount">
      <div className="flex items-center justify-between w-full">
      </div>
      <div className="mt-4 text-center flex-1 flex flex-col justify-center">
        <p className="text-gray-600">Number Attendance</p>
      </div>
      <div className="mt-4 text-center flex-1 flex flex-col justify-center">
        <p className="text-4xl font-bold">{isNumberLoading ? "Is loading" : totalNumberVisitor.totalParticipants}</p>
        <p className="text-gray-600"></p>
      </div>
     
    </div>
      <div className="flex flex-nowrap justify-between gap-4">
        {statCardsData.map((card, index) => (
          <div key={index} className="w-full sm:w-auto lg:w-1/3 p-4 flex justify-center">
            <StatCard
              title={card.title}
              value={card.value}
              description={card.description}
              icon={card.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventProfitDetail;