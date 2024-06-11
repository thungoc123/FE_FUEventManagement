import React from "react";
import { Navbar2 } from "../Organisms/Guest/Navbar";
import { Header9 } from "../Organisms/Guest/HeaderHero";
import { Blog33 } from "../Organisms/Guest/Blog33";
import { Logo1 } from "../Organisms/Guest/Logo1";
import { Footer1 } from "../Organisms/Guest/Footer";
import { EventBlog } from "../Organisms/Guest/UpcommingEvent";
import SearchBar from "../Atoms/SearchBar";
import { NavbarLogout } from "../Organisms/Guest/NavbarLogout";

function HomePageLogout() {
  return (
    <>
      <NavbarLogout />
      <Header9 />
      <Blog33 />
      <EventBlog />

      <Logo1 />
      <Footer1 />
    </>
  );
}

export default HomePageLogout;
