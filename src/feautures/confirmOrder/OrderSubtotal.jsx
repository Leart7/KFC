import { useCalculateOrderPrices } from "../../customHooks/useCalculateOrderPrices";
import { useLastOrder } from "./useLastOrder";

function OrderSubtotal() {
  const { order } = useLastOrder();

  const { calcTotalOrderPrice } = useCalculateOrderPrices();
  return (
    <div className="mb-5">
      <div className="mb-5 mt-5 flex items-center justify-between">
        <p className="font-medium">Subtotal</p>
        <p>{calcTotalOrderPrice(order)}€</p>
      </div>
      <div className="mb-1 flex items-center justify-between">
        <p>Tax(0%)</p>
        <p>0.00€</p>
      </div>
      <div className=" flex items-center justify-between">
        <p>Delivery fee</p>
        <p>0.00€</p>
      </div>
    </div>
  );
}

export default OrderSubtotal;
