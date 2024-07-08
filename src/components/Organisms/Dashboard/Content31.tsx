// src/Components/Content31.js

import React from 'react';

type ImageProps = {
  src: string;
  alt?: string;
};

type ContentProps = {
  introduction: string;
  introductionImage: ImageProps;
  introductionImageCaption: string;
  contentTitle: string;
  contentText: string[];
  quote: string;
  conclusionTitle: string;
  conclusionText: string[];
};

const Content31: React.FC<ContentProps> = (props: ContentProps) => {
  const {
    introduction,
    introductionImage,
    introductionImageCaption,
    contentTitle,
    contentText,
    quote,
    conclusionTitle,
    conclusionText,
  } = props;

  return (
    <div className="max-w-4xl">
      {/* Introduction Section */}
      <section>
        <h1 className="text-3xl font-bold mb-4">Introduction</h1>
        <p className="mb-4">{introduction}</p>
        <div className="mx-auto mb-8 w-full overflow-hidden md:mb-12 lg:mb-8">
          <img src={introductionImage.src} alt={introductionImage.alt} className="mx-auto mb-8 w-full overflow-hidden md:mb-12 lg:mb-8" />
          <p className="text-center text-sm mt-2">{introductionImageCaption}</p>
        </div>
      </section>

      {/* Content Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">{contentTitle}</h2>
        {contentText.map((text, index) => (
          <p key={index} className="mb-4">{text}</p>
        ))}
        <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4">
          {quote}
        </blockquote>
      </section>

      {/* Conclusion Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">{conclusionTitle}</h2>
        {conclusionText.map((text, index) => (
          <p key={index} className="mb-4">{text}</p>
        ))}
      </section>
    </div>
  );
};

export default Content31;
