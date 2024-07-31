import { Button } from "@relume_io/relume-ui"
import { useNavigate } from "react-router-dom"

const CreateCallCapital = () => {
    const navigate = useNavigate();
  
    const handleDonateClick = () => {
        navigate("/eventoperator/dashboard/CreateCallCapital");
    };

  return (
    <Button onClick={() => handleDonateClick()}>Create call capital</Button>
  )
}

export default CreateCallCapital