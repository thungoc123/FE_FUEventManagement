// import { Navbar2 } from "../Organisms/Guest/Navbar";
// import { Header9 } from "../Organisms/Guest/HeaderHero";
// import { Blog33 } from "../Organisms/Guest/Blog33";
// import { Logo1 } from "../Organisms/Guest/Logo1";
// import { Footer1 } from "../Organisms/Guest/Footer";
// import { EventBlog } from "../Organisms/Guest/UpcommingEvent";

import { Input } from "@relume_io/relume-ui";
import { Blog33 } from "../../Organisms/Guest/Blog33";
import { Footer1 } from "../../Organisms/Guest/Footer";
import { Header9 } from "../../Organisms/Guest/HeaderHero";
import { Logo1 } from "../../Organisms/Guest/Logo1";
import { Navbar2 } from "../../Organisms/Guest/Navbar";
import { EventBlog } from "../../Organisms/Guest/UpcommingEvent";
import { BiSearch } from "react-icons/bi";

function HomePage() {
  return (
    <>
      <Navbar2 />
      <Header9 />
      <div className="container">
        <Input
          id="search"
          placeholder="Search"
          icon={<BiSearch className="size-6" />}
        />
      </div>

      <EventBlog />

      <Blog33 />

      <Logo1 />
      <Footer1 />
    </>
  );
}

export default HomePage;
