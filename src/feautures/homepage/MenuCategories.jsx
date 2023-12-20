function MenuCategories({ children, active, onClick }) {
  return (
    <li
      role="button"
      className={`${
        active
          ? "text-red-600 underline decoration-[3px] underline-offset-[16px]"
          : ""
      } hover:cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default MenuCategories;
