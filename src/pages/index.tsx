import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Home() {
  const [popUp, setPopup] = useState<boolean>(false);

  const setDataUserTracking = () => {};
  return (
    <div>
      <div
        className={"grid m-5 h-50"}
        style={{ background: "white", padding: "16px" }}
      >
        <div className="grid m-5 h-50 rounded-lg justify-items-center">
          <img src={"/SUBLOGO1.png"} width={"150"} height={"30"} alt={"ssd"} />
        </div>
        <div className="grid mb-5 mt-5 h-50 mx-5 rounded-lg text-center ">
          <p>ลงทะเบียนเข้าร่วมงานคอนเสิร์ต 60 ปี</p>
        </div>

        <div className="grid mb-5 mt-5 h-50 mx-5 rounded-lg text-center ">
          <button
            onClick={() => {
              setPopup(true);
            }}
            className="text-white  h-50 rounded-lg text-center cursor-pointer p-2.5 bg-blue-500"
          >
            ลงทะเบียน
          </button>
        </div>
        {popUp && (
          <Transition appear show={popUp} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => null}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 text-center"
                      >
                        <div></div>
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-center text-xl text-gray-500">
                          ยินยันการรับสิทธิ์การลงทะเบียนทะเบียนเข้าร่วมงานคอนเสิร์ต
                          60 ปี
                        </p>
                      </div>
                      <div className="mt-2">
                        <div className="text-center flex items-center">
                          <p className=" text-xl text-gray-500"></p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          className="bg-green-500 text-white p-2 rounded-lg cursor-pointer w-full mt-2"
                          onClick={() => setPopup(false)}
                        >
                          ยืนยัน
                        </button>
                        <button
                          className="bg-red-500 text-white p-2 rounded-lg cursor-pointer w-full mt-2"
                          onClick={() => setPopup(false)}
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        )}
      </div>
    </div>
  );
}
