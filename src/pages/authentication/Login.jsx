import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import Navbar from "../DeliveryPage/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Login() {
  const { login, isLoading } = useLogin();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const [incorrect, setIncorrect] = useState(false);

  function onSubmit({ email, password }) {
    login(
      {
        email,
        password,
      },
      {
        onError: () => {
          setIncorrect(true);
          reset();
        },
      },
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto h-screen w-full bg-stone-50 ">
        <div className="mx-auto mt-7 w-[35%] rounded-md bg-white p-5">
          <h2 className="text-center text-2xl">Login</h2>
          <p className="mt-3 text-center">
            New on Ordering App ?{" "}
            <Link to="/signup" className="text-red-600 hover:underline">
              Create an account
            </Link>
          </p>
          <button className="mt-3 w-full rounded-md border border-stone-300 py-2 font-semibold hover:border-stone-400 hover:bg-stone-100">
            <FontAwesomeIcon className="me-2" icon={faUserSecret} />
            CONTINUE AS GUEST
          </button>
          {incorrect && (
            <p className="mt-5 bg-red-200 py-4 text-center">
              Your email or password is incorrect!
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-14">
            <div className="flex flex-col gap-y-3">
              <div>
                <label htmlFor="email" className="w-full font-medium">
                  Email
                </label>
                <input
                  className={`border ${
                    errors?.email?.message
                      ? "border-red-600"
                      : "border-stone-300"
                  } mt-1 w-full rounded-md px-3 py-2 outline-none`}
                  type="text"
                  id="email"
                  disabled={isLoading}
                  placeholder="Email"
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide a valid email address",
                    },
                  })}
                ></input>
                {errors?.email?.message && (
                  <p className="text-red-600">{errors?.email?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="w-full font-medium">
                  Password
                </label>
                <input
                  className={`border ${
                    errors?.password?.message
                      ? "border-red-600"
                      : "border-stone-300"
                  } mt-1 w-full rounded-md px-3 py-2 outline-none`}
                  type="password"
                  id="password"
                  disabled={isLoading}
                  placeholder="Password"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters",
                    },
                  })}
                ></input>
              </div>
              {errors?.password?.message && (
                <p className="text-red-600">{errors?.password?.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-md bg-red-600 py-3 font-medium text-white"
            >
              LOGIN
            </button>
          </form>
          <p className="mt-3 text-center">
            Forgot your password ?{" "}
            <Link className=" text-red-600 hover:underline">
              Recover password
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
