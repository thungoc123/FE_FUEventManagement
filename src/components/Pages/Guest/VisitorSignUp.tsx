import { useNavigate } from "react-router-dom"; // Import useNavigate
<<<<<<< HEAD
<<<<<<<< HEAD:src/components/Pages/Guest/VisitorSignUp.tsx

import { ChangeEvent, FormEvent, useState } from "react";
========
import { useState } from "react";
>>>>>>>> TienMerge:src/components/Pages/VisitorSignUp.tsx
=======

import { ChangeEvent, FormEvent, useState } from "react";
>>>>>>> TienMerge
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
<<<<<<< HEAD
<<<<<<<< HEAD:src/components/Pages/Guest/VisitorSignUp.tsx
  const navigate = useNavigate();
=======
  const navigate = useNavigate();

>>>>>>> TienMerge
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
  
 
<<<<<<< HEAD
========
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setCPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name: email, fullName, password });

    if (passwordError || confirmPasswordError) {
      alert("Please correct the errors before submitting");
      return;
    }

    try {
      const response = await VAuthAPI.post(`api-visitor/sign-up-visitor`, {
        email,
        fullName,
        password,
      });

      if (response.status === 200) {
        console.log(response);
        navigate("/homepage"); // Chuyển hướng về trang homepage sau khi đăng ký thành công
      }
    } catch (error) {
      console.log(error);
    }
  };

>>>>>>>> TienMerge:src/components/Pages/VisitorSignUp.tsx
=======
>>>>>>> TienMerge
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
<<<<<<< HEAD
<<<<<<<< HEAD:src/components/Pages/Guest/VisitorSignUp.tsx
========
                <Label htmlFor="name" className="mb-2">
                  Company Name/FullName*
                </Label>
                <Input
                  type="text"
                  id="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="grid w-full items-center text-left">
>>>>>>>> TienMerge:src/components/Pages/VisitorSignUp.tsx
=======

>>>>>>> TienMerge
                <Label htmlFor="password" className="mb-2">
                  Password*
                </Label>
                <Input
                  type="password"
                  id="password"
<<<<<<< HEAD
<<<<<<<< HEAD:src/components/Pages/Guest/VisitorSignUp.tsx
                  name="password"
                  // value={password}
                  onChange={handleChange}
========
                  value={password}
                  onChange={handlePasswordChange}
>>>>>>>> TienMerge:src/components/Pages/VisitorSignUp.tsx
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <div className="grid w-full items-center text-left">
                <Label htmlFor="cpassword" className="mb-2">
                  Confirm Password*
                </Label>
                <Input
<<<<<<<< HEAD:src/components/Pages/Guest/VisitorSignUp.tsx
=======
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
>>>>>>> TienMerge
                  type="hidden"
                  id="password"
                  name="information"
                  value=""
                  onChange={handleChange}
<<<<<<< HEAD
========
                  type="password"
                  id="cpassword"
                  value={cpassword}
                  onChange={handleConfirmPasswordChange}
>>>>>>>> TienMerge:src/components/Pages/VisitorSignUp.tsx
                  required
                />
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1">
                    {confirmPasswordError}
                  </p>
                )}
=======
                  required
                />
>>>>>>> TienMerge
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
<<<<<<< HEAD
<<<<<<<< HEAD:src/components/Pages/Guest/VisitorSignUp.tsx
                  // onClick={handleClick}
========
                  type="submit"
>>>>>>>> TienMerge:src/components/Pages/VisitorSignUp.tsx
=======
                  // onClick={handleClick}
>>>>>>> TienMerge
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
<<<<<<< HEAD
          <img
=======
        <img
>>>>>>> TienMerge
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
<<<<<<< HEAD
<<<<<<<< HEAD:src/components/Pages/Guest/VisitorSignUp.tsx
    src: "src/assets/student.png",
========
    src: "/src/assets/7.jpg",
>>>>>>>> TienMerge:src/components/Pages/VisitorSignUp.tsx
=======

    src: "src/assets/student.png",
>>>>>>> TienMerge
    alt: "Placeholder image",
  },
  logInText: "Already have an account?",
  logInLink: {
    text: "Log in",
    url: "#",
  },

  footerText: "© 2024 Relume",
};
