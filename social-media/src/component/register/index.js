import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Inputs from "component/share/input/input";
import { MainBtn } from "component/share/btn";
import { ThreeDots } from "react-loader-spinner";
import useSaveUser from "./query/mutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

function Index() {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const [load, setLoad] = useState(false);
  // const notify = () => {
  //   toast.error("Error", {
  //     // Set to 15sec
  //     position: toast.POSITION.BOTTOM_LEFT,
  //     autoClose: 15000,
  //   });
  // };
  const saveUserMutation = useSaveUser({
    onSuccess: () => {
      console.log("done");
      // toast.success("Done", {
      //   // Set to 15sec
      //   position: toast.POSITION.BOTTOM_LEFT,
      //   autoClose: 15000,
      // });
    },
    onError: () => {
      console.log("Error");
      setLoad(false);
      // notify();
    },
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("staff_id", data?.staff_id);
    formData.append("email", data?.email);
    formData.append("phone_number", data?.phone_number);
    formData.append("username", data?.username);
    formData.append("password", data?.password);
    formData.append("password2", data?.password2);
    try {
      setLoad(true);
      saveUserMutation.mutate(formData);
    } catch (error) {
      // handle validation error
    }
  };
  useEffect(() => {if (saveUserMutation?.data)
    {navigate("/login", { replace: true });}
  
  }, [saveUserMutation?.data]);
  const password = useRef({});
  password.current = watch("password", "");
  return (
    <div className=" w-full h-full items-center justify-center flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=""
        enctype="multipart/form-data"
      >
        <Inputs
          register={{
            required: {
              value: true,
              message: "Enter id",
            },
          }}
          type="number"
          label={"staff_id"}
          name="staff_id"
          control={control}
          placeholder="staff_id"
          className="border-gray h-[64px] w-full bg-blue-100 placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
        />
          <Inputs
          register={{
            required: {
              value: true,
              message: "Enter Email",
            },
          }}
          type="email"
          label={"email"}
          name="email"
          control={control}
          placeholder="password"
          className="border-gray h-[64px] w-full bg-blue-100 placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
        />
        <Inputs
          register={{
            required: {
              value: true,
              message: "Enter phone",
            },
          }}
          type="number"
          label={"phone number"}
          name="phone_number"
          control={control}
          placeholder="phone_number"
          className="border-gray h-[64px] w-full bg-blue-100 placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
        />
        <Inputs
          register={{
            required: {
              value: true,
              message: "Enter username",
            },
          }}
          type="text"
          label={"user name"}
          name="username"
          control={control}
          placeholder="user name"
          className="border-gray h-[64px] w-full bg-blue-100 placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
        />
        <Inputs
          register={{
            required: {
              value: true,
              message: "Enter password",
            },
          }}
          type="password"
          label={"Password"}
          name="password"
          control={control}
          placeholder="password"
          className="border-gray h-[64px] w-full bg-blue-100 placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
        />
        <Inputs
          register={{
            required: {
              value: true,
              message: "Enter password",
              validate: (match) => {
                const password = getValues("password");
                return match === password || "Passwords should match!";
              },
            },
          }}
          type="password"
          label={"re enter Password"}
          name="password2"
          control={control}
          placeholder="password"
          className="border-gray h-[64px] w-full bg-blue-100 placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
        />
        <div className="w-full mt-[30px]">
          <MainBtn
            className={
              "w-full text-[10px] py-[8px] flex items-center justify-center text-center"
            }
            type={"submit"}
          >
            {load ? (
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#fff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              "register"
            )}
          </MainBtn>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Index;
