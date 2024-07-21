// components/Navbar2.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@relume_io/relume-ui";
import type { ImgProps, ButtonProps } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import '../Style/navbar.css'
import {BiSearch } from "react-icons/bi";
import Modal from 'react-modal';
import { EventImage, StateEvent } from "../../../Types/eo.type";

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
import { useAuth } from "../../../Contexts/AuthContext";
// components/Navbar2.tsx
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from "react-router-dom";
import NewPasswordModal from "./NewPasswordModal";
import ResetPassword from "./ResetPassword";
import SearchBar from "./SearchBar";
import { truncateString } from "../../../ulities/Stringhandle";


type LinkProps = {
  title?: string;
  url?: string;
};

type MenuLinkProps = LinkProps & {
  subLinks?: LinkProps[];

};
type EventPost = {
  id: number;
  name: string;
  description: string;
  price: number;
  timestart: string;
  timeend: string;
  timeopensale: string;
  timeclosesale: string;
  stateEvent?: StateEvent | null;
  eventImages: EventImage[] | null;
  url?: string;
  button?: ButtonProps;
  location?: string;

};
type Props = {
  logo?: ImgProps;
  links?: MenuLinkProps[];
  buttons?: ButtonProps[];
  EventPosts?: EventPost[];

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
  const { logo, links, buttons, EventPosts } = {
    ...Navbar2Defaults,
    ...props,
  } as Props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [roleChoosingOpen, setRoleChoosingOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetData, setResetData] = useState({ email: "", newPassword: "" });
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isNewPasswordOpen, setIsNewPasswordOpen] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  // login function with redux
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
  // const token = useSelector((state: RootState) => state.auth.token);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const storedEmail = localStorage.getItem("email") || "";
      setEmail(storedEmail);
      setIsLogin(true);
      dispatch(setToken(token));
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (decodedToken.accountId) {
        dispatch(setAccountId(decodedToken.accountId)); // Dispatch accountId to the Redux store
      }
    } else {
      setIsLogin(false);
    }
  }, [token]); 


  const NavigationAuth = (token: string) => {
    let decodedToken = jwtDecode<JwtPayload>(token);
    console.log(decodedToken);
    switch (decodedToken.role) {
      case "ROLE_EO":
        navigate("eventoperator/event/publish/analytics/");
        break;
      case "ROLE_SPONSOR":
        navigate("/sponsor/dashboard/");
        break;
      case "ROLE_VISITOR":
        navigate("/");
        break;
      case "ROLE_CHECKING_STAFF":
        navigate("/admin/checkingstaff");
        break;
      case "ROLE_ADMIN":
        navigate("/admin");
        break;
    }
  };

  const handleRoleChoosingClose = () => {
    setRoleChoosingOpen(false);
  };

  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<EventPost[]>(EventPosts || []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchValue(query);

    if (!EventPosts) return;

    const filtered = EventPosts.filter((post) =>
      post.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    setFilteredEvents(EventPosts || []);
  }, [EventPosts]);

  return (
    <div className="nav_wrapper">
    <nav className="flex w-full items-center lg:min-h-18 lg:px-[5%]" style={{ background: 'linear-gradient(280deg, #1e005a 0%, #3c016c 30%, #1e005a 100%, #1e005a 100%);', borderRadius:'0 0 63px 63px' }}>
      <div className="mx-auto size-full lg:grid lg:grid-cols-[0.375fr_1fr_0.375fr] lg:items-center lg:justify-between lg:gap-4"  >
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0" 
         
        >
          <img src={logo.src} alt={logo.alt} style={{ width: '50px' }} />
          <div className="flex items-center gap-4 lg:hidden">
            {isLogin ? (
              <Dropdown email={email} />
            ) : (
              buttons.map((button, index) => (
                <div className="button_border">
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
                </div>
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
              className="first:pt-4 lg:first:pt-0 menu"
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
          <BiSearch className="text-white mr-2" style={{ fontSize: '20px', color:'#00fff9', fontWeight:'bold' }} onClick={openModal}/>
          {isLogin ? (
            <Dropdown email={email} />
          ) : (
            buttons.map((button, index) => (
              <Button
                key={`${button.title}-${index}`}
                className="px-6 py-2 mx-2 login_button"
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
    
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '70%',
            height: '70%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle at center left, #402a6d 0%, #1e005a 20%, #1e005a 16%)',
            // ".scollbar-thin": {
            //   scrollbarWidth: "thin",
            //   scrollbarColor: "#00fff9 #b9a1e4",
            // },
            // '&::-webkit-scrollbar-track': {
            //   backgroundColor: 'red',
            // },
            // '&::-webkit-scrollbar-thumb': {
            //   backgroundColor: 'blue',
            //   borderRadius: '1rem',
            //   border: '3px solid orange'
            // },
          }
        }}
        
        // className="SearchModal"
        // className="scollbar-thin scollbar-webkit"
      >



      <SearchBar value={searchValue} onChange={handleSearch}/>
      <section className="px-[5%] py-16 md:py-24 lg:py-28 scollbar-thin scollbar-webkit searchModel">
      <div className="container grid grid-cols-1 items-start md:grid-flow-row md:gap-x-12 lg:gap-x-20">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
          {filteredEvents.map((member, index) => {
            
            const eventImageUrl =
              member.eventImages && member.eventImages.length > 0
                ? member.eventImages[0].url
                : "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg";
            
            return (
            <div
              className="grid grid-cols-1 items-start gap-5 sm:gap-y-6 md:grid-cols-2 md:gap-x-8"
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/event-detail/${member.id}`);
              }}
            >
              <div className="w-full overflow-hidden">
                <img
                  src={eventImageUrl}
                  alt=""
                  className="aspect-[1] size-full object-cover"
                />
              </div>
              <div className="flex flex-col items-stretch justify-center">
                <div className="mb-3 md:mb-4">
                  <h5 className="text-md font-semibold md:text-lg">{member.name}</h5>
                  <h6 className="md:text-md">{member.timestart}</h6>
                </div>
                <p>{truncateString(member.description,70)}</p>
                <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-start">
                  {/* {member.socialLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
                    >
                      {link.icon}
                    </a>
                  ))} */}
                </div>
              </div>
            </div>
          )})}
        </div>

       
      </div>
    </section>

        {/* <h2>Hello, I am a Modal</h2>
        <button onClick={closeModal}>Close Modal</button> */}
      </Modal>
    </div>
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
    src: "/src/assets/logo-removebg-preview.png",
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
