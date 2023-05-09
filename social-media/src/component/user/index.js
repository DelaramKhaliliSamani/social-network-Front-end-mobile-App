import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSaveUser, useProUser, useAllUser } from "./query/query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { MainBtn, PrimaryBtn } from "component/share/btn";
import { ThreeDots } from "react-loader-spinner";
import { useDataUser, useMessageUser } from "./query/mutation";
import { API_URL1 } from "config";
import { useForm } from "react-hook-form";
import Inputs from "component/share/input/input";

function Index() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [data2, setData2] = useState([]);
  const [load, setLoad] = useState(false);
  const [messag, setmessag] = useState(false);
  const navigate = useNavigate();
  console.log("location", location);
  useEffect(() => {
    if (location.state?.id) setName(location.state?.id);
  }, [location]);
  // const notify = () => {
  //   toast.error("Error", {
  //     // Set to 15sec
  //     position: toast.POSITION.BOTTOM_LEFT,
  //     autoClose: 15000,
  //   });
  // };
  const saveUserQuery = useSaveUser({
    id: +location.state?.id,
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
  const saveProQuery = useProUser({
    id: +location.state?.id,
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
  const saveAllQuery = useAllUser({
    id: +location.state?.id,
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
  useEffect(() => {
    setData(saveUserQuery?.data);
  }, [saveUserQuery?.data]);
  useEffect(() => {
    setData2(saveAllQuery?.data);
  }, [saveAllQuery?.data]);
  useEffect(() => {
    setData1(saveProQuery?.data);
  }, [saveProQuery?.data]);
  const saveUserMutation = useDataUser({
    id: +location.state?.id,
    onSuccess: () => {
      console.log("done");
      setLoad(false);
    },
    onError: () => {
      console.log("Error");
      setLoad(false);
      //notify();
    },
  });
  const [imgurl, setImgurl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (selectedImage !== null) {
      setImgurl(URL.createObjectURL(selectedImage));
      const formData = new FormData();
      formData.append("file", selectedImage);
      console.log("formData", formData);
    }
  }, [selectedImage]);
  const saveMessageMutation = useMessageUser({
    id: +location.state?.id,
    onSuccess: () => {
      console.log("done");
      setLoad(false);
    },
    onError: () => {
      console.log("Error");
      setLoad(false);
      //notify();
    },
  });
  const handleFollow = () => {
    try {
      setLoad(true);
      saveUserMutation.mutate(data);
    } catch (error) {
      // handle validation error
    }
  };
  const handleMessage = (data) => {
    setmessag(true);
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    try {
      setLoad(true);
      const formData = new FormData();
      formData.append("bio", data?.bio);
      formData.append("doc", selectedImage);
      saveMessageMutation.mutate(formData);
    } catch (error) {
      // handle validation error
    }
  };
  return (
    <div className="w-full h-full pt-[30px]">
      <p className=" text-black text-[20px]">Who to follow</p>
      <ToastContainer />
      {saveUserQuery?.isLoading && (
        <div className=" w-full h-full flex items-center justify-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />{" "}
        </div>
      )}

      <div className="pb-[20px] mb-[20px] border-b-2 border-b-slate-200 border-solid items-center justify-between">
        <div className=" flex items-center justify-start relative">
          {data?.is_active && (
            <div className=" absolute top-[-15px] left-0 w-[3px] h-[3px] rounded-[50%] bg-blue-500" />
          )}
          <div className=" flex flex-col items-start justify-start">
            <img src={`${API_URL1}${data1?.img}`} />
            <p className=" text-black text-[12px] mb-[10px]">
              {data?.username}
            </p>
            <p className=" text-gray-600 text-[12px]">{data?.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-[30px]">
          <PrimaryBtn
            className={
              "w-[40%] text-[10px] py-[8px] flex items-center justify-center text-center"
            }
            type={"button"}
            onClick={handleMessage}
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
              "Message"
            )}
          </PrimaryBtn>
          <MainBtn
            className={
              "w-[40%] text-[10px] py-[8px] flex items-center justify-center text-center"
            }
            type={"button"}
            onClick={handleFollow}
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
              "Follow"
            )}
          </MainBtn>
        </div>
      </div>
      {messag && (
        <form onSubmit={handleSubmit(onSubmit)} className=""
        enctype="multipart/form-data">
          <Inputs
            register={{
              required: {
                value: true,
                message: "message",
              },
            }}
            type="text"
            name="body"
            control={control}
            placeholder="message"
            className="border-gray h-[64px] w-full bg-blue-100 placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
          />
          <div className="w-full text-center flex flex-col items-center justify-center">
            <div className=" relative mb-[50px] mt-[32px] cursor-pointer">
              <button className="cursor-pointer bg-[#FFC000] rounded-[100px] px-[24px] py-[10px]   text-[#040765] text-[14px] leading-[20px] font-medium">
                Upload your personal file
              </button>
              <input
                // accept="image/*"
                type="file"
                onChange={(e) => setSelectedImage(e?.target?.files[0])}
                className="cursor-pointer absolute w-full h-full top-0 right-0 z-50 opacity-0"
              />
            </div>
          </div>
          <div className="w-full mt-[30px] flex item-center justify-between">
            <MainBtn
              className={
                "w-[30%] text-[10px] py-[8px] flex items-center justify-center text-center"
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
                "send"
              )}
            </MainBtn>
            <PrimaryBtn
              className={
                "w-[30%] text-[10px] py-[8px] flex items-center justify-center text-center"
              }
              type={"button"}
              onClick={() => setmessag(false)}
            >
              exit{" "}
            </PrimaryBtn>
          </div>
        </form>
      )}
      {data2 && data2?.length !== 0 && (
        <div className="flex items-start justify-start flex-col">
          {data2?.map((index, arr) => (
            <div className="">
              <p>{index?.body}</p>{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Index;
