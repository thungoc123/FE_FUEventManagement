// components/Navbar2.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@relume_io/relume-ui";
import type { ImgProps, ButtonProps } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Input,
} from "@relume_io/relume-ui";
import RoleChoosingwithDialog from "../../Molecules/RoleChoosingWithDialog";

// setToken
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../../Features/Auth/authApi";
import { setAccountId, setToken } from "../../../Features/Auth/authSlice";
import Dropdown from "../Visitor/Dropdown";
// components/Navbar2.tsx
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from "react-router-dom";
import { RootState } from "../../../Store/Store";
import NewPasswordModal from "./NewPasswordModal";
import ResetPassword from "./ResetPassword";


type LinkProps = {
  title?: string;
  url?: string;
};

type MenuLinkProps = LinkProps & {
  subLinks?: LinkProps[];
};

type Props = {
  logo?: ImgProps;
  links?: MenuLinkProps[];
  buttons?: ButtonProps[];
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> & Props;

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const dropDownVariants = {
  open: {
    height: "var(--height-open, 100dvh)",
    transition: { duration: 0.2 },
  },
  close: {
    height: "var(--height-closed, 0)",
    transition: { duration: 0.3 },
  },
};

export const Navbar2 = (props: Navbar2Props) => {
  const { logo, links, buttons } = {
    ...Navbar2Defaults,
    ...props,
  } as Props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [roleChoosingOpen, setRoleChoosingOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isNewPasswordOpen, setIsNewPasswordOpen] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleAuthButtonClick = (isLogin: boolean) => {
    if (isLogin) {
      setIsLoginForm(true);
      setAuthModalOpen(true);
    } else {
      setRoleChoosingOpen(true);
    }
  };

  const handleForgotPasswordClick = () => {
    setIsResetPassword(true);
  };

  const handleBackToLoginClick = () => {
    setIsResetPassword(false);
    setIsNewPasswordOpen(false);
  };

  const handleSetNewPasswordOpen = (email: string, token: string) => {
    setEmail(email);
    setResetToken(token);
    setIsResetPassword(false);
    setIsNewPasswordOpen(true);
  };

  interface JwtPayload {
    sub: string;
    role?: string;
    accountId?: number;
  }

  // login function with redux
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await login({ email, password }).unwrap();
      console.log("Login Result:", result); // Debugging log

      dispatch(setToken(result.data));
      setIsLogin(true);
      NavigationAuth(result.data);
      localStorage.setItem('email', email);
      sessionStorage.setItem('token', result.data);
      sessionStorage.setItem('email', email);
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  useEffect(() => {
    if (token) {
      const storedEmail = localStorage.getItem('email') || '';
      setEmail(storedEmail);
      setIsLogin(true);

      console.log("Token before dispatch:", token); // Debugging log
      dispatch(setToken(token));

      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        console.log("Decoded Token:", decodedToken); // Debugging log
        if (decodedToken.accountId) {
          dispatch(setAccountId(decodedToken.accountId));
        } else {
          console.warn('No accountId found in token');
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      setIsLogin(false);
    }
  }, [token, dispatch]);

  const NavigationAuth = (token: string) => {
    let decodedToken = jwtDecode<JwtPayload>(token);
    console.log(decodedToken);
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

  const handleRoleChoosingClose = () => {
    setRoleChoosingOpen(false);
  };

  return (
    <nav className="flex w-full items-center border-b border-border-primary bg-white lg:min-h-18 lg:px-[5%]">
      <div className="mx-auto size-full lg:grid lg:grid-cols-[0.375fr_1fr_0.375fr] lg:items-center lg:justify-between lg:gap-4">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <img src={logo.src} alt={logo.alt} />
          <div className="flex items-center gap-4 lg:hidden">
            {isLogin ? (
              <Dropdown email={email} />
            ) : (
              buttons.map((button, index) => (
                <Button
                  key={`${button.title}-${index}`}
                  className="px-6 py-2 mx-2"
                  variant={button.variant}
                  size={button.size}
                  onClick={() =>
                    handleAuthButtonClick(button.title === "Login")
                  }
                >
                  {button.title}
                </Button>
              ))
            )}
            <button
              className="-mr-2 flex size-12 flex-col items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div
                className="my-[3px] h-0.5 w-6 bg-black"
                animate={mobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={topLineVariants}
              />
              <motion.div
                className="my-[3px] h-0.5 w-6 bg-black"
                animate={mobileMenuOpen ? "open" : "closed"}
                variants={middleLineVariants}
              />
              <motion.div
                className="my-[3px] h-0.5 w-6 bg-black"
                animate={mobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={bottomLineVariants}
              />
            </button>
          </div>
        </div>
        <motion.div
          animate={mobileMenuOpen ? "open" : "close"}
          initial="close"
          variants={dropDownVariants}
          className="overflow-hidden px-[5%] text-center lg:flex lg:items-center lg:justify-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          {links.map((link, index) => (
            <div
              key={`${link.title}-${index}`}
              className="first:pt-4 lg:first:pt-0"
            >
              {link.subLinks && link.subLinks.length > 0 ? (
                <NavItemDropdown subLinks={link.subLinks} title={link.title} />
              ) : (
                <a
                  href={link.url}
                  className="relative mx-auto block py-3 text-md ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2 lg:px-4 lg:py-2 lg:text-base"
                >
                  {link.title}
                </a>
              )}
            </div>
          ))}
        </motion.div>
        <div className="hidden lg:flex lg:items-center lg:justify-end">
          {isLogin ? (
            <Dropdown email={email} />
          ) : (
            buttons.map((button, index) => (
              <Button
                key={`${button.title}-${index}`}
                className="px-6 py-2 mx-2"
                variant={button.variant}
                size={button.size}
                onClick={() =>
                  handleAuthButtonClick(button.title === "Login")
                }
              >
                {isLoading ? "Loging in..." : button.title}
              </Button>
            ))
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/25" />
          <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12">
            <DialogHeader>
              <DialogTitle className="mb-2">
                {isResetPassword
                  ? "Reset Password"
                  : isLoginForm
                  ? "Log In"
                  : "Sign Up"}
              </DialogTitle>
              <DialogDescription>
                {isResetPassword
                  ? "Enter your email to reset password"
                  : isLoginForm
                  ? "Log in to your account"
                  : "Create an account to get started"}
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid gap-4 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (isResetPassword) {
                  // No need to handle it here, ResetPassword component handles it
                } else {
                  console.log(isLoginForm ? "Logging in" : "Signing up");
                  setAuthModalOpen(false);
                  handleSubmit(e);
                }
              }}
            >
              {isResetPassword ? (
                <ResetPassword
                  isOpen={isResetPassword}
                  onClose={() => {
                    setIsResetPassword(false);
                    setIsNewPasswordOpen(true);
                  }}
                  onSetNewPasswordOpen={handleSetNewPasswordOpen}
                />
              ) : (
                <>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
                <Button type="submit">
                  {isLoginForm ? "Log in" : "Sign up"}
                </Button>
              </div>
              <DialogFooter className="mt-6">
                {isResetPassword ? (
                  <Button
                    asChild
                    variant="link"
                    size="link"
                    onClick={handleForgotPasswordClick}
                  >
                    <a className="underline">Reset password</a>
                  </Button>
                ) : (
                  <>
                    <span>Forgot your password?</span>
                    <Button
                      asChild
                      variant="link"
                      size="link"
                      onClick={handleForgotPasswordClick}
                    >
                      <a className="underline">Reset password</a>
                    </Button>
                  </>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* New Password Modal */}
     <NewPasswordModal
        isOpen={isNewPasswordOpen}
        onClose={handleBackToLoginClick}
        token={resetToken}
        email={email}
      />

      {/* Role Choosing with DialogContent  */}
      <RoleChoosingwithDialog
        roleChoosingOpen={roleChoosingOpen}
        setRoleChoosingOpen={setRoleChoosingOpen}
      />
    </nav>
  );
};

// This component will render your dropdown links
const NavItemDropdown = ({
  title,
  subLinks,
}: {
  title?: string;
  subLinks?: LinkProps[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-md lg:px-4 lg:py-2 lg:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <RxChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 mt-2 w-40 bg-white shadow-lg"
          >
            {subLinks?.map((subLink, index) => (
              <a
                key={`${subLink.title}-${index}`}
                href={subLink.url}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
              >
                {subLink.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar2Defaults = {
  logo: {
    src: "/src/assets/logo.png",
    alt: "Logo",
  },
  links: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "About",
      url: "/service-term",
    },
    {
      title: "Sponsor",
      url: "/sponsor-program",
    },
    {
      title: "More",
      subLinks: [
        {
          title: "Option 1",
          url: "/more/option1",
        },
        {
          title: "Option 2",
          url: "/more/option2",
        },
        {
          title: "Option 3",
          url: "/more/option3",
        },
      ],
    },
  ],
  buttons: [
    {
      title: "Login",
      variant: "primary",
      size: "medium",
    },
    {
      title: "Sign Up",
      variant: "secondary",
      size:"medium",
    },
  ],
};
