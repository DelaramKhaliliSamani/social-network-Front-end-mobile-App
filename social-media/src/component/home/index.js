import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Inputs from "component/share/input/input";
import { MainBtn } from "component/share/btn";
import { ThreeDots } from "react-loader-spinner";
import useSaveUser from "./query/mutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allpost from "component/allposts";
import Profile from "component/profile";

function Index() {
  const [active, setActive] = useState("first");
  const [load, setLoad] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
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
      setLoad(false);
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
    formData.append("body", data?.body);
    try {
      setLoad(true);
      saveUserMutation.mutate(formData);
    } catch (error) {
      // handle validation error
    }
  };
  return (
    <div className=" w-full h-full pt-[30px] px-[10px]">
      <p className=" text-black text-[20px] pl-[30px]">Home</p>
      <div className=" grid grid-cols-2 w-full items-center justify-center text-center border-b border-solid border-b-slate-200">
        <div
          className={`hover:bg-slate-300  cursor-pointer flex items-center justify-center`}
          onClick={() => setActive("first")}
        >
          <p
            className={
              active === "first"
                ? "border-b-[3px] border-solid border-blue-500 py-[20px]"
                : " border-none py-[20px]"
            }
          >
            For you
          </p>
        </div>
        <div
          className={`hover:bg-slate-300  cursor-pointer flex items-center justify-center`}
          onClick={() => setActive("sec")}
        >
          <p
            className={
              active === "sec"
                ? "border-b-[3px] border-solid border-blue-500 py-[20px]"
                : " border-none py-[20px]"
            }
          >
            Profile
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-b border-solid border-b-slate-200"
        enctype="multipart/form-data"
      >
        <Inputs
          register={{
            required: {
              value: true,
              message: "Enter Text",
            },
          }}
          type="text"
          name="body"
          control={control}
          placeholder="What's happening?"
          className="border-gray h-[64px] w-full bg-white-dark placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
        />
        <div className="flex items-center justify-end mt-[30px]">
          <MainBtn
            className={
              "lg:w-[40%] w-[30%] lg:text-[10px] text-[9px] py-[8px] text-center flex items-center justify-center"
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
              "post"
            )}
          </MainBtn>
        </div>
      </form>
      <ToastContainer />
      {active === "first" ? <Allpost /> : <Profile />}
    </div>
  );
}

export default Index;
