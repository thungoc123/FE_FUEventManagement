// src/Organisms/Sponsor/DisplaySponsorProgram.js

import React from 'react';
import SponsorProgramItem from './SponsorProgramitem';

type ImageProps = {
  src: string;
  alt?: string;
};

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
};

type TeamMembersProps = {
  image: ImageProps;
  name: string;
  jobTitle: string;
  description: string;
  socialLinks: SocialLinkProps[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  sponsorPrograms: any[]; // Thay thế teamMembers bằng sponsorPrograms
};

export type DisplayProgramProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const DisplayProgram = (props: DisplayProgramProps) => {
  const { tagline, heading, description, sponsorPrograms } = {
    ...DisplayProgramDefaults,
    ...props,
  } as Props;
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {sponsorPrograms.map((program, index) => (
            <SponsorProgramItem key={index} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const DisplayProgramDefaults: DisplayProgramProps = {
  tagline: "",
  heading: "Sponsor List Program",
  description: "List of Sponsor Program",
  sponsorPrograms: [],
};

DisplayProgram.displayName = "DisplayProgram";
