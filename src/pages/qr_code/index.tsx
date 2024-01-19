import router from "next/router";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Setting from "@/redux/reducers/setting";

export default function Page() {
  const { SVG } = useQRCode();
  const [tkData, setTkData] = useState([]);
  const dispath = useDispatch();
  const getUser = useSelector((state: any) => state.user);
  //console.log(getUser.accessToken);
  dispath(Setting.updateState({ isLoadingScreen: false }));
  useEffect(() => {
    const getToken = async () => {
      //console.log("22222   " + process.env.NEXT_PUBLIC_CMU_SERVICE);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CMU_SERVICE + "/setSertTK",
        { cit_id: getUser.accessToken },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // setTkData(response.data.token);
      if (response.data.status == 3) {
        router.push("/result/Already");
      } else {
        setTkData(response.data.token);
      }
      //  console.log(response.data);
    };
    getToken();
  }, []);

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
        <div className="p-2 rounded-lg text-base">
          <div className="p-2 bg-green-100 rounded-lg">
            โปรดแสดง Qr Code นี้ต่อเจ้าหน้าก่อนเข้างาน <br /> (Please show this
            Qr Code to the staff before entering the event.)
          </div>

          <div className="flex justify-center">
            <SVG
              text={tkData.toString() || "3"}
              options={{
                margin: 2,
                width: 200,
                color: {
                  dark: "#000000",
                  light: "#FFFFFF",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
