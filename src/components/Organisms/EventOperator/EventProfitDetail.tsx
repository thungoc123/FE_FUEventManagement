import { useParams } from 'react-router-dom';
import { BiCube } from 'react-icons/bi';
import StatCard from '../Sponsor/StateCard';
import { useGetEventTotalAmountQuery } from '../../../Features/Event/eventAmoutApi';
import { useGetSponsorProfitQuery } from '../../../Features/Event/sponsorPercent';

const EventProfitDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: totalAmountData, error: totalAmountError, isLoading: isTotalAmountLoading } = useGetEventTotalAmountQuery(id!);

  const totalEventProfit = totalAmountData?.totalAmountRaised ?? 0;

  const { data: sponsorProfitData, error: sponsorProfitError, isLoading: isSponsorProfitLoading } = useGetSponsorProfitQuery(
    { id: id ?? '', totalEventProfit },
    { skip: !id }
  );

  const statCardsData = [
    {
      title: 'Tổng lợi nhuận của sự kiện',
      value: isTotalAmountLoading ? 'Loading...' : totalAmountError ? 'Error' : `${totalAmountData?.totalAmountRaised} VND`,
      description: '',
      icon: <BiCube className="text-4xl text-gray-600" />,
    },
  ];

  if (sponsorProfitData) {
    sponsorProfitData.forEach((sponsor, index) => {
      const sponsorPercentage = totalEventProfit ? ((sponsor.profitAmount / totalEventProfit) * 100).toFixed(2) : '0.00';

      statCardsData.push({
        title: `Sponsor số ${index + 1} - ${sponsor.companyName}`,
        value: `${sponsor.profitAmount} VND`,
        description: `${sponsorPercentage}%`,
        icon: <BiCube className="text-4xl text-gray-600" />,
      });
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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