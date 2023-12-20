import { useForm } from "react-hook-form";
import { useSignup } from "../feautures/authentication/useSignup";
import Navbar from "../ui/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { useLogin } from "../feautures/authentication/useLogin";
import { useState } from "react";

function SignupPage() {
  const { signup, isLoading } = useSignup();
  const { login } = useLogin();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(true);
  const [incorrect, setIncorrect] = useState(false);

  function onSubmit(data) {
    if (!isChecked) return;

    signup(data, {
      onError: () => {
        setIncorrect(true);
        reset();
        return;
      },
      onSuccess: () => {
        login({ email: data.email, password: data.password });
        navigate("/delivery/homepage");
      },
    });
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto h-screen w-full bg-stone-50 ">
        <div className="mx-auto mt-7 w-[35%] rounded-md bg-white p-5">
          <h2 className="text-center text-2xl">Create Account</h2>
          <p className="mt-3 text-center">
            Already have an account ?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Login
            </Link>
          </p>
          <button className="mt-3 w-full rounded-md border border-stone-300 py-2 font-semibold hover:border-stone-400 hover:bg-stone-100">
            <FontAwesomeIcon className="me-2" icon={faUserSecret} />
            CONTINUE AS GUEST
          </button>
          {incorrect && (
            <p className="mt-5 bg-red-200 py-4 text-center">
              The email has already been taken!
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-14">
            <div className="flex flex-col gap-y-3">
              <div>
                <label htmlFor="firstName" className="w-full font-medium">
                  First Name
                </label>
                <input
                  className={`border ${
                    errors?.firstName?.message
                      ? "border-red-600"
                      : "border-stone-300"
                  } mt-1 w-full rounded-md px-3 py-2 outline-none`}
                  type="text"
                  id="firstName"
                  disabled={isLoading}
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "This field is required",
                  })}
                ></input>
                {errors?.firstName?.message && (
                  <p className="text-red-600">{errors?.email?.message}</p>
                )}
              </div>

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

            <div className="mt-5 flex items-center gap-x-2">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="terms">
                I agree with
                <span className="text-red-600 hover:cursor-pointer hover:underline">
                  Terms & Conditions
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isChecked}
              className={`${
                !isChecked ? "opacity-70" : ""
              } mt-5 w-full rounded-md bg-red-600 py-3 font-medium text-white`}
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
