import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuantityButton from "./QuantityButton";
import Modal from "./Modal";
import Overlay from "../../ui/Overlay";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useAddOns } from "./useAddOns";
import { useMenuItems } from "./useMenuItems";
import { useModalCloser } from "../../customHooks/useModalCloser";

function SidebarProduct({ product, from }) {
  const [clickedModal, setClickedModal] = useModalCloser();

  const { addOns } = useAddOns();
  const { menuAddOns } = useMenuItems();

  const addOnss = product?.addOns?.split(",");

  const filteredItems = addOns?.filter((item) =>
    addOnss.includes(item.id.toString()),
  );

  const menuAddOnss = product?.menuAddOns?.split(",");

  const filteredMenuItems = menuAddOns?.filter((item) =>
    menuAddOnss?.includes(item.id.toString()),
  );

  const addOnsPrice = filteredItems?.reduce((acc, cur) => acc + cur.price, 0);
  const menuAddOnsPrice = filteredMenuItems?.reduce(
    (acc, cur) => acc + cur.price,
    0,
  );

  return (
    <>
      <div
        key={product.id}
        className="relative flex items-center justify-between p-4 pr-8 "
      >
        <QuantityButton from={from} product={product} />
        <p className="absolute left-20  font-semibold">
          {product.product.name}
        </p>
        <div className="relative flex items-center gap-x-3">
          {!from && (
            <div
              role="button"
              onClick={() => setClickedModal(true)}
              className="absolute right-16 h-7 w-7 rounded-full bg-green-500"
            >
              <FontAwesomeIcon
                icon={faPen}
                className="px-[0.45rem] py-[0.4rem] text-sm text-white"
              />
            </div>
          )}
          <p>
            {(
              product.product.price * product.quantity +
              addOnsPrice +
              menuAddOnsPrice
            ).toFixed(2)}
            €
          </p>
        </div>
        {clickedModal && (
          <>
            <Modal
              product={product}
              from={"sidebar"}
              onClick={() => setClickedModal(false)}
            />
            <Overlay />
          </>
        )}
      </div>
      <div className="mt-1 flex flex-col gap-y-0">
        {product.comments && (
          <div className="ml-20 mr-32 flex flex-col items-start ">
            <p className="-mt-4 text-center text-sm font-medium text-stone-400">
              Comments
            </p>
            <p className="-mt-1 mb-3 pb-3 text-left text-sm text-stone-600">
              {product.comments}
            </p>
          </div>
        )}
        {filteredMenuItems?.length > 0 && (
          <div className="ml-20 mr-32 flex flex-col items-start ">
            <p className=" -mt-5 text-center text-sm font-medium text-stone-400">
              Shto Menu
            </p>
            <p className="-mt-1 pb-[0.15rem] text-left text-sm text-stone-600">
              Menu me Potato Wedges + Pije
            </p>
            <p className="text-center text-sm font-medium text-stone-400">
              Zgjedh Pijen
            </p>
            {filteredMenuItems.map((item) => (
              <div
                key={item.name}
                className="relative flex items-center gap-x-5"
              >
                <p className="-mt-1 pb-[0.15rem] text-left text-sm text-stone-600">
                  {item.name}
                </p>
                <p className="absolute bottom-[0.1rem] left-36 text-sm text-stone-600">
                  {item.price.toFixed(2)}€
                </p>
              </div>
            ))}
          </div>
        )}
        {filteredItems?.length > 0 && (
          <div
            className={`${
              filteredItems.length > 0 ? "mt-0" : "-mt-4"
            } ml-20 mr-32 flex flex-col items-start `}
          >
            <p className="text-center text-sm font-medium text-stone-400">
              SHTO
            </p>
            {filteredItems?.map((addOn) => (
              <div
                key={addOn.name}
                className="relative flex items-center gap-x-5"
              >
                <p className="-mt-1 pb-[0.15rem] text-left text-sm text-stone-600">
                  {addOn.name}
                </p>
                <p className="absolute bottom-[0.1rem] left-36 text-sm text-stone-600">
                  {addOn.price.toFixed(2)}€
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SidebarProduct;
