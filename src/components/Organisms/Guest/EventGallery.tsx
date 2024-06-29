import React from 'react';

export type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

export type Gallery3Props = {
  heading: string;
  description: string;
  images: ImageProps[];
};

const Gallery3: React.FC<Gallery3Props> = ({ heading, description, images }) => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-6 md:grid-cols-3 md:gap-8">
          {images.map((image, index) => (
            <a
              key={index}
              href={image.url || '#'}
              className="ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
            >
              <img src={image.src} alt={image.alt || ''} className="w-full h-auto object-cover" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Gallery3Defaults: Gallery3Props = {
  heading: 'Event Gallery',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  images: [
    {
      url: '#',
      src: 'https://relume-assets.s3.amazonaws.com/placeholder-image.svg',
      alt: 'Placeholder image 1',
    }
  ],
};

Gallery3.displayName = 'Gallery3';

export { Gallery3 }; // Export Gallery3 như một named export

export default Gallery3; // Export Gallery3 mặc định

