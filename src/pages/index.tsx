import Head from "next/head";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Setting from "@/redux/reducers/setting";
import router from "next/router";

export default function Home() {
  const [popUp, setPopup] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [disableBtnsub, setDisableBtnsub] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const dispath = useDispatch();
  const it = searchParams.get("it");
  const email = searchParams.get("email");
  const fname = searchParams.get("fname");
  const lname = searchParams.get("lname");
  const org = searchParams.get("org");
  const stu = searchParams.get("stu");
  const acctype = searchParams.get("acctype");

  useEffect(() => {
    dispath(Setting.updateState({ isLoadingScreen: true }));
    //dispath(User.updateState({ accessToken: search }));
    checkData();
  }, [fname]);

  const checkData = async () => {
    let datasent = {
      fname: fname,
      lname: lname,
    };
    console.log(datasent);
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CMU_SERVICE + `/checkdup`,
      datasent,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(response);
    if (response.data.count === 0) {
      dispath(Setting.updateState({ isLoadingScreen: false }));
      // console.log(response.data.msg);
    } else {
      dispath(Setting.updateState({ isLoadingScreen: true }));
      router.push("/result/Done");
    }
  };
  const setDataUserTracking = async () => {
    let datasent = {
      cit_id: acctype,
      email: email,
      org_code: org,
      sts_id: stu,
      fname: fname,
      lname: lname,
      acctype: acctype,
    };
    console.log(datasent);
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CMU_SERVICE + `/ss`,
      datasent,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(response);
    if (response.data.status === 1) {
      console.log(response.data.msg);
    } else {
      console.log(response.data.msg);
    }
  };
  const setOnchange = (event: any) => {
    if (event.target.checked === true) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };
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
          <div className="mb-2">
            <div className="flex items-center mb-2 mt-2">
              <input
                onChange={setOnchange}
                type="checkbox"
                value="1"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ml-2 text-sm font-medium text-gray-900 ">
                ยอมรับ
              </label>
            </div>
          </div>
          <button
            disabled={disableBtn}
            onClick={() => {
              setPopup(true);
            }}
            className={`bg-ccmu text-white py-3 w-full rounded-xl   ${
              disableBtn ? "bg-gray-300 " : "bg-ccmu   "
            }`}
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
                          onClick={setDataUserTracking}
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
