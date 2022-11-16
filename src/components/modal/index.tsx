import Image from "next/image";
import React from "react";
import ReactDOM from "react-dom";
import closeIcon from "../../../public/icon-close.svg";

interface IModal {
  children: React.ReactNode;
  title: string;
  visible: boolean;
  onClose: () => void;
}

export default function Modal({ children, title, visible, onClose }: IModal) {
  return (
    <div
      className={`fixed z-50 h-screen w-screen bg-[rgba(0,0,0,.5)] ${
        !visible && "hidden"
      } `}
    >
      <section className="mx-auto my-14 w-[90%] max-w-[640px] rounded-2xl bg-brand-gray-100">
        <header className="flex items-center justify-between border-b-2 border-b-[#E3E1E1] px-5 py-7">
          <h2 className="font-kumbh text-[20px] font-bold text-brand-bg-200 md:text-[28px]">
            {title}
          </h2>
          <Image
            onClick={onClose}
            className="h-[18px] w-[18px] cursor-pointer"
            alt="Close"
            src={closeIcon}
          />
        </header>
        <div className="relative flex flex-col px-5 py-3 md:items-center">
          {children}
        </div>
      </section>
    </div>
  );
}
