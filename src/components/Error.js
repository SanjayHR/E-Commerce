import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>{error.status}</h1>
      <h2>{error.statusText}</h2>
      <h3>{error.data}</h3>
    </div>
  );
};

export default Error;
