import { Link } from "react-router-dom";
import { useUser } from "../authentication/useUser";

function LogoButton() {
  const { user } = useUser();
  const link = user ? "/delivery" : "/login";

  return (
    <div className="flex flex-col items-center">
      <img className="absolute top-4 w-52" src="/logo.svg" />
      <Link
        to={link}
        className="mb-3 bg-red-600 px-12 py-4 text-2xl font-bold text-stone-100"
      >
        DELIVERY
      </Link>
    </div>
  );
}

export default LogoButton;
