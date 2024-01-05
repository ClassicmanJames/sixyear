import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Setting from "@/redux/reducers/setting";
import { useSelector, useDispatch } from "react-redux";

const Done = () => {
  const dispath = useDispatch();
  const [yearuser, setYearuser] = useState<string>();

  dispath(Setting.updateState({ isLoadingScreen: false }));

  return (
    <div className="m-5 h-50 bg-[#FBFBFB] drop-shadow-xl rounded-xl p-2">
      <div className="grid m-5  rounded-lg justify-items-center">
        <Image
          src={"/SUBLOGO1.png"}
          width={"200"}
          height={"30"}
          alt={"ssd"}
        ></Image>
      </div>
      <div className="h-50  rounded-lg  text-green-500  text-center">
        <div className="bg-green-100 p-2 rounded-lg">
          คุณได้ลงทะเบียนไปแล้วกรุณารอการยืนยืนจากระบบ
        </div>
      </div>
    </div>
  );
};
export default Done;
