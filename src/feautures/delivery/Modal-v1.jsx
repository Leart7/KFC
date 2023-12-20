import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart, updateCart } from "./cartSlice";

function Modal({ product, onClick, from }) {
  const dispatch = useDispatch();

  const { products } = useSelector((store) => store.cart);
  const cartProduct = products.find((prod) => prod.product.id === product.id);

  const [quantity, setQuantity] = useState(
    from === "sidebar" ? cartProduct.quantity : 1,
  );

  const [comment, setComment] = useState(
    from === "sidebar" ? cartProduct.comments : "",
  );

  return (
    <div
      id="modal"
      className="leart fixed left-1/2 top-1/2 z-50 w-[57%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-7 shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold uppercase text-red-600">
          {product.name}
        </h1>
        <FontAwesomeIcon
          role="button"
          onClick={onClick}
          icon={faXmark}
          className="text-3xl text-stone-300"
        />
      </div>
      <p className="mt-5 text-lg font-medium">Photo Gallery</p>
      <img src={product.image} className="mt-3 w-28" />
      <p className="mt-5 text-lg font-medium">Shto Menu</p>
      <div className="mx-5 my-4 flex items-center gap-x-2">
        <input
          id="shtomenu"
          type="checkbox"
          className="h-6 w-6 cursor-pointer bg-blue-200 checked:accent-red-500"
        />{" "}
        <label
          className="unselectable flex-1 text-lg font-normal text-stone-500 hover:cursor-pointer"
          htmlFor="shtomenu"
        >
          Menu me potato wedges + pije
        </label>
      </div>
      <p className="mt-5 text-lg font-medium">SHTO (max 10)</p>
      <div className="mx-5 my-4 flex items-center gap-x-2">
        <input
          id="potatowedges"
          type="checkbox"
          className="h-6 w-6 cursor-pointer bg-blue-200 checked:accent-red-500"
        />{" "}
        <label
          className="unselectable flex-1 text-lg font-normal text-stone-500 hover:cursor-pointer"
          htmlFor="potatowedges"
        >
          Potato Wedges
        </label>
      </div>
      <div className="mx-5 my-4 flex items-center gap-x-2">
        <input
          id="mayonaisse"
          type="checkbox"
          className="h-6 w-6 cursor-pointer bg-blue-200 checked:accent-red-500"
        />{" "}
        <label
          className="unselectable flex-1 text-lg font-normal text-stone-500 hover:cursor-pointer"
          htmlFor="mayonaisse"
        >
          Mayonaisse
        </label>
      </div>
      <div className="mx-5 my-4 flex items-center gap-x-2">
        <input
          id="ketchup"
          type="checkbox"
          className="h-6 w-6 cursor-pointer bg-blue-200 checked:accent-red-500"
        />{" "}
        <label
          className="unselectable flex-1 text-lg font-normal text-stone-500 hover:cursor-pointer"
          htmlFor="ketchup"
        >
          Ketchup
        </label>
      </div>
      <div className="mx-5 my-4 flex items-center gap-x-2">
        <input
          id="heineken"
          type="checkbox"
          className="h-6 w-6 cursor-pointer bg-blue-200 checked:accent-red-500"
        />{" "}
        <label
          className="unselectable flex-1 text-lg font-normal text-stone-500 hover:cursor-pointer"
          htmlFor="heineken"
        >
          Heineken
        </label>
      </div>
      <div className="mx-5 my-4 flex items-center gap-x-2">
        <input
          id="uje"
          type="checkbox"
          className="h-6 w-6 cursor-pointer bg-blue-200 checked:accent-red-500"
        />{" "}
        <label
          className="unselectable flex-1 text-lg font-normal text-stone-500 hover:cursor-pointer"
          htmlFor="uje"
        >
          Uje
        </label>
      </div>
      <div className="mx-5 my-4 flex items-center gap-x-2">
        <input
          id="miser"
          type="checkbox"
          className="h-6 w-6 cursor-pointer bg-blue-200 checked:accent-red-500"
        />{" "}
        <label
          className="unselectable flex-1 text-lg font-normal text-stone-500 hover:cursor-pointer"
          htmlFor="miser"
        >
          Miser
        </label>
      </div>
      <p className="mt-8 text-lg font-medium">Special Instructions</p>
      <input
        type="textbox"
        className="mt-5 h-24 w-full rounded-md border px-3 pb-14 outline-none"
        placeholder="Add any special instructions"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="mt-10 flex items-center justify-between">
        <div className="mx-5 flex items-center gap-x-4">
          <FontAwesomeIcon
            role="button"
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
            onClick={() => {
              setQuantity((quantity) => quantity + 1);
            }}
            icon={faPlus}
            className="text-4xl text-red-600 hover:cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-x-5">
          <p className="unselectable">
            {(product.price * quantity).toFixed(2)}€
          </p>
          <button
            onClick={() => {
              dispatch(setCart(product, quantity, comment));
              if (from === "sidebar") {
                dispatch(updateCart(product, quantity, comment));
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
