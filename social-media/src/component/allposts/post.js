import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import Inputs from "component/share/input/input";
import { MainBtn, PrimaryBtn } from "component/share/btn";
import { ThreeDots } from "react-loader-spinner";
import { useCommentUser, useLikeUser } from "./query/mutation";
function Index({ item }) {
  const [show, setShow] = useState(0);
  const [load, setLoad] = useState(false);
  const [comment, setComment] = useState(0);
  const [like, setLike] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const saveUserMutation = useCommentUser({
    id: +comment,
    onSuccess: () => {
      setComment();
    },
    onError: () => {
      console.log("Error");
      setLoad(false);
      // notify();
    },
  });
  const saveLikeMutation = useLikeUser({
    id: +like,
    onSuccess: () => {
      setComment();
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
    setLoad(true);
    saveUserMutation.mutate(formData);
  };
  useEffect(() => {
    saveLikeMutation.mutate(like);
  }, [like]);
  return (
    <div>
      <div className="flex flex-col items-start justify-start">
        <p className="text-sm text-gray-900 mr-3 text-bold">{item?.user}</p>
        <div className=" flex flex-col items-start justify-start">
          <p className="text-sm text-gray-800 mb-3">{item?.title}</p>
          <p className="text-xs text-gray-800">{item?.body}</p>
        </div>
        <div className=" flex items-center justify- start">
          <p
            className="  text-black text-[10px] cursor-pointer mr-[20px]"
            onClick={() => setShow(item?.id)}
          >
            {item?.comments?.length} comment
          </p>
          <p className="  text-black text-[10px] ">
            {item?.votes?.length} likes
          </p>
        </div>
        {show === item?.id && (
          <div className=" flex flex-col items-start justify-start">
            {item?.comments.map((index, arr) => (
              <div key={arr}>
                <p className=" text-gray-500 text-[12px]">{index?.body}</p>{" "}
              </div>
            ))}{" "}
          </div>
        )}{" "}
        <div className="w-full flex item-center justify-between mt-[20px]">
          <PrimaryBtn
            className={
              "w-[20%] lg:text-[10px] text-[9px] px-[2px]  py-[8px] flex items-center justify-center text-center"
            }
            type={"button"}
            onClick={() => setLike(item?.id)}
          >
            Like
          </PrimaryBtn>
          <MainBtn
            className={
              "w-[20%] lg:text-[10px] text-[9px] px-[2px] py-[8px] flex items-center justify-center text-center"
            }
            type={"button"}
            onClick={() => setComment(item?.id)}
          >
            comment
          </MainBtn>
        </div>
      </div>
      {comment === item?.id && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=""
          enctype="multipart/form-data"
        >
          <Inputs
            register={{
              required: {
                value: true,
                message: "Enter your id",
              },
            }}
            type="text"
            name="body"
            control={control}
            placeholder="comment"
            className="border-gray h-[64px] w-full bg-blue-100 placeholder-gray text-[18px] pl-[14px] pr-[14px] rounded-[15px] mb-[16px]"
          />

          <div className="w-full mt-[30px] flex item-center justify-between">
            <MainBtn
              className={
                "w-[30%] lg:text-[10px] text-[9px]  px-[4px] py-[8px] flex items-center justify-center text-center"
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
                "comment"
              )}
            </MainBtn>
            <PrimaryBtn
              className={
                "w-[30%] lg:text-[10px] text-[9px]  px-[4px] py-[8px] flex items-center justify-center text-center"
              }
              type={"button"}
              onClick={() => setComment(0)}
            >
              exit{" "}
            </PrimaryBtn>
          </div>
        </form>
      )}
    </div>
  );
}

export default Index;
