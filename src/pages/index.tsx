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
import * as User from "@/redux/reducers/user";
import router from "next/router";

export default function Home() {
  const [popUp, setPopup] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [disableBtnsub, setDisableBtnsub] = useState<boolean>(false);
  const [statusType, setStatusType] = useState<number>(1);
  const searchParams = useSearchParams();
  const dispath = useDispatch();
  const it = searchParams.get("it");
  const email = searchParams.get("email");
  const fname = searchParams.get("fname");
  const lname = searchParams.get("lname");
  const org = searchParams.get("org");
  const stu = searchParams.get("stu");
  const type_p = searchParams.get("type_p");
  const acctype = searchParams.get("acctype");
  const cit_id = searchParams.get("citizen_id");

  useEffect(() => {
    dispath(Setting.updateState({ isLoadingScreen: true }));
    if (fname) {
      checkData();
    }
    //dispath(User.updateState({ accessToken: search }));
  }, [fname]);

  const checkData = async () => {
    // if (stu === "1") {
    //   setStatusType(1);
    // } else if (stu === "2") {
    //   setStatusType(2);
    // }
    // console.log("citizen_id" + cit_id);
    // console.log(statusType);
    dispath(User.updateState({ accessToken: cit_id }));
    let datasent = {
      fname: fname,
      lname: lname,
      type_p: type_p,
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
    if (response.data.status === 1) {
      dispath(Setting.updateState({ isLoadingScreen: false }));
      // console.log(response.data.msg);
      router.push("/result/Serverfull");
    } else if (response.data.status === 2) {
      dispath(Setting.updateState({ isLoadingScreen: true }));
      router.push("/result/Serverfull");
    } else if (response.data.status === 43) {
      dispath(Setting.updateState({ isLoadingScreen: true }));
      router.push("/qr_code/");
    } else if (response.data.status === 3) {
      dispath(Setting.updateState({ isLoadingScreen: true }));
      router.push("/Done/Already");
    }
  };
  const setDataUserTracking = async () => {
    setDisableBtnsub(true);
    dispath(Setting.updateState({ isLoadingScreen: true }));
    let datasent = {
      cit_id: cit_id,
      email: email,
      org_code: org,
      std_id: stu,
      fname: fname,
      lname: lname,
      acctype: acctype,
      type_p: type_p,
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
      //console.log(response.data.msg);
      router.push("/result/Done");
    } else if (response.data.status === 41) {
      dispath(Setting.updateState({ isLoadingScreen: true }));
      router.push("/result/Serverfull");
    } else if (response.data.status === 43) {
      //console.log(response.data.msg);
      router.push("/result/Success");
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
        <div className="text-center mb-2 font-semibold">
          <h1>ลงทะเบียนเข้าร่วมงานคอนเสิร์ต 60 ปี</h1>
        </div>
        <div className="text-center mb-5 font-semibold">
          <h1>(Registration for CMU’s 60-Year Anniversary Concert)</h1>
        </div>
        <div className="flex mb-5 justify-center">
          <img src={"/bg.jpg"} width={"550"} alt={"ssd"} />
        </div>
        <div className="rounded-lg">
          <p className="text-center text-base font-semibold">
            {"เงื่อนไขการรับ QR Code"}
          </p>
          <p className="text-center text-base font-semibold">
            {"สำหรับการเข้าชมคอนเสิร์ต"}
          </p>

          <p className="text-center text-base font-semibold">
            {"(Conditions for receiving QR code pass)"}
          </p>

          <div className="p-5 pl-8 mt-2 max-h-72 overflow-y-scroll border rounded-xl">
            <ul className="list-disc text-sm ">
              <li>
                นักศึกษา บุคลากร และนักศึกษาเก่า มหาวิทยาลัยเชียงใหม่
                สามารถกดรับ QR Code สำหรับการเข้าชมคอนเสิร์ต 1 QR Code ต่อ 1 คน
                เท่านั้น (CMU’s students, officers, and alumnus can get only 1
                QR code/person)
              </li>

              <li>
                QR Code สำหรับการเข้าชมคอนเสิร์ต ไม่สามารถโอนต่อให้ผู้อื่นได้
                (The QR code pass cannot be transferred to other person)
              </li>
              <li>
                ไม่มีการจำหน่ายบัตร หรือ QR Code ใด ๆ ทั้งสิ้น
                ทั้งนี้ผู้จัดงานไม่รับผิดชอบใดๆ
                ทั้งสิ้นในกรณีที่มีความเสียหายเกิดขึ้น (There is no ticket or QR
                code pass selling. The organizer will not cover any financial
                damages. )
              </li>

              <li>
                ทีมงานขอสงวนสิทธิ์ในการพิจารณายกเลิกสิทธิ
                หากไม่ปฎิบัติตามกฎกติกา มีการทุจริต
                หรือส่อเจตนาทุจริตในการร่วมกิจกรรม (The organizer team has
                authority to revoke the pass in case of violation to rules,
                cheat, or intension to do so. )
              </li>
            </ul>
            <p className="text-base font-semibold mt-4">
              มาตรการการรับชมคอนเสิร์ต (Measures for Attending the Concert)
            </p>
            <ul className="list-disc text-sm ">
              <li>
                ผู้เข้าชม ต้องมี QR Code สำหรับการเข้าชมคอนเสิร์ต 1 QR Code ต่อ
                1 คนเท่านั้น (The QR code must be present; 1 QR code/person
                only.)
              </li>
              <li>
                ไม่สามารถใช้รูปจากการแคปหน้าจอได้ (Screenshot of the QR code
                cannot be used.)
              </li>
              <li>
                QR Code ที่สแกนเข้างานแล้ว จะไม่สามารถใช้ได้อีก (QR code that is
                already scanned cannot be reused.)
              </li>

              <li>
                เป็นคอนเสิร์ตแบบยืนในพื้นที่จำกัด(งดเว้นการนำเสื่อและเก้าอี้มาใช้ภายในพื้นที่ชมคอนเสิร์ต)
                (The audience is required to stand up in the concert area (mats
                and chairs are not allowed).)
              </li>

              <li>
                เริ่มเปิดประตูทางเข้า เวลา 15.30 น.(Entrance gate opens at 3.30
                PM.)
              </li>
              <li>
                มีจุดตรวจกระเป๋าบริเวณทางเข้า
                *กรุณาให้ความร่วมมือในการตรวจค้นก่อนเข้าภายในงาน* (หมายเหตุ :
                ผู้จัดไม่มีการรับฝากของ ขออภัยในความไม่สะดวก) (Security check is
                at the entrance. Please kindly cooperate before entering the
                concert. (Note: There is no left belonging service. Apologize
                for the inconvenience.))
              </li>

              <li>
                โปรดระมัดระวังทรัพย์สินของมีค่า
                ผู้จัดงานจะไม่รับผิดชอบหากมีการชำรุดหรือสูญหาย (Please beware of
                your belongings. The organizer is not responsible for damage or
                loss.)
              </li>
              <li>
                เพื่อความสะดวกรวดเร็วในการเข้าชมคอนเสิร์ต
                แนะนำให้ผู้เข้าชมเตรียมเปิด QR Code จาก device ของตนเอง
                ในระหว่างการรอคิว. (For your convenience, it is recommended to
                open and prepare the QR code during in queue line. )
              </li>
              <li>
                ด้านนอกมีบูธจำหน่ายอาหาร และสุขาเคลื่อนที่
                หากท่านออกจากพื้นที่ชมคอนเสิร์ต
                อาจจำเป็นต้องเข้าคิวและถูกตรวจกระเป๋าอีกรอบ
                กรุณาเตรียมความพร้อมของตนเอง
                ก่อนเข้าพื้นที่ชมคอนเสิร์ตเพื่อความสะดวกของตัวท่านเอง (Food
                shops and mobile toilets are outside of the concert area.
                Reentering the concert must be queued in line and pass the
                security check again. Please prepare yourself before reentering
                the concert area.)
              </li>

              <li>
                เพื่อรักษาสิทธิ์ของตนเอง อย่าส่ง QR Code ต่อให้บุคคลอื่น (Do not
                send the QR code to others.)
              </li>
              <li>
                ไม่อนุญาตให้ผู้ที่อยู่ในอาการมึนเมา หรือ
                สภาพร่างกายไม่พร้อมสำหรับการชมคอนเสิร์ต
                เข้าไปในพื้นที่ชมคอนเสิร์ต (Audiences with drunkenness or
                not-ready condition are not allowed to enter the concert.)
              </li>
              <li>
                หากผู้เข้าร่วมงานฝ่าฝืนกฎ หรือสร้างความวุ่นวาย
                ขอยกเลิกสิทธิการเข้าชมและขอเชิญออกนอกพื้นที่บริเวณงาน (In case
                of violation to rules or causing disorder, the audience will be
                forced to leave the concert.)
              </li>

              <li>
                ขอให้ยึดตามระเบียบอย่างเคร่งครัด
                เพื่อความสะดวกรวดเร็วในการเข้ารับชมคอนเสิร์ต (Please strictly
                follow the regulations for your convenience.)
              </li>
            </ul>
            <p className="text-base font-semibold mt-4">
              สิ่งที่ไม่อนุญาตให้นำเข้าพื้นที่ชมคอนเสิร์ต (Broadcast or live
              stream to all platforms)
            </p>
            <ul className="list-disc text-sm mt-2">
              <li>
                ห้ามถ่ายทอดสด หรือ LIVE ด้วย Application ทุกชนิด (Weapons,
                weapon imitations, sharp objects, hazardous substances, and
                drugs are prohibited.)
              </li>
              <li>
                ห้ามนำอาวุธ สิ่งเทียมอาวุธ ของมีคม วัตถุอันตราย
                และสารเสพติดทุกชนิดเข้าภายในงาน (Food, drinks, and water bottles
                cannot enter the concert area.)
              </li>

              <li>ห้ามนำโดรนเข้ามาบินภายในบริเวณงาน (Flying drones)</li>
              <li>ห้ามนำสัตว์เลี้ยงเข้ามาภายในงาน (Pets)</li>
              <li>
                ห้ามสูบบุหรี่ บุหรี่ไฟฟ้า ทุกชนิด (Smoking, e-cigarettes, and
                vaping)
              </li>
              <li>
                ห้ามนำ ป้ายไฟ หรือ แผ่นป้ายเชียร์แบบกระดาษ หรือแผ่นกระดาษ
                ขนาดเกิน A4 เข้าภายในงาน (LED or paper sheer signs exceeding A4
                size are not allowed )
              </li>
              <li>
                วัตถุไวไฟ พลุหรือดอกไม้ไฟทุกชนิด(Explosives or fireworks )
              </li>
              <li>
                ลูกโป่งอัดแก๊ส ลูกโป่งอัดลม กระบองลม ลูกบอลขนาดใหญ่ (Do not
                cause any disorder, quarrel, or riot. )
              </li>
              <li>
                ห้ามกระทำการใด ๆ ที่ไม่เหมาะสม ซึ่งนำไปสู่ความขัดแย้ง
                การทะเลาะวิวาท และการจราจล (Privacy Policy: Dissent for
                Photography and Publishing)
              </li>
            </ul>
            <p className="text-base font-semibold mt-4">
              การคุ้มครองความเป็นส่วนบุคคล :
              การไม่ยินยอมให้ถ่ายภาพหรือเผยแพร่ภาพ (In case of dissent for
              photography and publishing, please avoid passing camera areas. If
              you are in the camera-operating area, it is considered that you
              are consent to this policy.)
            </p>
            <ul className="list-disc text-sm mt-2">
              <li>
                หากผู้ชมท่านใดไม่ประสงค์ที่จะยินยอมให้ถ่ายภาพหรือเผยแพร่ภาพให้ท่านเดินเลี่ยงบริเวณที่มีกล้องหากท่านใดอยู่ในบริเวณจุดเผยแพร่ภาพ
                ถือว่าท่านยินยอมให้ถ่ายหรือเผยแพร่ภาพ (In case of dissent for
                photography and publishing, please avoid passing camera areas.
                If you are in the camera-operating area, it is considered that
                you are consent to this policy.)
              </li>
            </ul>
          </div>
        </div>

        <div className="grid mb-5  h-50 mx-5 rounded-lg text-center ">
          <div className="mb-2">
            <div className="flex items-center mb-2 mt-2">
              <input
                onChange={setOnchange}
                type="checkbox"
                value="1"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ml-2 text-sm font-medium text-gray-900 ">
                ยอมรับ (Accept)
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
                          ยืนยันการรับสิทธิ์การลงทะเบียนทะเบียนเข้าร่วมงานคอนเสิร์ต
                          60 ปี (Confirm your registration to join the concert)
                        </p>
                      </div>
                      <div className="mt-2">
                        <div className="text-center flex items-center">
                          <p className=" text-xl text-gray-500"></p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          disabled={disableBtnsub}
                          className={`text-white p-2 rounded-lg cursor-pointer w-full mt-2   ${
                            disableBtnsub ? "bg-gray-300 " : "bg-green-500  "
                          }`}
                          //   className="bg-green-500 text-white p-2 rounded-lg cursor-pointer w-full mt-2"
                          onClick={setDataUserTracking}
                        >
                          ยืนยัน (Confirm)
                        </button>
                        <button
                          className="bg-red-500 text-white p-2 rounded-lg cursor-pointer w-full mt-2"
                          onClick={() => setPopup(false)}
                        >
                          ยกเลิก (Cancel)
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
