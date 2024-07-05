import React, { useState } from 'react';
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

type ImageProps = {
  src: string;
  alt?: string;
};

type BlogPost = {
  url: string;
  image: ImageProps;
  category: string;
  readTime: string;
  title: string;
  description: string;
  button: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  button: ButtonProps;
  blogPosts: BlogPost[];
};

export type Blog44Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Blog44 = (props: Blog44Props) => {
  const { tagline, heading, description, button, blogPosts } = {
    ...Blog44Defaults,
    ...props,
  } as Props;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const postsPerPage = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + blogPosts.length) % blogPosts.length);
  };

  const visiblePosts = blogPosts.slice(currentIndex, currentIndex + postsPerPage);

  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-start gap-y-8 md:mb-18 md:grid-cols-[1fr_max-content] md:items-end md:justify-between md:gap-x-12 md:gap-y-4 lg:mb-20 lg:gap-x-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="mb-3 text-5xl font-bold md:mb-4 md:text-7xl lg:text-8xl">{heading}</h1>
            <p className="md:text-md">{description}</p>
          </div>
          <div className="hidden flex-wrap items-center justify-end md:block">
            <Button
              variant={button.variant}
              size={button.size}
              iconRight={button.iconRight}
              iconLeft={button.iconLeft}
              onClick={() => navigate("/sponsor-program")}  // Navigate to Sponsor Program page on click
            >
              {button.title}
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post, index) => (
              <a
                key={index}
                href={post.url}
                className="flex size-full flex-col items-center justify-start border border-border-primary ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
              >
                <div className="relative w-full overflow-hidden pt-[66%]">
                  <img
                    src={post.image.src}
                    alt={post.image.alt}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <div className="flex w-full flex-1 flex-col justify-between px-5 py-6 md:p-6">
                  <div className="mb-4 flex items-center">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      {post.category}
                    </p>
                    <p className="inline text-sm font-semibold">{post.readTime}</p>
                  </div>
                  <div className="flex w-full flex-col items-start justify-start">
                    <h2 className="mb-2 text-xl font-bold md:text-2xl">{post.title}</h2>
                    <p>{post.description}</p>
                    <Button
                      variant={post.button.variant}
                      size={post.button.size}
                      iconRight={post.button.iconRight}
                      iconLeft={post.button.iconLeft}
                      className="mt-6 flex items-center justify-center gap-x-1"
                    >
                      {post.button.title}
                    </Button>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-[-60px]">
            <Button onClick={handlePrev} variant="primary" className="circular-button">
              <FiArrowLeft />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-60px]">
            <Button onClick={handleNext} variant="primary" className="circular-button">
              <FiArrowRight />
            </Button>
          </div>
        </div>
        <Button
          variant={button.variant}
          size={button.size}
          iconRight={button.iconRight}
          iconLeft={button.iconLeft}
          className="mt-12 md:hidden"
          onClick={() => navigate("/sponsor-program")}  // Navigate to Sponsor Program page on click
        >
          {button.title}
        </Button>
      </div>
    </section>
  );
};

export const Blog44Defaults: Blog44Props = {
  tagline: "",
  heading: "Related Program",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: { title: "View all", variant: "secondary" },
  blogPosts: [],
};

Blog44.displayName = "Blog44";

// CSS for circular buttons
const style = document.createElement('style');
style.innerHTML = `
  .circular-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0;
    border: 2px solid gray;  // Gray border
    background-color: white;  // White background
    color: gray;  // Gray text color
    font-size: 1.5rem;  // Increase icon size
  }
`;
document.head.appendChild(style);
