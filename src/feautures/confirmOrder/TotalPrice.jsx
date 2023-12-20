import { useCalculateOrderPrices } from "../../customHooks/useCalculateOrderPrices";
import { useLastOrder } from "./useLastOrder";

function TotalPrice() {
  const { order } = useLastOrder();

  const { calcTotalOrderPrice } = useCalculateOrderPrices();

  return (
    <div className="my-5 flex items-center justify-between">
      <h1 className="text-xl font-bold">Total including VAT (18%)</h1>
      <h1 className="text-xl font-bold">{calcTotalOrderPrice(order)}€</h1>
    </div>
  );
}

export default TotalPrice;
