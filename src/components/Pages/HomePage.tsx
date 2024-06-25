import { Navbar2 } from "../Organisms/Guest/Navbar";
import { Header9 } from "../Organisms/Guest/HeaderHero";
import { Blog33 } from "../Organisms/Guest/Blog33";
import { Logo1 } from "../Organisms/Guest/Logo1";
import { Footer1 } from "../Organisms/Guest/Footer";
import { EventBlog } from "../Organisms/Guest/UpcommingEvent";
import { useGetEventsQuery } from "../../Features/Event/eventApi";

function HomePage() {
  const { data: eventPosts = [], error, isLoading } = useGetEventsQuery(); // Sử dụng hook để lấy dữ liệu

  if (isLoading) return 
  <div className="loader">Loading...</div>;
  
  if (error) return <div>Error loading events</div>;
  return (
    <>
      <Navbar2 />
      <Header9 />
      <EventBlog
        tagline="Discover"
        heading="Upcoming Events"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        button={{ title: "View all", variant: "secondary" }}
        EventPosts={eventPosts}
      />
      <Blog33
        tagline="Blog"
        heading="Event On the Line"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        button={{ title: "View all", variant: "secondary" }}
        EventPosts={eventPosts} // Truyền dữ liệu sự kiện vào Blog />
      />

      <Logo1 />
      <Footer1 />
    </>
  );
}

export default HomePage;
