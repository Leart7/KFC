import { useDispatch } from "react-redux";
import { updateCart } from "./cartSlice";
import { useDeleteCart } from "./useDeleteCart";
import { useUpdateCart as useUpdateCartApi } from "./useUpdateCart";
import { useUser } from "../authentication/useUser";
import { useEffect, useLayoutEffect, useState } from "react";

function QuantityDropdown({ product }) {
  const { user } = useUser();
  const { deleteCart } = useDeleteCart();
  const { updateCart: upCart } = useUpdateCartApi();
  const dispatch = useDispatch();

  const productId = product.id;

  const [position, setPosition] = useState("top-7");

  useLayoutEffect(function () {
    const element = document.getElementById("quantitydropdown");

    if (element?.getBoundingClientRect().y >= 550) {
      setPosition("-top-96");
    } else {
      setPosition("top-7");
    }
  }, []);

  return (
    <div
      id="quantitydropdown"
      className={`absolute inset-0 ${position} z-50 h-96 w-[4.5rem] overflow-y-scroll rounded-md border bg-white text-sm shadow-lg transition-transform duration-300`}
    >
      {Array.from({ length: 100 }, function (_, i) {
        if (i === 0)
          return (
            <p
              role="button"
              onClick={() => {
                deleteCart(product.id);
              }}
              className="unselectable pr-5 text-red-600 hover:cursor-default hover:bg-blue-600 hover:text-white"
            >
              Remove
            </p>
          );
        return (
          <p
            key={i}
            role="button"
            onClick={() => {
              const data = {
                id: product.id,
                addOns: product.addOns,
                product: product.product,
                quantity: i,
                user: user.id,
              };
              console.log(productId);
              upCart({
                id: productId,
                quantity: i,
                comments: product.comments,
                addOns: product.addOns,
                menuAddOns: product.menuAddOns,
              });
              dispatch(
                updateCart(
                  product.cartId,
                  i,
                  product.comments,
                  product.addOns,
                  product.menu,
                ),
              );
            }}
            className="unselectable text-red-600 hover:cursor-default hover:bg-blue-600 hover:text-white "
          >
            {i}
          </p>
        );
      })}
    </div>
  );
}

export default QuantityDropdown;
