import { Input, Label } from "@relume_io/relume-ui";
type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  images: ImageProps[];
};

export type Gallery5Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Gallery5 = (props: Gallery5Props) => {
  const { heading, description, images } = {
    ...Gallery5Defaults,
    ...props,
  } as Props;
  return (
    <section className="px-[5%] md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-2 items-start justify-center gap-6 md:gap-8 lg:grid-cols-3">
          {images.map((image, index) => (
            <a
              key={index}
              href={image.url}
              className="ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
            >
              <img
                src={image.src}
                alt={image.alt}
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

export const Gallery5Defaults: Gallery5Props = {
  heading: "Image Gallery",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  images: [
    {
      url: "#",
      src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
      alt: "Placeholder image 1",
    },
    {
      url: "#",
      src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
      alt: "Placeholder image 2",
    },
    {
      url: "#",
      src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
      alt: "Placeholder image 3",
    },
    {
      url: "#",
      src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
      alt: "Placeholder image 4",
    },
    {
      url: "#",
      src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
      alt: "Placeholder image 5",
    },
    {
      url: "#",
      src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
      alt: "Placeholder image 6",
    },
  ],
};

Gallery5.displayName = "Gallery5";
