import { RiCloseCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Button, ImgProps } from "@relume_io/relume-ui";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Input,
} from "@relume_io/relume-ui";
interface RoleChoosingProps {
  //   onClose: () => void;
  logo?: ImgProps[];
  roleChoosingOpen: boolean;
  setRoleChoosingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoleChoosingwithDialog: React.FC<RoleChoosingProps> = ({
  //   onClose,
  logo,
  roleChoosingOpen,
  setRoleChoosingOpen
}) => {
  const navigate = useNavigate();
  const handleRoleSelect = (role: string) => {
    if (role === "Visitor") {
      navigate("/visitor");
    } else if (role === "Sponsor") {
      navigate("/sponsor");
    }
  };

  return (
    <>
      <Dialog open={roleChoosingOpen} onOpenChange={setRoleChoosingOpen}>
        <DialogTrigger asChild>
          <span></span> 
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/25" />
          <DialogContent className="w-full max-w-[33vw] bg-white p-10 md:p-12 mx-auto my-auto  shadow-lg">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold mb-4 text-center">Role Choosing</DialogTitle>
              <DialogDescription className="mb-6 text-center"> Please select your role:</DialogDescription>
            </DialogHeader>
            <>
            <div className="grid grid-cols-1 items-start justify-center gap-6 md:grid-cols-2 md:gap-8">
              {logo.map((item, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  className="p-12"
                  onClick={() => handleRoleSelect(item.alt || "Visitor")}
                >
                  <img key={index} src={item.src} alt={item.alt} />
                </Button>
              ))}
            </div>
            </>
            <DialogFooter>
              
             <span></span>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};
RoleChoosingwithDialog.defaultProps = {
  logo: [
    {
      src: "src/assets/scholar.png",
      alt: "Visitor",
    },
    {
      src: "src/assets/investor.png",
      alt: "Sponsor",
    },
  ],
};
export default RoleChoosingwithDialog;
