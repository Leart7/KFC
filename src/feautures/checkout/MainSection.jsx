import Address from "./Address";
import DeliveryTime from "./DeliveryTime";
import Form from "./Form";

function MainSection() {
  return (
    <div className="flex w-3/4 flex-col py-5 pe-[7%] ps-[20%]">
      <Form />
      <Address />
      <DeliveryTime />
    </div>
  );
}

export default MainSection;
