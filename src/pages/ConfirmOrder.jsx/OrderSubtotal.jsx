import { useOrder } from "./useOrder";

function OrderSubtotal() {
  const { order } = useOrder();

  const totalPrice = order.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0,
  );

  return (
    <div className="mb-5">
      <div className="mb-5 mt-5 flex items-center justify-between">
        <p className="font-medium">Subtotal</p>
        <p>{totalPrice}€</p>
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
