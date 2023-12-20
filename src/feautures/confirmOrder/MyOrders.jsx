import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveTab } from "../../redux/activeMyAccountTabSlice";

function MyOrders() {
  const dispatch = useDispatch();

  return (
    <>
      <Link
        role="button"
        onClick={() => dispatch(setActiveTab(3))}
        to="/profile"
        className="mx-auto my-5 block rounded-md bg-red-600 px-7 py-3 font-medium text-white"
      >
        MY ORDERS
      </Link>
      <hr></hr>
    </>
  );
}

export default MyOrders;
