// src/components/Content1.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetEventDetailsQuery } from '../../../Features/Event/eventDisplayApi';
import { setContent } from '../../../Features/Event/eventSlice';
import { RootState } from '../../../Store/Store';

type ImageProps = {
  src: string;
  alt?: string;
};

type StateEvent = {
  id: number;
  name: string;
};

type EventImage = {
  src: string;
  alt?: string;
};

type EventPost = {
  id: number;
  name: string;
  description: string;
  price: number;
  timestart: string;
  timeend: string;
  timeopensale: string;
  timeclosesale: string;
  stateEvent?: StateEvent | null; // Đảm bảo rằng stateEvent có thể là null
  eventImages: EventImage[] | null; // Đảm bảo rằng eventImages có thể là null
  url?: string;
  location?: string;
};

type Props = {
  tagline?: string;
  heading?: string;
  description?: string;
  EventPosts?: EventPost[];
  image?: EventImage; // Sửa đổi loại tại đây
  onClose?: () => void; // Đảm bảo onClose là tùy chọn
};

export type Content1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Content1 = (props: Content1Props) => {
  const contentData = useSelector((state: RootState) => state.eventDisplayApi);

  const { heading, children, description, image } = {
    ...contentData,
    ...props,
  };

  const defaultImage = {
    src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
    alt: "Placeholder image",
  };

  const imgSrc = image?.src || defaultImage.src;
  const imgAlt = image?.alt || defaultImage.alt;

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75" onClick={props.onClose}>
      <div className="container bg-white p-4 relative">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <div className="prose">
              {children}
              <p>{description}</p>
            </div>
          </div>
          <div>
            <img
              src={imgSrc}
              className="w-full object-cover"
              alt={imgAlt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Content1.displayName = "Content1";
