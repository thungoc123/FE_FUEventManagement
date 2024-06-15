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
import { BiLogoGoogle } from "react-icons/bi";
import RoleChoosing from "../../Pages/RoleChosing";
import RoleChoosingwithDialog from "../../Molecules/RoleChoosingWithDialog";
import UnauthAPI from "../../../config/axios/UnauthAPI";

// import { useLoginMutation } from '';

// setToken
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../Features/Auth/authApi";
import { setToken } from "../../../Features/Auth/authSlice";
import Dropdown from "../Visitor/Dropdown";
import { useAuth } from "../../../Contexts/AuthContext";

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleAuthButtonClick = (isLogin: boolean) => {
    if (isLogin) {
      setIsLoginForm(true);
      setAuthModalOpen(true);
    } else {
      setRoleChoosingOpen(true);
    }
  };


  const [isLogin,setIsLogin] = useState(false)
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  // const {setEmailContext} = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      console.log(result.data)
      sessionStorage.setItem('token', result.data);
      sessionStorage.setItem('email',email)
      dispatch(setToken(result.data));
      // setEmailContext(email)
      // dispatch(setEmail(result.email)); // Lưu email vào Redux store
      setIsLogin(true)
    } catch (err) {
      console.error('Failed to login:');
    }
  };

  console.log(email)
  // sessionStorage.removeItemItem('token')
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const storedEmail = sessionStorage.getItem('email') || "";
    if (token&& storedEmail) {
      // Nếu có token trong sessionStorage, lưu vào Redux state (nếu cần thiết)
      // setEmailContext(email)
      setEmail(storedEmail)
      setIsLogin(true)
      dispatch(setToken(token));
    } else {
      // Nếu không có token, điều hướng người dùng về trang đăng nhập
      // history.push('/login');
      setIsLogin(false)

    }
  }, [dispatch]);





  // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(loginData)
  //   try {
  //     const response = await UnauthAPI.post(`login`, 
        
  //      loginData
  //     );

  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          ): (
            buttons.map((button, index) => (
              <Button
                key={`${button.title}-${index}`}
                className="px-6 py-2 mx-2"
                variant={button.variant}
                size={button.size}
                onClick={() => handleAuthButtonClick(button.title === "Login")}
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
        <div className="hidden justify-self-end lg:block">
          {isLogin ? (
            <Dropdown email={email} />
          ): (
            buttons.map((button, index) => (
              <Button
                key={`${button.title}-${index}`}
                className="px-6 py-2 mx-2"
                variant={button.variant}
                size={button.size}
                onClick={() => handleAuthButtonClick(button.title === "Login")}
              >
                {button.title}
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
          <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12 md:data-[state=open]:duration-300 md:data-[state=open]:animate-in md:data-[state=closed]:animate-out md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0 md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=open]:slide-in-from-left-1/2">
            <DialogHeader>
              <DialogTitle className="mb-2">
                {isLoginForm ? "Log In" : "Sign Up"}
              </DialogTitle>
              <DialogDescription>
                {isLoginForm
                  ? "Log in to your account"
                  : "Create an account to get started"}
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid gap-4 py-4"
              onSubmit={(e) => {
                // e.preventDefault();
                console.log(isLoginForm ? "Logging in" : "Signing up");
                setAuthModalOpen(false);
                handleSubmit(e);
              }}
            >
              <div className="grid items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  // value={loginData.email}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
                <Button type="submit">
                  {isLoginForm ? "Log in" : "Sign up"}
                </Button>
                {/* <Button variant="secondary" iconLeft={<BiLogoGoogle className="size-6" />} className="gap-x-3">
                  {isLoginForm ? 'Log in with Google' : 'Sign up with Google'}
                </Button> */}
              </div>
              <DialogFooter className="mt-6">
                {isLoginForm ? (
                  <>
                    {/* <span>Don't have an account?</span>
                    <Button asChild variant="link" size="link" onClick={() => handleAuthButtonClick(false)}>
                    <a className="underline">Sign up</a>
                    </Button> */}
                  </>
                ) : (
                  <>
                    <span>Already have an account?</span>
                    <Button
                      asChild
                      variant="link"
                      size="link"
                      onClick={handleLogin}
                    >
                      <a className="underline">Log in</a>
                    </Button>
                  </>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Role Choosing with DialogContent  */}
      <RoleChoosingwithDialog
        roleChoosingOpen={roleChoosingOpen}
        setRoleChoosingOpen={setRoleChoosingOpen}
      />

      {/* Role Choosing Modal */}

      {/* {roleChoosingOpen && (
        <RoleChoosingwithDialog onClose={handleRoleChoosingClose} />
      )} */}
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
    src: "/images/logo.svg",
    alt: "Logo",
  },
  links: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Contact",
      url: "/contact",
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
      size: "medium",
    },
  ],
};
