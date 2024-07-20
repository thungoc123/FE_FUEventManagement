import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ChangeEvent, FormEvent, useState } from "react";
import { useState } from "react";
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
  const [email, setEmail] = useState("");
  // const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const [visitorData, setVisitorData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisitorData({
      ...visitorData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePasswordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const [registerVisitor, { isLoading, isError, isSuccess, error }] = useRegisterVisitorMutation(); 
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirmPassword } = visitorData;

    let valid = true;
    const newErrors = { password: '', confirmPassword: '' };

    if (!validatePassword(password)) {
      newErrors.password = 'Mật khẩu phải có ít nhất 1 ký tự in hoa, 1 chữ số và 1 ký tự đặc biệt.';
      valid = false;
    }

    if (!validatePasswordsMatch(password, confirmPassword)) {
      newErrors.confirmPassword = 'Mật khẩu không khớp.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        await registerVisitor(visitorData).unwrap();
        navigate('/'); // Điều hướng về trang chủ sau khi đăng ký thành công
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
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

  const [registerVisitor, isLoading] = useRegisterVisitorMutation();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log({ name: email, fullName, password });

    if (passwordError || confirmPasswordError) {
      alert("Please correct the errors before submitting");
      return;
    }
    const data = { 
      email: email, 
      password: password, 
      confirmPassword: cpassword, 
      information: email
    };
    try {
      await registerVisitor(data).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="grid w-full items-center text-left">
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
              </div> */}

              <div className="grid w-full items-center text-left">
                <Label htmlFor="password" className="mb-2">
                  Password*
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <div className="grid w-full items-center text-left">
                <Label htmlFor="confirmPassword" className="mb-2">
                <Label htmlFor="cpassword" className="mb-2">
                  Confirm Password*
                </Label>
                <Input
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  id="cpassword"
                  value={cpassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
              </div>
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
              <div className="grid-col-1 grid gap-4">
                <Button
                  variant={signUpButton.variant}
                  size={signUpButton.size}
                  iconLeft={signUpButton.iconLeft}
                  iconRight={signUpButton.iconRight}
                  type="submit"
                >
                  {isLoading ? 'Signing up...' : signUpButton.title}
                  {signUpButton.title}
                </Button>
              </div>
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
    src: "/src/assets/7.jpg",
    alt: "Placeholder image",
  },
  logInText: "Already have an account?",
  logInLink: {
    text: "Log in",
    url: "#",
  },
  footerText: "© 2024 Relume",
};
