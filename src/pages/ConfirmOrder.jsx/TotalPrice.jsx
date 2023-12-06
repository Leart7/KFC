import { useOrder } from "./useOrder";

function TotalPrice() {
  const { order } = useOrder();

  const totalPrice = order.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0,
  );

  return (
    <div className="my-5 flex items-center justify-between">
      <h1 className="text-xl font-bold">Total including VAT (18%)</h1>
      <h1 className="text-xl font-bold">{totalPrice}€</h1>
    </div>
  );
}

export default TotalPrice;
