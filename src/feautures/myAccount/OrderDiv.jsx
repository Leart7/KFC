import { useModalCloser } from "../../customHooks/useModalCloser";
import { getLastOrder } from "../../services/apiOrders";
import { formatDate } from "../../utils/helpers";
import Overlay from "../../ui/Overlay";
import OrderDetails from "./OrderDetails";
import { useCart as useInsertCart } from "../delivery/useInsertCart";
import { useUser } from "../authentication/useUser";
import { useNavigate } from "react-router-dom";
import { deleteAllCartItems } from "../../services/apiCart";

function OrderDiv({ order }) {
  const navigate = useNavigate();
  const [clickedModal, setClickedModal] = useModalCloser();
  const { insertCart } = useInsertCart();
  const { user } = useUser();

  async function addToCart(orderUserId) {
    const order = await getLastOrder(orderUserId);
    deleteAllCartItems(user.id);
    for (let i = 0; i < order.length; i++) {
      insertCart({
        productId: order[i].product.id,
        userId: user.id,
        quantity: order[i].quantity,
        comments: order[i].comments,
        addOns: String(order[i].addOns),
        menuAddOns: String(order[i].menuAddOns),
      });
    }
    navigate("/delivery");
  }

  return (
    <>
      <div
        key={order.orderUserId}
        className="relative mb-14 mt-5 flex items-start justify-end"
      >
        <div className="absolute inset-0 left-80 ">
          <p className="mb-3 font-semibold">
            {order.orderUserId}. {order.kfcLocation}
          </p>
          <p>{formatDate(order.created_at)}</p>
          <p
            role="button"
            onClick={() => setClickedModal(true)}
            className="text-red-600 underline-offset-2 hover:cursor-pointer hover:underline"
          >
            View Order
          </p>
        </div>
        <div className="z-30 me-40 flex flex-col items-center">
          <p>Delivery Completed By Driver</p>
          <button
            onClick={() => addToCart(order.orderUserId)}
            className="rounded-md bg-red-600 px-20 py-1 text-center text-sm font-semibold text-white hover:cursor-pointer"
          >
            REORDER
          </button>
        </div>
      </div>
      <hr></hr>
      {clickedModal && (
        <>
          <OrderDetails order={order} onClick={() => setClickedModal(false)} />
          <Overlay />
        </>
      )}
    </>
  );
}

export default OrderDiv;
