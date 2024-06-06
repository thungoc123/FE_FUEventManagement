import React from "react";

type Props = {
  src?: string;
  alt?: string;
};

const EventImage: React.FC<Props> = (props) => {
  return (
    <div className="w-full overflow-hidden relative">
      <img
        src={props.src}
        alt={props.alt}
        className="aspect-[3/2] size-full object-cover"
      />
      <button className="absolute top-2 right-2 bg-white border border-gray-300 text-black text-sm px-2 py-1 rounded">
        All
      </button>
    </div>
  );
};

EventImage.defaultProps = {
  src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
  alt: "Placeholder image 1",
};
export default EventImage;
