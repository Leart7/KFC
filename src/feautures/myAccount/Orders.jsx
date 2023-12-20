import { useAllOrders } from "./useAllOrders";

import OrderDiv from "./OrderDiv";

function Orders() {
  const { orders } = useAllOrders();

  return (
    <div>
      {orders?.map((order) => (
        <OrderDiv key={order.id} order={order} />
      ))}
    </div>
  );
}

export default Orders;
