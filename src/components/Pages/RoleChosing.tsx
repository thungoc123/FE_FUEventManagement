import { RiCloseCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Button } from "@relume_io/relume-ui";

interface RoleChoosingProps {
  onClose: () => void;
}

const RoleChoosing: React.FC<RoleChoosingProps> = ({ onClose }) => {
  const navigate = useNavigate(); 
  const handleRoleSelect = (role: string) => {
    if (role === "Visitor") {
      navigate("/visitor");
    } else if (role === "Sponsor") {
      navigate("/sponsor");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg shadow-lg relative w-full max-w-md mx-auto">
        <button className="absolute top-4 right-4 text-2xl z-60" onClick={onClose}>
          <RiCloseCircleLine />
        </button>
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
      </div>
    </div>
  );
};

export default RoleChoosing;
