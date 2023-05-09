import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Inputs from "component/share/input/input";
import { MainBtn, PrimaryBtn } from "component/share/btn";
import { ThreeDots } from "react-loader-spinner";
import { useSaveUser, useResetUser } from "./query/mutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "component/share/Modal";
import { ReactComponent as Close } from "assets/icon/close.svg";
function Index({ setTweet }) {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const handleModal = () => {
    setTweet((perv) => !perv);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [load1, setLoad1] = useState(false);
  const notify = () => {
    toast.error("Error", {
      // Set to 15sec
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 15000,
    });
  };

  const saveResetMutation = useResetUser({
    onSuccess: () => {
      setTweet(false);
      console.log("done");
      setLoad1(false);
    },
    onError: () => {
      console.log("Error");
      setLoad1(false);
      notify();
    },
  });

  const onSubmit = (data) => {
    try {
      setLoad1(true);
      saveResetMutation.mutate(data);
    } catch (error) {
      // handle validation error
    }
  };

  return (
    <div className=" bg-white p-[20px] w-full rounded-md">
      <ToastContainer />
      <div onClick={() => setTweet(false)}>
        <Close className=" text-black cursor-pointer" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Inputs
          register={{
            required: {
              value: true,
              message: "Enter Text",
            },
          }}
          type="email"
          name="email"
          control={control}
          placeholder="Email"
          className="border-gray h-[64px] w-full bg-white-dark placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
        />
        <div className="flex items-center justify-end mt-[30px]">
          <MainBtn
            className={
              "w-[40%] text-[10px] py-[8px] flex items-center justify-center text-center"
            }
            type={"submit"}
          >
            {load1 ? (
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
              "send"
            )}
          </MainBtn>
        </div>
      </form>
    </div>
  );
}

export default Index;
