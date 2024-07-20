import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { FaXTwitter } from "react-icons/fa6";
import { BiLinkAlt, BiLogoLinkedinSquare, BiLogoFacebookCircle } from "react-icons/bi";
import { RxChevronLeft } from "react-icons/rx";
import { useGetSponsorProgramQuery } from "../../../Features/Sponsor/sponsor_programApi";
import { useNavigate, useParams } from "react-router-dom";
import EventTag from "../../Atoms/EventTag";
import { EOevent } from "../../../Types/eo.type";
import { SponsorProgramEvent } from "../../../Types/sponsor";

type ImageProps = {
  src: string;
  alt?: string;
};

type PostDetails = {
  title: string;
  description: string;
};

type SocialMediaLinksProps = {
  icon: React.ReactNode;
  url: string;
};

type Props = {
  button: ButtonProps;
  category: string;
  readTime: string;
  heading: string;
  image: ImageProps;
  postDetails: PostDetails[];
  socialMediaLinks: SocialMediaLinksProps[];
  eventTag: SponsorProgramEvent[];
};

export type BlogPostHeader2Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const BlogPostHeader2 = (props: BlogPostHeader2Props) => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const navigate = useNavigate(); // Use navigate to programmatically navigate

  const { button, category, readTime, heading, image, postDetails, socialMediaLinks, eventTag } = {
    ...BlogPostHeader2Defaults,
    ...props,
  } as Props;
  const { data: sponsorPrograms, error, isLoading } = useGetSponsorProgramQuery();

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error loading sponsor programs</div>;
  }

  const sponsorProgram = sponsorPrograms?.find(program => program.id.toString() === id);

  if (!sponsorProgram) {
    return <div>Sponsor Program not found</div>;
  }

  const contentData = {
    introduction: sponsorProgram.description,
    introductionImage: {
      src: sponsorProgram.thumbnail,
      alt: sponsorProgram.title,
    },
    introductionImageCaption: "Image caption goes here",
    contentTitle: sponsorProgram.title,
    contentText: [
      "Content paragraph 1 goes here.",
      "Content paragraph 2 goes here.",
    ],
    quote: "Quote goes here",
    conclusionTitle: "Conclusion",
    conclusionText: [
      "Conclusion paragraph 1 goes here.",
      "Conclusion paragraph 2 goes here.",
    ],
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-start md:mb-18 lg:mb-20">
          <Button
            variant={button.variant}
            size={button.size}
            iconRight={button.iconRight}
            iconLeft={button.iconLeft}
            className="mb-8 md:mb-10 lg:mb-12"
            asChild
            onClick={() => navigate("/sponsor-program")} // Navigate to Sponsor Program page on click

          >
            <a style = {{cursor:"pointer"}}>{button.title}</a>
          </Button>
          <div className="mb-4 flex w-full items-center justify-start">
            <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
              {category}
            </p>
            <p className="inline text-sm font-semibold">{readTime}</p>
          </div>
          <h1 className="text-5xl font-bold md:text-7xl lg:text-8xl">{heading}</h1>
        </div>
        <div className="mx-auto mb-8 w-full overflow-hidden md:mb-12 lg:mb-8">
          <img src={image.src} className="aspect-[5/2] size-full object-cover" alt={image.alt} />
        </div>
        {eventTag.map((event, index) => (
          <EventTag key={index} text={event.event.name} />
        ))}
        {/* <EventTag text="Text"/> */}
        <div className="flex w-full flex-col items-start justify-between md:flex-row">
          <div className="mb-4 flex items-center sm:mb-8 md:mb-0">
            {postDetails.map((detail, index) => (
              <div key={index} className="mr-8 md:mr-10 lg:mr-12">
                <p className="mb-2">{detail.title}</p>
                <div className="font-medium" dangerouslySetInnerHTML={{__html:detail.description}}/>
              </div>
            ))}
          </div>
          <div className="grid grid-flow-col grid-cols-[max-content] items-start gap-2">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="rounded-[1.25rem] bg-background-secondary p-1"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        {/* <Content31 {...contentData} /> */}
      </div>
    </section>
  );
};

export const BlogPostHeader2Defaults: BlogPostHeader2Props = {
  button: {
    title: "All Posts",
    variant: "link",
    size: "link",
    iconLeft: <RxChevronLeft />,
  },
  category: "Category",
  readTime: "5 min read",
  heading: "Blog title heading will go here",
  postDetails: [
    { title: "Written by", description: "Full Name" },
    { title: "Published on", description: "22 January 2021" },
  ],
  socialMediaLinks: [
    { url: "#", icon: <BiLinkAlt className="size-6" /> },
    { url: "#", icon: <BiLogoLinkedinSquare className="size-6" /> },
    { url: "#", icon: <FaXTwitter className="size-6 p-0.5" /> },
    { url: "#", icon: <BiLogoFacebookCircle className="size-6" /> },
  ],
  image: {
    src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
    alt: "Placeholder image",
  },
};

BlogPostHeader2.displayName = "BlogPostHeader2";
