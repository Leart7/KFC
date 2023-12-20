import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!localStorage.getItem("JwtToken")) navigate("/");
    },
    [navigate],
  );

  return <Outlet />;
}

export default ProtectedRoute;
