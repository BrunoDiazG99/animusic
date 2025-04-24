import {
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: "/animusic/callback" });
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code"); // Access the authorization code

    if (code) {
      localStorage.setItem("access_code", code);
      navigate({ to: "/animusic" });
    } else {
      setError(true);
    }
  }, [location.search, navigate]);

  if (error) return <div>We got an error, try again later</div>;
  return <div>Loading...</div>;
};

export const Route = createFileRoute("/animusic/callback")({
  component: Callback,
});
