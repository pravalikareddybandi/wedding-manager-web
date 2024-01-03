"use client";
import SubmitButton, { SignupButton } from "@/components/button";
import CustomInput from "@/components/input";
import { useGlobalStore } from "@/stores/global";
import { handleLoginSubmit } from "@/stores/login";
import { LoginData, LoginResponse } from "@/types/login";
import React, { Ref, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>();
  const user = useGlobalStore();
  const { setUser, userName } = user as any;

  const loginInfoPopup = useRef();
  const openTooltip = () => (loginInfoPopup!.current! as any).open();
  const closeToolTip = () => (loginInfoPopup!.current! as any).close();

  return (
    <div>
      <Popup ref={loginInfoPopup as unknown as Ref<PopupActions>}>
        <div className={`bg-lime-500`}>{`Welcome Back ${userName}`}</div>
      </Popup>

      <form
        onSubmit={handleSubmit((_) =>
          handleLoginSubmit(_, {
            onSuccess: async (data) => {
              setUser({ userName: data?.name, userId: data?.id, userRole: "" });
              openTooltip();
              setTimeout(() => {
                closeToolTip?.();
              }, 2000);
            },
          })
        )}
      >
        <CustomInput
          isInvalid={!!errors?.user_id}
          errorMessage={errors?.user_id?.message}
          label={"User ID"}
          {...register("user_id", {
            required: {
              value: true,
              message: "User ID is required",
            },
          })}
          placeholder="enter Email/Mobile"
          className="border-solid border-2 border-indigo-600"
        />
        <CustomInput
          isInvalid={!!errors?.password}
          errorMessage={errors?.password?.message}
          label={"Password"}
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          type="password"
          placeholder="enter Password"
          className="border-solid border-2 border-indigo-600"
        />
        <div className="flex items-centers gap-2">
          <SubmitButton label="Login" />
          <SignupButton />
        </div>
      </form>
    </div>
  );
}

export default Login;
