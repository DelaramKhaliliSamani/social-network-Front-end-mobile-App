import React, { useState } from "react";

const Modal = ({ show, setShow, key, className, ...props }) => {
  // const [isShowing, setIsShowing] = useState(show);

  // function toggleModal() {
  //     setIsShowing(!isShowing);
  // }

  // console.log(isShowing);

  const divStyle = {
    display: show ? "block" : "none",
    // width: "80%",
  };

  const closeModal = (e) => {
    e.stopPropagation();
    props.closeModal();
  };

  return (
    // <div key={key}>
    <div
      className=" z-[10] w-full h-full fixed top-0 left-0 overflow-auto"
      style={divStyle}
      onClick={closeModal}
    >
      <div className=" w-full h-full  bg-[#25242533] flex justify-center items-center">
        <div
          class={`${className} Modal relative py-[45px] px-[55px] bg-white-dark rounded-3xl  z-[1000] max-h-[90%] overflow-auto custom-scrollbars`}
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}
        </div>
      </div>
    </div>
    // </div>
  );
};

export { Modal };
