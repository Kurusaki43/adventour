import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Error from "./common/Error";

const GlobalErrorHandler = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Error status={error.status} to={"back"} />;
  } else return <Error status={500} to={"/"} />;
};

export default GlobalErrorHandler;
