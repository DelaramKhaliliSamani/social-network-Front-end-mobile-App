import React from "react";
import { ReactComponent as Twiter } from "assets/icon/twiter.svg";
import { ReactComponent as Home } from "assets/icon/dash.svg";
import { MainBtn,PrimaryBtn } from "component/share/btn";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

function Index({ handleModal }) {
  const { authDispatch,token } = useAuth();
  const navigate = useNavigate();
  const handleExit=()=>{
    authDispatch({type: 'LOGOUT', token});
    navigate("/login", { replace: true });
  }
  return (
    <div className=" flex lg:flex-col lg:items-start lg:justify-start items-center justify-between lg:pt-[30px] pt-[15px] w-full ">
      <Twiter className=" text-blue-500" />

      <div className=" flex lg:flex-col lg:items-start lg:justify-start items-center justify-start lg:mt-[30px] mt-[0]  lg:w-full">
        <div className=" relative">
          <NavLink
            key="boot"
            to=""
            style={({ isActive }) =>
              isActive
                ? {
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "rgb(29, 155, 240)",
                    position: "absolute",
                    top: "-5px",
                    left: "5px",
                  }
                : { color: "text-black" }
            }
          ></NavLink>
          <a href="">
            <div className=" flex items-center justify-start cursor-pointer w-full">
              <Home />
              <p className=" ml-[10px] text-lg text-black">Dashboard</p>
            </div>
          </a>
        </div>
        <div className=" lg:w-full lg:mt-[30px] hidden invisible lg:visible lg:flex">
          <MainBtn className={"w-[60%]"} onClick={() => handleModal()}>
            Post
          </MainBtn>
        </div>
        <div className=" lg:w-full lg:mt-[30px] hidden invisible lg:visible lg:flex">
          <PrimaryBtn className={"w-[60%]"} onClick={() => handleExit()}>
            Logout
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

export default Index;
