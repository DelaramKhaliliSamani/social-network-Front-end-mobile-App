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
import Forgopassword from "./forgotpassword";
function Index() {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const handleModal = () => {
    setTweet((perv) => !perv);
  };
  const [tweet, setTweet] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [load, setLoad] = useState(false);
  const [load1, setLoad1] = useState(false);
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
    },
    onError: () => {
      console.log("Error");
      setLoad(false);
      // notify();
    },
  });

  const onSubmit = (data) => {
    try {
      setLoad(true);
      saveUserMutation.mutate(data);
    } catch (error) {
      // handle validation error
    }
  };

  useEffect(() => {
    const idToken = saveUserMutation?.data?.access;
    if (idToken) {
      // TODO uncomment bottom line (for silent refresh)
      authDispatch({ type: "LOGIN", token: idToken });
      navigate("/", { replace: true });
    }
  }, [saveUserMutation?.data]);
  const handleExit = () => {
    navigate("/register", { replace: true });
  };
  return (
    <div className=" w-full h-full items-center justify-center flex">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Inputs
          register={{
            required: {
              value: true,
              message: "Enter your id",
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
              "login"
            )}
          </MainBtn>
          <PrimaryBtn
            className={
              "w-full text-[10px] py-[8px] flex items-center justify-center text-center mt-[20px]"
            }
            onClick={() => handleExit()}
          >
            Register
          </PrimaryBtn>
          <p className="cursor-pointer" onClick={() => handleModal()}>
            Forgot password
          </p>
        </div>
      </form>
      <ToastContainer />
      <Modal show={tweet} closeModal={handleModal}>
        <Forgopassword setTweet={setTweet} />
      </Modal>
    </div>
  );
}

export default Index;
