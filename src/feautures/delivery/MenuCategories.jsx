import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setMenu } from "../../redux/deliverySlice.js";

function MenuCategories({ children, id }) {
  const dispatch = useDispatch();
  const { activeIndex } = useSelector((store) => store.delivery);

  function handleClick(index) {
    dispatch(setMenu(index));
  }

  return (
    <Link
      to={`?category=${id}`}
      className={`${id === "All" ? "ml-3" : ""} ${
        id === activeIndex
          ? "underline decoration-[3px] underline-offset-[16px]"
          : ""
      }`}
      role="button"
      onClick={() => handleClick(id)}
    >
      {children}
    </Link>
  );
}

export default MenuCategories;
