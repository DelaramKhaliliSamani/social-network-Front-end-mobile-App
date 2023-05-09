import React, { useState, useEffect } from "react";
import { useSaveUser } from "./query/query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import Inputs from "component/share/input/input";
import { MainBtn, PrimaryBtn } from "component/share/btn";
import { ThreeDots } from "react-loader-spinner";
import useCommentUser from "./query/mutation";
import Post from "./post";
function Index() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

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
  console.log("dataa", data);
  useEffect(() => {
    setData(saveUserQuery?.data);
  }, [saveUserQuery?.data]);
  return (
    <div>
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
            className=" pb-[20px] mb-[20px] border-b-2 border-b-slate-200 border-solid"
          >
            <Post item={item} />
          </div>
        ))}
    </div>
  );
}

export default Index;
