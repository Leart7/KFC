import { useForm } from "react-hook-form";
import { useUser } from "../authentication/useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateProfile() {
  const { user } = useUser();
  const { formState, register, handleSubmit } = useForm();
  const { errors } = formState;

  const { updateUser } = useUpdateUser();

  function onSubmit(data) {
    if (data.password.length !== 0) {
      updateUser({
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      });
    } else {
      updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      });
    }
    console.log(data);
  }

  return (
    <form
      className="my-10 ms-auto mt-32 flex w-3/4 flex-col gap-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative">
        <label className="absolute -left-36 top-2 font-semibold">Name</label>
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
      </div>

      <div className="relative">
        <label className="absolute -left-36 top-2 font-semibold">
          Last name
        </label>
        <input
          id="lastName"
          className={`${
            errors?.lastName?.message ? "bg-orange-100" : ""
          } w-full rounded-md border border-stone-300 px-5 py-2 font-normal outline-none`}
          placeholder="Last Name"
          defaultValue={user?.user_metadata?.lastName}
          {...register("lastName", { required: "This field is required" })}
        />
        {errors?.lastName?.message && (
          <p className="-mt-2 text-sm text-red-600">
            {errors?.lastName?.message}
          </p>
        )}
      </div>

      <div className="relative">
        <label className="absolute -left-36 top-2 font-semibold">Email</label>
        <input
          id="email"
          disabled
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
      </div>

      <div className="relative">
        <label className="absolute -left-36 top-2 font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`${
            errors?.password?.message ? "bg-orange-100" : ""
          } w-full rounded-md border border-stone-300 px-5 py-2 font-normal outline-none`}
          placeholder="Password"
          {...register("password")}
        />
        {errors?.password?.message && (
          <p className="-mt-2 text-sm text-red-600">
            {errors?.password?.message}
          </p>
        )}
      </div>

      <div className="relative">
        <label className="absolute -left-36 top-2 font-semibold">
          Phone / Mobile
        </label>
        <input
          id="phoneNumber"
          className={`${
            errors?.phoneNumber?.message ? "bg-orange-100" : ""
          } w-full rounded-md border border-stone-300 px-5 py-2 font-normal outline-none`}
          placeholder="Phone / Mobile"
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
      </div>

      <button
        type="submit"
        className="mr-auto mt-3 block rounded-sm bg-red-600 px-7 py-2 font-medium text-white"
      >
        Update
      </button>
    </form>
  );
}

export default UpdateProfile;
