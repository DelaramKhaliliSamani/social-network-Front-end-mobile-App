import React, { useState, useEffect } from "react";
import useSaveUser from "./query/query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function Index() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  // const notify = () => {
  //   toast.error("Error", {
  //     // Set to 15sec
  //     position: toast.POSITION.BOTTOM_LEFT,
  //     autoClose: 15000,
  //   });
  // };
  const saveUserQuery = useSaveUser({
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
  console.log("data", data);
  const handleClick = (id) => {
    navigate("/user", {
      replace: true,
      state: {
        id: id,
      },
    });
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
      {data &&
        data?.length !== 0 &&
        data?.map((item, id) => (
          <div
            key={id}
            className="pb-[20px] mb-[20px] border-b-2 border-b-slate-200 border-solid cursor-pointer"
            onClick={() => handleClick(item?.id)}
          >
            <div className=" flex items-center justify-start relative">
              {item?.is_active && (
                <div className=" absolute top-[-5px] left-0 w-[3px] h-[3px] rounded-[50%] bg-blue-500" />
              )}
              <div className=" flex flex-col items-start justify-start">
                {" "}
                <p className=" text-black text-[12px] mb-[10px]">
                  {item?.username}
                </p>
                <p className=" text-gray-600 text-[12px]">{item?.email}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Index;
