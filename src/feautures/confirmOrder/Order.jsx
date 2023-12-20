import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLastOrder } from "./useLastOrder";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import OrderProductAddOns from "../../ui/OrderProductAddOns";
import OrderProductMenuAddOns from "../../ui/OrderProductMenuAddOns";
import OrderSubtotal from "./OrderSubtotal";
import TotalPrice from "./TotalPrice";
import OrderFooter from "./OrderFooter";
import { useCalculateOrderPrices } from "../../customHooks/useCalculateOrderPrices";

function Order() {
  const { isLoading, order } = useLastOrder();
  const { calcAddOnsPrice, calcMenuAddOnsPrice } = useCalculateOrderPrices();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mx-auto mb-20 mt-5 w-1/2">
      <div className="bg-red-600 py-4 text-center text-2xl font-bold uppercase text-white">
        <p>Order number</p>
        <p>#{order[0]?.orderUserId}</p>
      </div>
      <div className="bg-stone-50 px-10 py-5">
        <div className="flex items-center gap-x-80 ">
          <div className="">
            <h2 className="mb-5 text-xl font-bold">From</h2>
            <p>{order[0]?.kfcLocation}</p>
            <p>{order[0]?.kfcLocation}</p>
            <p>080021212 -</p>
            <p>delivery@kfc-ks.com</p>
          </div>
          <div className="">
            <h2 className="mb-5 text-xl font-bold">To</h2>
            <p>{`${order[0]?.firstName} ${order[0]?.lastName}`}</p>
            <p>{order[0]?.address}</p>
            <p className="text-red-600">{order[0]?.addressNotes}</p>
            <p>{order[0]?.phoneNumber} -</p>
            <p>{order[0]?.email}</p>
          </div>
        </div>
        <h2 className="mt-8 text-xl font-bold">Your order</h2>
        {order.map((order) => (
          <div key={order.id} className="my-5 flex items-start justify-between">
            <div className="flex flex-col gap-y-1">
              <p>
                <span className="me-1 text-red-600">{order.quantity}</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="mx-1 font-bold text-stone-500"
                />
                {order.product.name}
              </p>
              {order.comments && (
                <>
                  <p className="text-sm font-semibold">Comments</p>
                  <p className="text-sm">{order.comments}</p>
                </>
              )}
              {order.addOns && (
                <>
                  <p className="text-sm font-semibold">Add Ons</p>
                  <OrderProductAddOns items={order.addOns} />
                </>
              )}
              {order.menuAddOns && (
                <>
                  <p className="text-sm font-semibold">Menu</p>
                  <OrderProductMenuAddOns items={order.menuAddOns} />
                </>
              )}
            </div>
            <p>
              {(
                order.product.price * order.quantity +
                calcAddOnsPrice(order.addOns) +
                calcMenuAddOnsPrice(order.menuAddOns)
              ).toFixed(2)}
              €
            </p>
          </div>
        ))}
        <hr></hr>
        <OrderSubtotal />
        <hr></hr>
        <TotalPrice />
        <hr></hr>
        <OrderFooter />
      </div>
    </div>
  );
}

export default Order;
