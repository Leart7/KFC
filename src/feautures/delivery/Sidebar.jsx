import EmptyCart from "../../ui/EmptyCart";
import SidebarProduct from "./SidebarProduct";
import { useCart } from "./useCart";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInsertOrderUser } from "./useInsertOrderUser";
import { useUser } from "../authentication/useUser";
import { useAddOns } from "./useAddOns";
import { useMenuItems } from "./useMenuItems";

function Sidebar({ from }) {
  const { isLoading, cart } = useCart();
  const { insertOrderUser } = useInsertOrderUser();
  const { user } = useUser();
  const [style, setStyle] = useState("fixed right-0 top-20 w-1/4");

  const { addOns } = useAddOns();
  const { menuAddOns } = useMenuItems();

  const menuAddOnss = cart
    ?.map((cart) => cart.menuAddOns)
    .join(",")
    .split(",");

  const addOnss = cart
    ?.map((cart) => cart.addOns)
    .join(",")
    .split(",");

  const filteredItems = addOns?.filter((item) =>
    addOnss?.includes(item.id.toString()),
  );

  const filteredMenuItems = menuAddOns?.filter((item) =>
    menuAddOnss?.includes(item.id.toString()),
  );

  const addOnsPrice = filteredItems?.reduce((acc, cur) => acc + cur.price, 0);
  const menuAddOnsPrice = filteredMenuItems?.reduce(
    (acc, cur) => acc + cur.price,
    0,
  );

  const numProducts = cart?.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalPrice = cart?.reduce(
    (acc, cur) =>
      acc + cur.quantity * cur.product.price + addOnsPrice + menuAddOnsPrice,
    0,
  );

  useLayoutEffect(
    function () {
      const element = document.getElementById("fixedDiv");

      if (element?.getBoundingClientRect().height >= 840) {
        setStyle("w-full mt-5");
      } else {
        setStyle("fixed right-0 top-20 w-1/4");
      }
    },
    [cart],
  );

  if (cart?.length === 0) return <EmptyCart />;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="relative flex-grow border-l">
      <div
        id="fixedDiv"
        className={`${style} flex flex-col items-center justify-center`}
      >
        <h1 className="mb-2 text-2xl font-bold uppercase text-red-600">
          Your Order
        </h1>
        <p className="text-lg font-semibold">KFC Gjilan</p>
        {!from && (
          <p className="text-sm text-stone-700">Min subtotal order: 5.00€</p>
        )}
        {from === "checkout" ? (
          <Link to="/delivery" className="mt-7 text-red-600">
            Edit order
          </Link>
        ) : (
          totalPrice >= 5 && (
            <Link
              role="button"
              onClick={() => {
                insertOrderUser({ userId: user.id });
              }}
              to="/checkout"
              className="mt-4 rounded-md bg-red-600 px-32 py-3 text-lg font-bold uppercase tracking-wide text-white"
            >
              CHECKOUT
            </Link>
          )
        )}
        <div className="mt-4 w-full border-y">
          {cart?.map((product) => (
            <SidebarProduct from={from} key={product.id} product={product} />
          ))}
        </div>
        <div className="w-full ">
          <div className="flex w-full items-center justify-between border-b px-4 py-2 pr-8">
            <p>Subtotal</p>
            <p>{totalPrice?.toFixed(2)}€</p>
          </div>
          <div className="flex w-full items-center justify-between border-b px-4 py-2 pr-8">
            <p>Tax(0%)</p>
            <p>0.00€</p>
          </div>
          <div className="flex w-full items-center justify-between border-b px-4 py-2 pr-8">
            <p>Delivery Fee</p>
            <p>0.00€</p>
          </div>
          <div className="flex w-full items-center justify-between border-b bg-stone-200 px-4 py-2 pr-8">
            <p>{numProducts}</p>
            <p className="font-semibold">Total including VAT (18%)</p>
            <p>{totalPrice?.toFixed(2)}€</p>
          </div>
        </div>
        {from === "checkout" && (
          <button
            type="submit"
            form="myForm"
            id="checkoutButton"
            className="mt-4 rounded-md bg-red-600 px-32 py-3 text-lg font-bold uppercase tracking-wide text-white"
          >
            PLACE ORDER
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
