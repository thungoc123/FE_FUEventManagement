// RoleChoosing.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@relume_io/relume-ui";

const RoleChoosing = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    if (role === "Visitor") {
      navigate("/visitor");
    } else if (role === "Sponsor") {
      navigate("/sponsor");
    }
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">Role Choosing</h2>
          <p className="md:text-md">Please select your role:</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-6 md:grid-cols-2 md:gap-8">
          <Button variant="primary" onClick={() => handleRoleSelect("Visitor")}>
            Visitor
          </Button>
          <Button variant="primary" onClick={() => handleRoleSelect("Sponsor")}>
            Sponsor
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoleChoosing;
