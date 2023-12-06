import { useAddOns } from "../DeliveryPage/useAddOns";

function OrderProductAddOns({ items }) {
  const { addOns } = useAddOns();

  const addOnss = items?.split(",");

  const filteredItems = addOns?.filter((item) =>
    addOnss?.includes(item.id.toString()),
  );

  return (
    <div>
      {filteredItems &&
        filteredItems.map((item) => (
          <p className="text-sm" key={item.id}>
            {item.name}
          </p>
        ))}
    </div>
  );
}

export default OrderProductAddOns;
