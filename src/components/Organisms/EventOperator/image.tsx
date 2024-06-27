import { Input, Label } from "@relume_io/relume-ui";
import { EventImage } from "../../../Types/eo.type";
import React from "react";
import { RootState } from "../../../Store/Store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Props = {
  images: EventImage[];
};

// export type Gallery5Props = React.ComponentPropsWithoutRef<"section"> &
//   Partial<Props>;

export const Gallery5:React.FC<Props> = (prop) => {
  const { id } = useParams();
  const Events = useSelector((state: RootState) => state.events.events);

  const images = Events?.find(event => event.id === parseInt(id))?.eventImages || []
  return (
    <section className="px-[5%] md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-2 items-start justify-center gap-6 md:gap-8 lg:grid-cols-3">
          {images.map((image, index) => (
            <a
              key={index}
              href=""
              className="ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
            >
              <img
                src={image.url}
                
                className="size-full object-cover"
              />
            </a>
          ))}
        </div>
        <div className="grid gap-y-5 m-5">
          <Label htmlFor="Website">Add Image</Label>
          <Input type="file" />
        </div>
      </div>
    </section>
  );
};


