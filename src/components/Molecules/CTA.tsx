import React from 'react';
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps as RelumeButtonProps } from "@relume_io/relume-ui";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateOrderMutation } from '../../Features/Order/orderApi';
import { useGetVisitorByAccountIdQuery } from '../../Features/Order/ticketApi';
import { accountID } from '../../ulities/ProtectedRoute';

type ExtendedButtonProps = RelumeButtonProps & {
  title: string;
  url?: string;
  onClick?: () => void;  // Optional onClick handler for custom functionality
};

type Props = {
  heading: string;
  description: string;
  buttons: ExtendedButtonProps[];
  eventId: string;
  eventDetails: any;
};

export type Cta7Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Cta7 = (props: Cta7Props) => {
  const { heading, description, buttons, eventId, eventDetails } = {
    ...Cta7Defaults,
    ...props,
  } as Props;

  const navigate = useNavigate();
  const accountId = accountID(sessionStorage.getItem('token'));
  const token = sessionStorage.getItem('token');

  const { data: visitorData, error: visitorError, isLoading: isVisitorLoading } = useGetVisitorByAccountIdQuery(accountId, {
    skip: !accountId, // Skip the query if accountId is not available
  });

  const [createOrder] = useCreateOrderMutation();

  if (visitorError) {
    toast.error("Error fetching visitor data: " + visitorError.message);
  }

  const handleButtonClick = async (url: string | undefined, onClick: (() => void) | undefined) => {
    if (onClick) {
      onClick();
    } else if (url) {
      if (url === "/order-history") {
        await handleAddToCart();
      } else {
        navigate(url, { state: { eventDetails, eventId } });
      }
    }
  };

  const handleAddToCart = async () => {
    if (!accountId || !visitorData || !Array.isArray(visitorData) || visitorData.length === 0) {
      toast.error("Account ID or Visitor ID is missing.");
      return;
    }

    const visitorId = visitorData[0].visitorId;
    const orderDetails = {
      order: {
        visitorId: parseInt(visitorId, 10),
        eventId: eventDetails.id,
        statusCart: true,
        status: "PENDING",
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await createOrder(orderDetails).unwrap();
      if (response.message === "Ticket created successfully") {
        toast.success("Added to cart successfully");
      } else {
        toast.error("Order creation failed: " + response.message);
      }
    } catch (err) {
      toast.error("Failed to create order: " + err.message);
    }
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid w-full grid-cols-1 items-start justify-between gap-6 md:grid-cols-[1fr_max-content] md:gap-x-12 md:gap-y-8 lg:gap-x-20">
        <div className="md:mr-12 lg:mr-0">
          <div className="w-full max-w-lg">
            <h2 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
        <div className="flex items-start justify-start gap-4">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              size={button.size}
              iconRight={button.iconRight}
              iconLeft={button.iconLeft}
              onClick={() => handleButtonClick(button.url, button.onClick)}
              disabled={isVisitorLoading || !visitorData}
            >
              {button.title}
            </Button>
          ))}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export const Cta7Defaults: Cta7Props = {
  heading: "Get Your Tickets Now!",
  description: "Experience the Event of a Lifetime.",
  buttons: [
    { title: "Buy Ticket", url: "/payment" },
    { title: "Add to Cart", url: "/order-history" }
  ],
  eventId: "",
  eventDetails: {},
};

Cta7.displayName = "Cta7";
