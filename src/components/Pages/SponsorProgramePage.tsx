import { Blog44 } from "../Organisms/Dashboard/Blog44";
import { BlogPostHeader2 } from "../Organisms/Dashboard/BlogPost";
import { Footer1 } from "../Organisms/Guest/Footer";
import { NavbarLogout } from "../Organisms/Guest/NavbarLogout";

function SponsorHomepage() {
    return (
      <>
        <NavbarLogout />
        <BlogPostHeader2/>
       
        <Blog44/>
        <Footer1 />
      </>
    );
  }
  
  export default SponsorHomepage;
  