import HrLine from "./HrLine";

function DeliveryTime() {
  return (
    <div className="relative mt-8">
      <HrLine />
      <label className="absolute -left-[13%] font-medium">Delivery time</label>
      <p className="font-medium text-stone-400">ASAP</p>
    </div>
  );
}

export default DeliveryTime;
