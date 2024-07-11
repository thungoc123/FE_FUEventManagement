import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import '../Style/sponsor.css'
import { useGetSponsorProgramQuery } from "../../../Features/Sponsor/sponsor_programApi";
import { useNavigate } from "react-router-dom";
import { truncateString } from "../../../ulities/Stringhandle";
import EventTag from "../../Atoms/EventTag";
type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Layout192Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout192 = (props: Layout192Props) => {
  const { buttons } = {
    ...Layout192Defaults,
    ...props,
  } as Props;
  const { data: sponsorPrograms, error, isLoading } = useGetSponsorProgramQuery();
  console.log(sponsorPrograms);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading sponsor programs</div>;
  }
  const navigate = useNavigate();

  return (
    <header className="px-[5%] py-16 md:py-24 lg:py-28 list_sponsor">
     {sponsorPrograms?.map((program) => (
          <div className="container mt-30">
            <div className="grid grid-cols-1 md:grid-cols-2 md:items-center">
              <div className="order-2 md:order-1">
                <img src={program.thumbnail} className="w-full object-cover" alt="" />
              </div>
              <div className="order-1 lg:order-2">
                <p className="mb-3 font-semibold md:mb-4">{program.title}</p>
                <h2 className="mb-5 font-bold md:mb-6">{truncateString(program.description,100)}</h2>
                <p className="md:text-md">{program.location}</p>
                <div className="mt-6 flex gap-x-4 md:mt-8">
                  {buttons.map((button, index) => (
                    <Button key={index} {...button} onClick={(e) => navigate(`/sponsor-detail/${program.id}`)}>
                      {button.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div> 
     ))}
    </header>
  );
};

export const Layout192Defaults: Layout192Props = {
  tagline: "Tagline",
  heading: "Medium length section heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [
    { title: "View More", variant: "secondary" },
//     {
//       title: "Button",
//       variant: "link",
//       size: "link",
//       iconRight: <RxChevronRight className="size-6" />,
//     },
  ],
  image: {
    src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
    alt: "Placeholder image",
  },
};

Layout192.displayName = "Layout192";
