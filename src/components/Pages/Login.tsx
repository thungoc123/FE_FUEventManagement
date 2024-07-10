"use client";

import { useEffect, useState } from "react";
import { Button, Input, Label } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiLogoGoogle } from "react-icons/bi";
import { setToken } from "../../Features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../Features/Auth/authApi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../../../Store/Store";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Props = {
  logo: ImageProps;
  signUpText: string;
  signUpLink: {
    text: string;
    url: string;
  };
  title: string;
  description: string;
  logInButton: ButtonProps;
  logInWithGoogleButton: ButtonProps;
  forgotPassword: {
    text: string;
    url: string;
  };
  footerText: string;
};

export type Login1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Login1 = (props: Login1Props) => {
  const {
    logo,
    signUpText,
    signUpLink,
    title,
    description,
    logInButton,
    forgotPassword,
    footerText,
  } = {
    ...Login1Defaults,
    ...props,
  } as Props;

  interface JwtPayload {
    sub: string;
    role?: string;
  }

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (token) {
      const storedEmail = localStorage.getItem("email") || "";
      setEmail(storedEmail);
      setIsLogin(true);
      dispatch(setToken(token));
    } else {
      setIsLogin(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setToken(result.data));
      setIsLogin(true);
      NavigationAuth(result.data);
      localStorage.setItem("email", email);
      sessionStorage.setItem("token", result.data);
      sessionStorage.setItem("email", email);
    } catch (err) {
      console.error("Failed to login:");
    }
  };

  const NavigationAuth = (token: string) => {
    let decodedToken = jwtDecode<JwtPayload>(token);
    switch (decodedToken.role) {
      case "ROLE_EO":
        navigate("/eventoperator/dashboard/");
        break;
      case "ROLE_SPONSOR":
        navigate("/sponsor/dashboard/");
        break;
      case "ROLE_VISITOR":
        navigate("/");
        break;
      case "ROLE_CHECKING_STAFF":
        navigate("");
        break;
      case "ROLE_ADMIN":
        navigate("/admin");
        break;
    }
  };

  return (
    <section className="px-[5%]">
      <div className="relative flex min-h-svh flex-col items-stretch justify-center overflow-auto py-24 lg:py-20">
        <div className="absolute bottom-auto left-0 right-0 top-0 flex h-16 w-full items-center justify-between md:h-18">
          <a href={logo.url}>
            <img src={logo.src} alt={logo.alt} />
          </a>
          <div className="inline-flex gap-x-1">
            <p className="hidden md:block">{signUpText}</p>
            <a
              href={signUpLink.url}
              className="underline ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
            >
              {signUpLink.text}
            </a>
          </div>
        </div>
        <div className="container max-w-sm">
          <div className="mb-6 text-center md:mb-8">
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {title}
            </h1>
            <p className="md:text-md">{description}</p>
          </div>
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div className="grid w-full items-center">
              <Label htmlFor="email" className="mb-2">
                Email*
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="password" className="mb-2">
                Password*
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid-col-1 grid gap-4">
              <Button
                variant={logInButton.variant}
                size={logInButton.size}
                iconLeft={logInButton.iconLeft}
                iconRight={logInButton.iconRight}
              >
                {isLoading ? "Loging in..." : logInButton.title}
              </Button>
            </div>
          </form>
          {isError && <p style={{ color: 'red' }}>{error?.message || 'Invalid Email or Password'}</p>}
          <div className="mt-5 w-full text-center md:mt-6">
            <a
              href={forgotPassword.url}
              className="underline ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
            >
              {forgotPassword.text}
            </a>
          </div>
        </div>
        <footer className="absolute bottom-0 left-0 right-0 top-auto flex h-16 w-full items-center justify-center md:h-18">
          <p className="text-sm">{footerText}</p>
        </footer>
      </div>
    </section>
  );
};

export const Login1Defaults: Login1Props = {
  logo: {
    url: "#",
    src: "https://relume-assets.s3.amazonaws.com/logo-image.svg",
    alt: "Logo text",
  },
  signUpText: "Don't have an account?",
  signUpLink: {
    text: "Sign up",
    url: "/sponsor",
  },
  title: "Log In",
  description: "Lorem ipsum dolor sit amet adipiscing elit.",
  logInButton: {
    title: "Log in",
  },
  logInWithGoogleButton: {
    variant: "secondary",
    title: "Log in with Google",
    iconLeft: <BiLogoGoogle className="size-6" />,
  },
  forgotPassword: {
    text: "Forgot your password?",
    url: "#",
  },
  footerText: "© 2024 Relume",
};

Login1.displayName = "Login1";
