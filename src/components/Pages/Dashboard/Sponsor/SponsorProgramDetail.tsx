import { useParams } from 'react-router-dom';
import { useGetSponsorProgramQuery } from '../../../../Features/Sponsor/sponsor_programApi';
import { Navbar2 } from '../../../Organisms/Guest/Navbar';
import { BlogPostHeader2 } from '../../../Organisms/Dashboard/BlogPost';
import { Blog44 } from '../../../Organisms/Dashboard/Blog44';
import { Footer1 } from '../../../Organisms/Guest/Footer';
import { BiLinkAlt } from "react-icons/bi";
import { useGetEventDetailsQuery, useGetPublishedEventsQuery } from '../../../../Features/Event/eventDisplayApi';
import { useGetListEventQuery } from '../../../../Features/EventManage/eventApi';


function SponsorProgramDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const { data: sponsorPrograms, error, isLoading } = useGetSponsorProgramQuery();

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error loading sponsor programs</div>;
  }

  // Kiểm tra nếu sponsorPrograms đã được tải
  const sponsorProgram = sponsorPrograms?.find(program => program.id.toString() === id);

  if (!sponsorProgram) {
    return <div>Sponsor Program not found</div>;
  }
  const event = sponsorProgram.sponsorProgramEvents
  console.log(event);
  // const { data: event } = useGetPublishedEventsQuery();

  // const eventName: string[] = [];
  // eventId.map((id) => {
  //   event?.map((event) => {
  //     if (event.id === Number(id)) {
  //       eventName.push(event.title);
  //     }
  //   }
  // )});
  // console.log(eventName)

  const blogPosts = sponsorPrograms?.map((program) => ({
    url: `/sponsor-detail/${program.id}`, // Adjust the URL as needed
    image: {
      src: program.thumbnail,
      alt: program.title,
    },
    category: "Category", // You can adjust this as needed
    readTime: "5 min read", // You can adjust this as needed
    title: program.title,
    description: program.description,
    button: {
      title: "Read more",
      variant: "link",
      size: "link",
      iconRight: <BiLinkAlt className="size-4" />,
    },
  }));

  return (
    <>
      <Navbar2 />
      <BlogPostHeader2
        heading={sponsorProgram.title}
        postDetails={[
          { title: "Description", description: sponsorProgram.description },
          { title: "Location", description: sponsorProgram.location },
          { title: "State", description: sponsorProgram.state },
        ]}
        image={{ src: sponsorProgram.thumbnail, alt: sponsorProgram.title }}
        socialMediaLinks={[
          { url: sponsorProgram.link, icon: <BiLinkAlt className="size-6" /> },
        ]}
        eventTag={event}
      />
      <Blog44 blogPosts={blogPosts} /> {/* Nếu cần hiển thị thêm blog posts */}
      <Footer1 />
    </>
  );
}

export default SponsorProgramDetail;
