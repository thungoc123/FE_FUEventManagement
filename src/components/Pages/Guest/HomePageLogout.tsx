
// import { Header9 } from "../Organisms/Guest/HeaderHero";
// import { Blog33 } from "../Organisms/Guest/Blog33";
// import { Logo1 } from "../Organisms/Guest/Logo1";
// import { Footer1 } from "../Organisms/Guest/Footer";
// import { EventBlog } from "../Organisms/Guest/UpcommingEvent";
// import { NavbarLogout } from "../Organisms/Guest/NavbarLogout";

import { Blog33 } from "../../Organisms/Guest/Blog33";
import { Footer1 } from "../../Organisms/Guest/Footer";
import { Header9 } from "../../Organisms/Guest/HeaderHero";
import { Logo1 } from "../../Organisms/Guest/Logo1";
import { NavbarLogout } from "../../Organisms/Guest/NavbarLogout";
import { EventBlog } from "../../Organisms/Guest/UpcommingEvent";

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
