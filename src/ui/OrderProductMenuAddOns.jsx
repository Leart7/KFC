import { useMenuItems } from "../feautures/delivery/useMenuItems";

function OrderProductMenuAddOns({ items }) {
  const { menuAddOns } = useMenuItems();

  const menuAddOnss = items?.split(",");

  const filteredMenuItems = menuAddOns?.filter((item) =>
    menuAddOnss?.includes(item.id.toString()),
  );

  return (
    <div>
      {filteredMenuItems &&
        filteredMenuItems.map((item) => (
          <p className="text-sm" key={item.id}>
            {item.name}
          </p>
        ))}
    </div>
  );
}

export default OrderProductMenuAddOns;
