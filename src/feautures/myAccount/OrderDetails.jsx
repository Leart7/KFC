import { useEffect, useState } from "react";
import { getLastOrder } from "../../services/apiOrders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/helpers";
import OrderProductAddOns from "../../ui/OrderProductAddOns";
import OrderProductMenuAddOns from "../../ui/OrderProductMenuAddOns";
import { useCalculateOrderPrices } from "../../customHooks/useCalculateOrderPrices";

function OrderDetails({ order, onClick }) {
  const [orderItems, setOrderItems] = useState([]);
  const { calcAddOnsPrice, calcMenuAddOnsPrice, calcTotalOrderPrice } =
    useCalculateOrderPrices();

  const totalPrice = calcTotalOrderPrice(orderItems);

  useEffect(
    function () {
      async function getOrderItems() {
        const orders = await getLastOrder(order.orderUserId);
        setOrderItems(orders);
      }
      getOrderItems();
    },
    [order.orderUserId],
  );

  return (
    <div
      id="modal"
      className="leart fixed left-1/2 top-1/2 z-50 w-[57%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-7 shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold uppercase text-red-600">
          ORDER NO: {orderItems[0]?.orderUserId}
        </h1>
        <FontAwesomeIcon
          role="button"
          type="button"
          onClick={onClick}
          icon={faXmark}
          className="text-3xl text-stone-300"
        />
      </div>
      <p className="text-lg">
        <span className="font-bold">Status:</span> Delivery Completed By Driver
      </p>
      <p className="text-lg">
        <span className="font-bold">Driver:</span> Driver 21 - KFC
      </p>
      <div className="mt-7 flex flex-col gap-y-2 text-sm">
        <div className="relative flex w-full items-center border-b pb-3">
          <p>FullName</p>
          <p className="absolute inset-0 left-[32rem]">
            {orderItems[0]?.firstName} {orderItems[0]?.lastName}
          </p>
        </div>
        <div className="relative flex w-full items-center border-b pb-3">
          <p>Mobile Phone</p>
          <p className="absolute inset-0 left-[32rem]">
            {orderItems[0]?.phoneNumber}
          </p>
        </div>
        <div className="relative flex w-full items-center border-b pb-3">
          <p>Email</p>
          <p className="absolute inset-0 left-[32rem]">
            {orderItems[0]?.email}
          </p>
        </div>
        <div className="relative flex w-full items-center border-b pb-3">
          <p>Full Address</p>
          <p className="absolute inset-0 left-[32rem]">
            {orderItems[0]?.address}
          </p>
        </div>
        <div className="relative flex w-full items-center border-b pb-3">
          <p>Notes</p>
          <p className="absolute inset-0 left-[32rem]">
            {orderItems[0]?.addressNotes}
          </p>
        </div>
      </div>
      <p className="mt-7 font-medium">
        {orderItems[0]?.kfcLocation}{" "}
        <span className="text-red-600">(Phone 080021212)</span>
      </p>
      <p className="text-sm text-gray-500">
        Address: {orderItems[0]?.kfcLocation}
      </p>
      <p className="text-sm text-gray-500">
        Payment Method: Cash(We do not accept Banknotes larger than 50 EUR)
      </p>
      <p className="text-sm text-gray-500">Delivery type: Delivery</p>
      <p className="text-sm text-gray-500">
        Delivery Date: {formatDate(orderItems[0]?.created_at)}
      </p>
      <hr className="mt-3"></hr>
      {orderItems.map((item) => (
        <div
          key={item.id}
          className="flex items-start justify-between border-b py-3"
        >
          <div>
            <div className="me-3 inline-block h-7 w-7 rounded-md bg-red-600 pt-1 text-center text-sm text-white">
              {item.quantity}
            </div>
            <p className="inline-block text-lg font-semibold">
              {item.product.name}
            </p>
            {item.comments && (
              <div className="ms-10 mt-3">
                <p className="text-sm font-semibold">Comments</p>
                <p className="text-sm">{item.comments}</p>
              </div>
            )}
            {item.addOns && (
              <div className="ms-10">
                <p className="text-sm font-semibold">Add Ons</p>
                <OrderProductAddOns items={item.addOns} />
              </div>
            )}
            {item.menuAddOns && (
              <div className="ms-10">
                <p className="text-sm font-semibold">Menu</p>
                <OrderProductMenuAddOns items={item.menuAddOns} />
              </div>
            )}
          </div>
          <p className="text-sm font-medium text-red-600">
            {(
              item.product.price * item.quantity +
              calcAddOnsPrice(item?.addOns) +
              calcMenuAddOnsPrice(item?.menuAddOns)
            ).toFixed(2)}
            €
          </p>
        </div>
      ))}
      <div className="mt-3 flex flex-col border-b pb-3">
        <div className="flex items-center justify-between">
          <p className=" text-gray-500">Subtotal</p>
          <p className="text-sm text-red-600">{totalPrice}€</p>
        </div>
        <div className="flex items-center justify-between">
          <p className=" text-gray-500">Tax (0%)</p>
          <p className="text-sm text-red-600">0.00€</p>
        </div>
        <div className="flex items-center justify-between">
          <p className=" text-gray-500">Delivery Fee</p>
          <p className="text-sm text-red-600">0.00€</p>
        </div>
        <div className="flex items-center justify-between">
          <p className=" text-gray-500">Driver Tips (0%)</p>
          <p className="text-sm text-red-600">0.00€</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-lg font-semibold">Total including VAT (18%)</p>
        <p className="text-sm text-red-600">{totalPrice}€</p>
      </div>
    </div>
  );
}

export default OrderDetails;
