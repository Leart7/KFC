import { useState } from "react";

function Shto10({ item, setAddOns, addOns }) {
  const ids = addOns.map((addOn) => addOn.id);

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div key={item.id} className="mx-5 my-4 flex items-center gap-x-2">
      <input
        id={item.name}
        type="checkbox"
        className="h-6 w-6 cursor-pointer bg-blue-200 checked:accent-red-500"
        checked={ids?.includes(item.id) || isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
          if (e.target.checked) setAddOns(() => [...addOns, item]);
          if (!e.target.checked)
            setAddOns(addOns.filter((addOn) => addOn.id !== item.id));
        }}
      />
      <label
        className="unselectable relative flex-1 text-lg font-normal text-stone-500 hover:cursor-pointer"
        htmlFor={item.name}
      >
        {item.name}{" "}
        <span className="absolute right-0 text-red-600">
          +{item.price.toFixed(2)}€
        </span>
      </label>
    </div>
  );
}

export default Shto10;
