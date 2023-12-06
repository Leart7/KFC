import { useForm } from "react-hook-form";
import HrLine from "./HrLine";
import { useUser } from "../authentication/useUser";
import { useOrderUser } from "./useOrderUser";
import { useInsertOrder } from "./useInsertOrder";
import { useCart } from "../DeliveryPage/useCart";
import { useAddresses } from "./useAddresses";
import { useDeleteCart } from "../DeliveryPage/useDeleteCart";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const { orderUser } = useOrderUser();
  const { cart } = useCart();
  const { deleteCart } = useDeleteCart();
  const { addresses } = useAddresses();
  const activeAddress = addresses?.find((address) => address?.active === true);
  const { insertOrder } = useInsertOrder();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { user } = useUser();

  function onSubmit(data) {
    for (let i = 0; i < cart?.length; i++) {
      insertOrder(
        {
          orderUser: orderUser.id,
          product: cart[i].product.id,
          quantity: cart[i].quantity,
          addOns: cart[i].addOns,
          menuAddOns: cart[i].menuAddOns,
          comments: cart[i].comments,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: activeAddress.address,
          addressNotes: activeAddress.addressNotes,
          houseNumber: activeAddress.houseNumber,
        },
        { onSuccess: () => navigate("/confirm-order") },
      );

      deleteCart(cart[i].id, user.id);
    }
  }

  return (
    <>
      <form
        id="myForm"
        className="relative mt-5 flex flex-col gap-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <HrLine />
        <label className="absolute -left-[13%] font-medium">User details</label>
        <input
          defaultValue={user?.user_metadata?.firstName}
          id="firstName"
          className={`${
            errors?.firstName?.message ? "bg-orange-100" : ""
          } w-full rounded-md border border-stone-300 px-5 py-2 font-normal outline-none`}
          placeholder="First Name"
          {...register("firstName", { required: "This field is required" })}
        />
        {errors?.firstName?.message && (
          <p className="-mt-2 text-sm text-red-600">
            {errors?.firstName?.message}
          </p>
        )}

        <input
          id="lastName"
          className={`${
            errors?.lastName?.message ? "bg-orange-100" : ""
          } w-full rounded-md border border-stone-300 px-5 py-2 font-normal outline-none`}
          placeholder="Last Name"
          value={user?.user_metadata?.lastName}
          {...register("lastName", { required: "This field is required" })}
        />
        {errors?.lastName?.message && (
          <p className="-mt-2 text-sm text-red-600">
            {errors?.lastName?.message}
          </p>
        )}

        <input
          id="email"
          className={`${
            errors?.email?.message ? "bg-orange-100" : ""
          } w-full rounded-md border border-stone-300 px-5 py-2 font-normal outline-none`}
          placeholder="Email"
          defaultValue={user?.email}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
        {errors?.email?.message && (
          <p className="-mt-2 text-sm text-red-600">{errors?.email?.message}</p>
        )}

        <input
          id="phoneNumber"
          className={`${
            errors?.phoneNumber?.message ? "bg-orange-100" : ""
          } w-full rounded-md border border-stone-300 px-5 py-2 font-normal outline-none`}
          placeholder="Mobile Phone"
          value={user?.user_metadata?.phoneNumber}
          {...register("phoneNumber", {
            required: "This field is required",
            minLength: {
              value: 9,
              message: "Please provide a valid phone number",
            },
            pattern: {
              value: /^-?\d+$/,
              message: "Please provide a valid phone number",
            },
          })}
        />
        {errors?.phoneNumber?.message && (
          <p className="-mt-2 text-sm text-red-600">
            {errors?.phoneNumber?.message}
          </p>
        )}

        <div className="relative">
          <input
            id="discountCoupon"
            className="w-full rounded-md border border-e-0 border-stone-300 px-5 py-2 font-normal outline-none"
            placeholder="Discount coupon"
          />
          <p className="absolute right-0 top-0 rounded-e-md bg-red-600 px-5 py-[0.55rem] font-medium text-white hover:cursor-pointer">
            APPLY
          </p>
        </div>
        {/* <button type="submit" className="bg-red-600 p-10"></button> */}
      </form>
    </>
  );
}

export default Form;
