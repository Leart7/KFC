import { useForm } from "react-hook-form";
import { useUser } from "../authentication/useUser";
import { useUpdateUser } from "./useUpdateUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function UpdateProfile() {
  const { user } = useUser();
  const { formState, register, handleSubmit } = useForm();
  const { errors } = formState;

  const { updateUser } = useUpdateUser();

  function onSubmit(data) {
    const updateData = {
      userId: user.id,
      updateUserObj: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        newPassword: data.newPassword,
        image: data.image[0],
      },
    };

    updateUser(updateData);
  }

  return (
    <form
      className="my-10 ms-auto mt-5 flex w-3/4 flex-col gap-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label
        htmlFor="fileInput"
        className="relative ms-64 flex h-44 w-44 items-center justify-center bg-stone-200 hover:cursor-pointer"
      >
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          {...register("image")}
        />
        <img
          src={user?.imageUrl}
          alt="Profile"
          className="h-full w-full text-white"
        />
        <div className="absolute z-50 border border-dashed">
          <FontAwesomeIcon
            icon={faUser}
            className=" p-16 text-3xl text-white"
          />
        </div>
      </label>

      <div className="relative">
        <label className="absolute -left-36 top-2 font-semibold">Name</label>
        <input
          defaultValue={user?.firstName}
          id="firstName"
          className={`${
            errors?.firstName?.message ? "bg-orange-100" : ""
          } w-full rounded-md border border-stone-300 px-5 py-2 font-normal outline-none`}
          placeholder="First Name"
          {...register("firstName", { required: "This field is required" })}
        />
        {errors?.firstName?.message && (
          <p className="text-sm text-red-600">{errors?.firstName?.message}</p>
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
          defaultValue={user?.lastName}
          {...register("lastName", { required: "This field is required" })}
        />
        {errors?.lastName?.message && (
          <p className=" text-sm text-red-600">{errors?.lastName?.message}</p>
        )}
      </div>

      <div className="relative">
        <label className="absolute -left-36 top-2 font-semibold">Email</label>
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
          <p className=" text-sm text-red-600">{errors?.email?.message}</p>
        )}
      </div>

      <div className="relative">
        <label className="absolute -left-36 top-2 font-semibold">
          Old Password
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
          <p className=" text-sm text-red-600">{errors?.password?.message}</p>
        )}
      </div>

      <div className="relative">
        <label className="absolute -left-36 top-2 font-semibold">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          className={`${
            errors?.newPassword?.message ? "bg-orange-100" : ""
          } w-full rounded-md border border-stone-300 px-5 py-2 font-normal outline-none`}
          placeholder="Password"
          {...register("newPassword")}
        />
        {errors?.newPassword?.message && (
          <p className=" text-sm text-red-600">
            {errors?.newPassword?.message}
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
          defaultValue={user?.phoneNumber}
          {...register("phoneNumber", {
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
          <p className=" text-sm text-red-600">
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
