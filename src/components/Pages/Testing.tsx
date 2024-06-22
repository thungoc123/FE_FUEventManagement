import React from "react";
import { Navbar2 } from "../Organisms/Guest/Navbar";
import { Header9 } from "../Organisms/Guest/HeaderHero";
import { Blog33 } from "../Organisms/Guest/Blog33";
import { Logo1 } from "../Organisms/Guest/Logo1";
import { Footer1 } from "../Organisms/Guest/Footer";
import { EventBlog } from "../Organisms/Guest/UpcommingEvent";
import SearchBar from "../Atoms/SearchBar";
import { Input } from "@relume_io/relume-ui";
import CreateEvent from "./CreateEvent";

function Testing() {
  return (
    <>
      <Navbar2 />
      <CreateEvent/>
      <Footer1 />
    </>
  );
}

export default Testing;
