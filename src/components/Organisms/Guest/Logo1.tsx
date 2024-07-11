"use client";

import type { ImageProps } from "@relume_io/relume-ui";

type Props = {
  heading?: string;
  logos?: ImageProps[];
};

export type Logo1Props = React.ComponentPropsWithoutRef<"section"> & Props;

export const Logo1 = (props: Logo1Props) => {
  const { heading, logos } = {
    ...Logo1Defaults,
    ...props,
  } as Props;
  return (
    <section className="px-[5%] py-12 md:py-16 lg:py-20 eventblog" id="sponsor_logo">
      <div className="container">
        <h1 className="mx-auto mb-6 w-full max-w-lg text-center text-base font-bold leading-[1.2] md:mb-8 md:text-md md:leading-[1.2]">
          Best Regards 
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pb-2 pt-4 md:pt-2">
          {logos.map((logo, index) => (
            <div className="Card">
            <img
              key={`${logo.alt}-${index}`}
              src={logo.src}
              alt={logo.alt}
              className="max-h-12 md:max-h-14"
            />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Logo1Defaults: Logo1Props = {
  heading: "Used by the world's most average companies",
  logos: [
    { src: "https://plus.vtc.edu.vn/wp-content/uploads/2020/09/VNG.png", alt: "Webflow logo 1" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_TopCV_no_slogan.png", alt: "Relume logo 1" },
    { src: "https://static.ybox.vn/2020/2/1/1581927973887-1581308594585-FPT_Software_Logo.png", alt: "Webflow logo 2" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/6/63/Logo_Viettel_from_7_January_2021_Slogan.svg", alt: "Relume logo 2" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/6/64/KMS-Logo.png", alt: "Webflow logo 3" },
    { src: "https://cdn.brvn.vn/editor/2015/01/dentsu_4773.png", alt: "Relume logo 3" },
    { src: "https://static.topcv.vn/company_logos/daiko-viet-nam-co-ltd-5e8eda62b5bf2.jpg", alt: "Webflow logo 4" },
    { src: "https://lh3.googleusercontent.com/proxy/KcZiaHjD_cx3W1gH9gqgfBKPgKJbFa6f7HBOBCaL3FHvBwFfgS-mY8SZXpgYwEOjzWsGp17lYVggjPN5GVMPY14suiKU2A2KIJQ", alt: "Relume logo 4" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/C%C3%81T_TI%C3%8AN_SA_MEDIA_GROUP_Logo.png", alt: "Webflow logo 5" },
    { src: "https://cms.vietnamreport.net//source/LogoBusiness/20211209182942logobee.png", alt: "Relume logo 5" },
  ],
};
