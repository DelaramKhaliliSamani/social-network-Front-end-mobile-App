import logo from "./logo.svg";
import "./App.css";
import Home from "./component/home";
import Nav from "./component/share/navbar";
import { Modal } from "component/share/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Inputs from "component/share/input/input";
import { ReactComponent as Close } from "assets/icon/close.svg";
import { MainBtn } from "component/share/btn";
import Tofollow from "component/tofollow";
import { ThreeDots } from "react-loader-spinner";
import useSaveUser from "component/home/query/mutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [tweet, setTweet] = useState(false);
  const [load, setLoad] = useState(false);

  const handleModal = () => {
    setTweet((perv) => !perv);
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
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
      reset();
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
    <div className="lg:grid lg:grid-cols-[1fr_2fr_1fr]  items-start justify-start text-start w-full h-full lg:gap-x-5 flex-col ">
      <div className=" w-full fixed top-0 left-0 right-0 lg:relative lg:border-none lg:bg-transparent border-b-2 border-solid border-blue-100 bg-blue-100 ">
        <Nav handleModal={handleModal} />
      </div>

      <div className=" border-r border-l border-solid border-b-slate-200 w-full h-full mt-[10px] lg:mt-[0] h-[50%] overflow-auto lg:h-full">
        <Home />
      </div>
      <div className=" w-full h-full mt-[10px] lg:mt-[0] h-[50%] overflow-auto lg:h-full">
        <Tofollow />
      </div>

      <Modal show={tweet} closeModal={handleModal}>
        <div className=" bg-white p-[20px] w-full rounded-md">
          <div onClick={handleModal}>
            <Close className=" text-black cursor-pointer" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
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
                  "lg:w-[40%] w-[30%] lg:text-[10px] text-[9px] py-[8px] flex items-center justify-center text-center"
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
        </div>
      </Modal>
    </div>
  );
}

export default App;
