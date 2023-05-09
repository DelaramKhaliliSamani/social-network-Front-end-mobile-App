import React from "react";
import { ThreeDots } from "react-loader-spinner";
import useSaveUser from "./query/mutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Inputs from "component/share/input/input";
import { ReactComponent as Close } from "assets/icon/close.svg";
import { MainBtn } from "component/share/btn";
function Index() {
  const [load, setLoad] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgurl, setImgurl] = useState("");
  useEffect(() => {
    if (selectedImage !== null) {
      setImgurl(URL.createObjectURL(selectedImage));
      const formData = new FormData();
      formData.append("file", selectedImage);
      console.log("formData", formData);
    }
  }, [selectedImage]);
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
    try {
      setLoad(true);
      const formData = new FormData()
      formData.append('bio', data?.bio)
      formData.append('img', selectedImage)
      saveUserMutation.mutate(formData);
    } catch (error) {
      // handle validation error
    }
  };
  return (
    <div className=" w-full ">
      <form onSubmit={handleSubmit(onSubmit)}
      enctype="multipart/form-data">
        <Inputs
          register={{
            required: {
              value: true,
              message: "Enter Text",
            },
          }}
          type="text"
          name="bio"
          control={control}
          placeholder="Type your bio"
          className="border-gray h-[64px] w-full bg-white-dark placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
        />
        <div className="w-full text-center flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center text-center w-[230px] h-[230px]  bg-[#E5E1E6] p-[34px] rounded-[50%]">
            <div className=" relative flex items-center justify-center text-center rounded-[50%] w-[156px] h-[156px]">
              {imgurl !== "" && (
                <img
                  src={imgurl}
                  alt="userimage"
                  className=" h-full rounded-[50%]"
                />
              )}
            </div>
          </div>
          <div className=" relative mb-[50px] mt-[32px] cursor-pointer">
            <button className="cursor-pointer bg-[#FFC000] rounded-[100px] px-[24px] py-[10px]   text-[#040765] text-[14px] leading-[20px] font-medium">
              Upload your personal photo
            </button>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => setSelectedImage(e?.target?.files[0])}
              className="cursor-pointer absolute w-full h-full top-0 right-0 z-50 opacity-0"
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-[30px]">
          <MainBtn
            className={
              "w-[40%] text-[10px] py-[8px] flex items-center justify-center text-center"
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
              "edit"
            )}
          </MainBtn>
        </div>
      </form>
    </div>
  );
}

export default Index;
