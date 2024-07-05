import { useNavigate } from "react-router-dom"; // Import useNavigate

import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Input, Label } from "@relume_io/relume-ui";
import type { ImgProps, ButtonProps } from "@relume_io/relume-ui";
import { useRegisterVisitorMutation } from "../../../Features/Auth/authApi";

type Props = {
  logo: ImgProps;
  logoLink: string;
  title: string;
  description: string;
  signUpButton: ButtonProps;
  image: ImgProps;
  logInText: string;
  logInLink: {
    text: string;
    url: string;
  };
  footerText: string;
};

export type Signup7Props = React.ComponentPropsWithoutRef<"section"> & Props;

export const VisitorSignUp = (props: Signup7Props) => {
  const {
    logo,
    logoLink,
    title,
    description,
    signUpButton,
    image,
    logInText,
    logInLink,
    footerText,
  } = {
    ...Signup7Defaults,
    ...props,
  } as Props;
  const navigate = useNavigate();

  const [visitorData, setVisitorData] = useState({
    "email": '',
    "password": '',
    "confirmPassword": '',
    "information": null
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisitorData({
      ...visitorData,
      [e.target.name]: e.target.value,
    });
  };
  const [registerVisitor, { isLoading, isError, isSuccess, error }] = useRegisterVisitorMutation(); 
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await registerVisitor(visitorData).unwrap();
        navigate('/login')
        
      } catch (error) {
      console.error('Registration failed:', error);
    } 
  };
  
 
  return (
    <section>
      <div className="relative grid min-h-screen grid-cols-1 items-stretch justify-center overflow-auto lg:grid-cols-2">
        <div className="absolute bottom-auto left-0 right-0 top-0 z-10 flex h-16 w-full items-center justify-center px-[5%] md:h-18 lg:justify-between">
          <a href={logoLink} className="focus-visible:outline-none">
            <img src={logo.src} alt={logo.alt} />
          </a>
        </div>
        <div className="relative mx-[5vw] flex items-center justify-center pb-16 pt-20 md:pb-20 md:pt-24 lg:py-20">
          <div className="container max-w-sm">
            <div className="container mb-6 max-w-lg text-center md:mb-8">
              <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {title}
              </h1>
              <p className="md:text-md">{description}</p>
            </div>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <div className="grid w-full items-center text-left">
                <Label htmlFor="email" className="mb-2">
                  Gmail*
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  // value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full items-center text-left">

                <Label htmlFor="password" className="mb-2">
                  Password*
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  // value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full items-center text-left">
                <Label htmlFor="password" className="mb-2">
                  Confirm Password*
                </Label>
                <Input
                  type="hidden"
                  id="password"
                  name="information"
                  value=""
                  onChange={handleChange}
                  required
                />
              </div>
             
              <Input
                  type="password"
                  id="password"
                  name="confirmPassword"
                  // value={password}
                  onChange={handleChange}
                  required
                />
              <div className="grid-col-1 grid gap-4">
                <Button
                  variant={signUpButton.variant}
                  size={signUpButton.size}
                  iconLeft={signUpButton.iconLeft}
                  iconRight={signUpButton.iconRight}
                  // onClick={handleClick}
                >
                          {isLoading ? 'Signing in...' :  signUpButton.title}
                 
                </Button>
              </div>
              {isError && <p style={{ color: 'red' }}>{error?.data || 'Sign up failed'}</p>}
            </form>
            <div className="mt-5 inline-flex w-full items-center justify-center gap-x-1 text-center md:mt-6">
              <p>{logInText}</p>
              <a
                href={logInLink.url}
                className="underline focus-visible:outline-none"
              >
                {logInLink.text}
              </a>
            </div>
          </div>
        </div>
        <div className="h-screen w-full flex items-center justify-center">
        <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        </div>
        <footer className="absolute bottom-0 left-0 right-0 top-auto flex h-16 w-full items-center justify-center pr-[5%] md:h-18 lg:justify-start lg:px-[5%]">
          <p className="text-sm">{footerText}</p>
        </footer>
      </div>
    </section>
  );
};

export const Signup7Defaults: Signup7Props = {
  logo: {
    src: "https://relume-assets.s3.amazonaws.com/logo-image.svg",
    alt: "Logo text",
  },
  logoLink: "#",
  title: "Sign Up",
  description: "Lorem ipsum dolor sit amet adipiscing elit.",
  signUpButton: {
    title: "Sign up",
  },

  image: {

    src: "src/assets/student.png",
    alt: "Placeholder image",
  },
  logInText: "Already have an account?",
  logInLink: {
    text: "Log in",
    url: "#",
  },

  footerText: "© 2024 Relume",
};
