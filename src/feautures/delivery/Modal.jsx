import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Shto10 from "./Shto10";
import ShtoMenu from "./ShtoMenu";
import { useUser } from "../authentication/useUser";
import { useCart as useInsertCart } from "./useInsertCart";
import { useAddOns } from "./useAddOns";
import { useMenuItems } from "./useMenuItems";
import { useCart } from "./useCart";
import { useUpdateCart } from "./useUpdateCart";

function Modal({ product, onClick, from }) {
  const { user } = useUser();
  const { insertCart } = useInsertCart();
  const { cart: products } = useCart();
  const { updateCart: upCart } = useUpdateCart();

  const { isLoading, addOns: shto } = useAddOns();
  const { isLoading: isLoadingMenuItems, menuAddOns: shtoMenu } =
    useMenuItems();

  const cartProduct = products.find((prod) => prod.id === product.id);

  const [quantity, setQuantity] = useState(
    from === "sidebar" ? cartProduct.quantity : 1,
  );

  const [comment, setComment] = useState(
    from === "sidebar" ? cartProduct.comments : "",
  );

  const [isChecked, setIsChecked] = useState(
    cartProduct?.menuAddOns?.length > 0 || false,
  );

  const cartProductAddOns = cartProduct?.addOns
    ?.split(",")
    .sort((a, b) => a - b);

  const filteredAddOns = shto?.filter((item) =>
    cartProductAddOns?.includes(item.id.toString()),
  );

  const cartProductMenuAddOns = cartProduct?.menuAddOns
    ?.split(",")
    .sort((a, b) => a - b);

  const filteredMenuAddOns = shtoMenu?.filter((item) =>
    cartProductMenuAddOns?.includes(item.id.toString()),
  );

  const [addOns, setAddOns] = useState(filteredAddOns || []);

  const [menuAddOns, setMenuAddOns] = useState(filteredMenuAddOns || []);

  const [error, setError] = useState(false);

  const prods = products.filter((prod) => prod.product.id === product.id);

  const addOnsPrice = addOns.reduce((acc, cur) => acc + cur.price, 0);
  const menuAddOnsPrice = menuAddOns.reduce((acc, cur) => acc + cur.price, 0);

  let addOnsArr = [];
  for (let i = 0; i < addOns.length; i++) {
    addOnsArr.push(addOns[i].id);
  }

  let menuItemsArr = [];
  for (let i = 0; i < menuAddOns.length; i++) {
    menuItemsArr.push(menuAddOns[i].id);
  }

  const obj = {
    productId: product.id,
    userId: user.id,
    quantity: quantity,
    comments: comment,
    addOns: String(addOnsArr),
    menuAddOns: String(menuItemsArr),
  };

  let fact;
  let index;
  for (let i = 0; i < prods.length; i++) {
    if (
      String(addOnsArr.sort((a, b) => a - b)) ===
        prods[i]?.addOns
          .split(",")
          .sort((a, b) => a - b)
          .join(",") &&
      String(menuItemsArr.sort((a, b) => a - b)) ===
        prods[i]?.menuAddOns
          .split(",")
          .sort((a, b) => a - b)
          .join(",") &&
      comment === prods[i].comments
    ) {
      fact = true;
      index = i;
      break;
    }
  }

  useEffect(
    function () {
      if (!isChecked) setMenuAddOns([]);
    },
    [isChecked],
  );

  useEffect(
    function () {
      if (menuAddOns.length > 0) setError(false);
    },
    [menuAddOns.length],
  );

  if (isLoading || isLoadingMenuItems) return <p>Loading...</p>;

  return (
    <div
      id="modal"
      className="leart fixed left-1/2 top-1/2 z-50 w-[57%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-7 shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold uppercase text-red-600">
          {product.product?.name || product.name}
        </h1>
        <FontAwesomeIcon
          role="button"
          type="button"
          onClick={onClick}
          icon={faXmark}
          className="text-3xl text-stone-300"
        />
      </div>
      <p className="mt-5 text-lg font-medium">Photo Gallery</p>
      <img
        src={product.product?.imageUrl || product.imageUrl}
        className="mt-3 w-28"
      />

      {(product.product?.hasMenu || product.hasMenu) && (
        <>
          <p className="mt-5 text-lg font-medium">Shto Menu</p>

          <div className="mx-5 my-4 flex items-center gap-x-2">
            <input
              id="shtomenu"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="h-6 w-6 cursor-pointer bg-blue-200 checked:accent-red-500"
            />
            <label
              className="unselectable flex-1 text-lg font-normal text-stone-500 hover:cursor-pointer"
              htmlFor="shtomenu"
            >
              Menu me potato wedges + pije
            </label>
          </div>
          {isChecked && (
            <div
              className={`${
                error ? "rounded-md bg-amber-100 py-[0.1rem]" : ""
              }`}
            >
              <p className="mt-5 text-lg font-medium">
                Zgjedh Pijen (min 1 / max 4)
              </p>
              {error && (
                <p className="text-center text-sm font-medium text-red-600">
                  Please Select Required Options
                </p>
              )}
              {shtoMenu.map((item) => (
                <ShtoMenu
                  key={item.id}
                  item={item}
                  setMenuAddOns={setMenuAddOns}
                  menuAddOns={menuAddOns}
                />
              ))}
            </div>
          )}
          <p className="mt-5 text-lg font-medium">SHTO (max 10)</p>
          {shto.map((item) => (
            <Shto10
              key={item.name}
              item={item}
              setAddOns={setAddOns}
              addOns={addOns}
              product={product}
            />
          ))}
        </>
      )}
      <p className="mt-8 text-lg font-medium">Special Instructions</p>
      <input
        type="textbox"
        className="mt-5 h-24 w-full rounded-md border px-3 pb-14 outline-none"
        placeholder="Add any special instructions"
        id="comments"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="mt-10 flex items-center justify-between">
        <div className="mx-5 flex items-center gap-x-4">
          <FontAwesomeIcon
            role="button"
            type="button"
            onClick={() => {
              if (quantity > 1) {
                setQuantity((quantity) => quantity - 1);
              }
            }}
            icon={faMinus}
            className={`text-4xl ${
              quantity > 1 ? "text-red-600" : "text-stone-300"
            } hover:cursor-pointer`}
          />
          <FontAwesomeIcon
            role="button"
            type="button"
            onClick={() => {
              setQuantity((quantity) => quantity + 1);
            }}
            icon={faPlus}
            className="text-4xl text-red-600 hover:cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-x-5">
          <p className="unselectable">
            {(
              +(
                product.product?.price * quantity || product.price * quantity
              ).toFixed(2) +
              +addOnsPrice +
              +menuAddOnsPrice
            ).toFixed(2)}
            €
          </p>

          <button
            onClick={() => {
              if (isChecked && menuAddOns.length === 0) {
                setError(true);
                return;
              }
              if (fact) {
                upCart({
                  id: prods[index].id,
                  updateCartObj: {
                    quantity: prods[index].quantity + quantity,
                    comments: prods[index].comments,
                    addOns: prods[index].addOns,
                    menuAddOns: prods[index].menuAddOns,
                  },
                });
                onClick();
                return;
              }
              if (from === "sidebar") {
                upCart({
                  id: product.id,
                  updateCartObj: {
                    quantity: quantity,
                    comments: comment,
                    addOns: String(addOnsArr),
                    menuAddOns: String(menuItemsArr),
                  },
                });
              }
              if (from === "main") {
                insertCart(obj);
              }
              onClick();
            }}
            className="unselectable relative flex items-center justify-start rounded-md bg-red-600 px-44 py-4 text-lg font-semibold text-stone-200"
          >
            <p className="unselectable customcolor absolute right-[87%] rounded-sm px-4 py-2 text-sm">
              {quantity}
            </p>
            {from === "sidebar" ? "OK" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
