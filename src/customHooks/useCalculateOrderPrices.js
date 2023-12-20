import { useAddOns } from "../feautures/delivery/useAddOns";
import { useMenuItems } from "../feautures/delivery/useMenuItems";

export function useCalculateOrderPrices() {
  const { menuAddOns } = useMenuItems();
  const { addOns } = useAddOns();

  function calcAddOnsPrice(addOnsat) {
    const addOnss = addOnsat?.split(",");

    const filteredItems = addOns?.filter((item) =>
      addOnss?.includes(item.id.toString()),
    );

    return filteredItems?.reduce((acc, cur) => acc + cur.price, 0);
  }

  function calcMenuAddOnsPrice(menuAddOnsat) {
    const menuAddOnss = menuAddOnsat?.split(",");

    const filteredItems = menuAddOns?.filter((item) =>
      menuAddOnss?.includes(item.id.toString()),
    );

    return filteredItems?.reduce((acc, cur) => acc + cur.price, 0);
  }

  function calcTotalOrderPrice(orderItems) {
    return orderItems.reduce(
      (acc, cur) =>
        acc +
        cur.product.price * cur.quantity +
        calcAddOnsPrice(cur?.addOns) +
        calcMenuAddOnsPrice(cur?.menuAddOns),
      0,
    );
  }

  return { calcAddOnsPrice, calcMenuAddOnsPrice, calcTotalOrderPrice };
}
