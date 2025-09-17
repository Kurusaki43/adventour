import { Button } from "@/components/ui/button";
import { ErrorStatus, ErrorStatusMsg } from "@/constants/errorMessages";
import { useNavigate } from "react-router-dom";

type ErrorProps = {
  status: ErrorStatus;
  to: string;
};
const Error = ({ status, to }: ErrorProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 p-2">
      <div className="w-[350px] lg:w-1/3 h-[450px]">
        <img
          src={ErrorStatusMsg[status].img}
          alt={status.toString()}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="text-center lg:text-left p-2">
        <p className="text-3xl lg:text-4xl font-bold text-[#59585d] mb-4">
          {status}: {ErrorStatusMsg[status].title}
        </p>
        <p className="font-medium text-lg lg:text-xl mb-6 text-center  text-[#59585d]">
          {ErrorStatusMsg[status].message}
        </p>
        <Button onClick={() => (to === "back" ? navigate(-1) : navigate(to))}>
          Take me back
        </Button>
      </div>
    </div>
  );
};

export default Error;
