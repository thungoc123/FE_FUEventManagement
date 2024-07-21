import "react-dropdown/style.css";
import { Input } from "@relume_io/relume-ui";
import { BiSearch } from "react-icons/bi";
import { useGetCartQuery } from "../../../Features/Order/cartApi";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../ulities/Stringhandle";
import { accountID } from "../../../ulities/ProtectedRoute";

type Props = {
  paginationItems: number[];
};

const OrderHistoryTable: React.FC<Props> = () => {
  const { data, error, isLoading } = useGetCartQuery("1");
  // const visitorId = sessionStorage.getItem("visitorId");
  console.log(data);
  const accountId = accountID(sessionStorage.getItem("token"));
  console.log(accountId);
  const dataWithAccount =  data?.filter((order: any) =>  String(order.visitor.account.id) === String(accountId));
  console.log(dataWithAccount);
  const navigate = useNavigate();
  // {data.map((order: any, index: number) => (
  //   console.log(order.event)
  // ))}
  console.log(data);

  const handlePaidClick = async (order: any) => {
    // Assuming you have an API endpoint to update the order status to 'PAID'
    navigate("/PaymentPage", { state: { eventDetails: order.event, quantity: 1, ticketId: order.id } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>Cart is empty</div>;
  }

  return (
    <div className="m-18 border border-b-0 border-border-primary p-10">
      <div className="flex justify-between items-center mb-6">
        <div className="sm:w-1/3 lg:w-1/3">
          <h2 className="text-xl font-bold text-left">Order History</h2>
          <p className="text-sm text-gray-600">
            List of your past orders.
          </p>
        </div>
        <div className="lg:w-1/3 sm:w-1/2">
          <Input
            id="search"
            placeholder="Search"
            className=""
            icon={<BiSearch className="size-6" />}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">TicketID</th>
              <th className="px-4 py-2 border-b">EventName</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataWithAccount.map((order: any, index: number) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b text-center">
                  {order.id}
                </td>
                <td className="px-4 py-2 border-b text-center">
                <a href={`/event-detail/${order.event.id}`}>{order.eventName}</a>                </td>
                <td className="px-4 py-2 border-b text-center">
                  {formatNumber(order.price)} VND / Person
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {new Date(order.createdDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b text-center">1</td>
                <td className="px-4 py-2 border-b text-center">{order.status}</td>
                <td className="px-4 py-2 border-b text-center">
                  {order.status === 'PENDING' && (
                    <button className="text-blue-500" onClick={() => handlePaidClick(order)}>
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderHistoryTable;
