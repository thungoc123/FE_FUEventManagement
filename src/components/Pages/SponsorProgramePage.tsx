// import { useGetSponsorProgramQuery } from "../../Features/Sponsor/sponsor_programApi";
// import { Blog44 } from "../Organisms/Dashboard/Blog44";
// import { BlogPostHeader2 } from "../Organisms/Dashboard/BlogPost";
// import { Footer1 } from "../Organisms/Guest/Footer";
// import { NavbarLogout } from "../Organisms/Guest/NavbarLogout";
// import { BiLinkAlt } from "react-icons/bi"; // Import BiLinkAlt icon

// function SponsorHomepage() {
//   const { data: sponsorPrograms, error, isLoading } = useGetSponsorProgramQuery();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading sponsor programs</div>;
//   }

//     return (
//       <>
//         <NavbarLogout />
//         {sponsorPrograms && sponsorPrograms.length > 0 && (
//         <BlogPostHeader2
//           heading={sponsorPrograms[0].title}
//           postDetails={[
//             { title: "Description", description: sponsorPrograms[0].description },
//             { title: "Location", description: sponsorPrograms[0].location },
//             { title: "State", description: sponsorPrograms[0].state },
//           ]}
//           image={{ src: sponsorPrograms[0].thumbnail, alt: sponsorPrograms[0].title }}
//           socialMediaLinks={[
//             { url: sponsorPrograms[0].link, icon: <BiLinkAlt className="size-6" /> },
//           ]}
//         />
//       )}
       
//         <Blog44 
        
//         />
//         <Footer1 />
//       </>
//     );
//   }
  
//   export default SponsorHomepage;
import React from 'react';
import { useGetSponsorProgramQuery } from "../../Features/Sponsor/sponsor_programApi";
import { Blog44 } from "../Organisms/Dashboard/Blog44";
import { BlogPostHeader2 } from "../Organisms/Dashboard/BlogPost";
import { Footer1 } from "../Organisms/Guest/Footer";
import { NavbarLogout } from "../Organisms/Guest/NavbarLogout";
import { BiLinkAlt } from "react-icons/bi"; // Import BiLinkAlt icon
import { Navbar2 } from '../Organisms/Guest/Navbar';
import { Layout192 } from '../Organisms/Guest/ListBlogPost';

function SponsorHomepage() {
  const { data: sponsorPrograms, error, isLoading } = useGetSponsorProgramQuery();
  console.log(sponsorPrograms);
  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error loading sponsor programs</div>;
  }

  return (
    <>
      {/* <NavbarLogout /> */}
      <Navbar2 />
      {sponsorPrograms && sponsorPrograms.length > 0 && (
        // <h1>{sponsorPrograms.length}</h1>
        <Layout192 />
        // <BlogPostHeader2
        //   heading={sponsorPrograms[0].title}
        //   postDetails={[
        //     { title: "Description", description: sponsorPrograms[0].description },
        //     { title: "Location", description: sponsorPrograms[0].location },
        //     { title: "State", description: sponsorPrograms[0].state },
        //   ]}
        //   image={{ src: sponsorPrograms[0].thumbnail, alt: sponsorPrograms[0].title }}
        //   socialMediaLinks={[
        //     { url: sponsorPrograms[0].link, icon: <BiLinkAlt className="size-6" /> },
        //   ]}
        // />
      )}
      {/* <Blog44 /> */}
      <Footer1 />
    </>
  );
}

export default SponsorHomepage;
