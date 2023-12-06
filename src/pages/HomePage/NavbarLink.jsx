import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveIndex } from "./activeNavTabSlice";

function NavbarLink({ link }) {
  const dispatch = useDispatch();
  const { activeIndex } = useSelector((store) => store.activeNavTab);

  return (
    <Link
      to={link.path}
      onClick={() => dispatch(setActiveIndex(link.id))}
      className={`${
        activeIndex === link.id ? "text-red-600" : ""
      } hover:cursor-pointer hover:text-red-600 hover:underline hover:underline-offset-4`}
    >
      {link.name}
    </Link>
  );
}

export default NavbarLink;
