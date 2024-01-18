import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {

  const [scanResult, setScanResult] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [showEnter, setShowEnter] = useState(false);
  const [txtStamp, setTxtStamp] = useState("");
  var html5QrCode:Html5Qrcode;// = new Html5Qrcode("reader");
  


  useEffect(() => {

    const qrCodeSuccessCallback = async (decodedText: any, decodedResult: any) => {
      

      if(decodedText){
        let data = {
            token: decodedText
        }
        await html5QrCode.pause();
        //html5QrCode.stop();
        
        axios.post(
          process.env.NEXT_PUBLIC_CMU_SERVICE + `/checkIn`,
          data,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        ).then((response) => {
          console.log(JSON.stringify(response.data));
          let resData = response.data;
          if(resData.status == 1){
            //Pass
            setShowPass(true);
            setShowErr(false);
            setShowEnter(false);
            let dateSmp = new Date();
            setTxtStamp("เข้างาน : " + dateSmp.getHours() + ":" + dateSmp.getMinutes() + ":" + dateSmp.getSeconds());
          }else if(resData.status == 2){
            // entered
            setShowPass(false);
            setShowEnter(true);
            setShowErr(false);
            let dateSmp = (resData.data).toString();
            //console.log(dateSmp.getHours() + ":" + dateSmp.getMinutes() + ":" + dateSmp.getSeconds() + " ppppp " + dateSmp)
            setTxtStamp("เข้างานแล้ว : " + dateSmp.substr(11, 8));
          }else{
            //Not Pass
            setTxtStamp("ไม่มีสิทธิ์เข้างาน");
            setShowPass(false);
            setShowErr(true);
            setShowEnter(false);
          }
          // html5QrCode.pause();
          //html5QrCode.stop();
          html5QrCode.clear();
          
        })
        .catch((error) => {
          console.log(error);
        });
        
        //html5QrCode.clear();
      }
    };
    const config = { fps: 4, qrbox: { width: 250, height: 250 }};
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, (err) => { });

  }, [])

  //////////
  const openCame = () => {
    setShowPass(false);
    setShowErr(false);
    setShowEnter(false);
    setTxtStamp("");

    if(html5QrCode){
      html5QrCode.resume();
    }else{              
      const qrCodeSuccessCallback = async (decodedText: any, decodedResult: any) => {
        html5QrCode.pause();
        if(decodedText){
          let data = {
              token: decodedText
            }
          axios.post(
            process.env.NEXT_PUBLIC_CMU_SERVICE + `/checkIn`,
            data,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          ).then((response) => {
            console.log(JSON.stringify(response.data));
            let resData = response.data;
            if(resData.status == 1){
              //Pass
              setShowPass(true);
              setShowErr(false);
              setShowEnter(false);
              let dateSmp = new Date();
              setTxtStamp("เข้างาน : " + dateSmp.getHours() + ":" + dateSmp.getMinutes() + ":" + dateSmp.getSeconds());
            }else if(resData.status == 2){
              // entered
              setShowPass(false);
              setShowEnter(true);
              setShowErr(false);
              let dateSmp = (resData.data).toString();
              //console.log(dateSmp.getHours() + ":" + dateSmp.getMinutes() + ":" + dateSmp.getSeconds() + " ppppp " + dateSmp)
              setTxtStamp("เข้างานแล้ว : " + dateSmp.substr(11, 8));
            }else{
              //Not Pass
              setTxtStamp("ไม่มีสิทธิ์เข้างาน");
              setShowPass(false);
              setShowErr(true);
              setShowEnter(false);
            }
            html5QrCode.pause();
            //html5QrCode.stop();
            html5QrCode.clear();
            
          })
          .catch((error) => {
            console.log(error);
          });
          
          //html5QrCode.clear();
        }  
      };
      const config = { fps: 4, qrbox: { width: 250, height: 250 }};
      html5QrCode = new Html5Qrcode("reader");
      html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, (err) => { });
    }
  }

  const tHint = (state: boolean) => {
    setShowPass(state);
    setShowErr(state);
  }

  return (
    <div
      className={"grid m-5 h-50"}>
      <div className="justify-center col">
        <div className="" id="reader"></div>
        <div style={{ display: showPass ? "block" : "none" }} className="text-center my-4">
          <h1 className="bg-[#66CC00] w-full h- 20 text-3xl p-2 text-[#0E275C]">ผ่าน</h1>
        </div>
        <div style={{ display: showErr ? "block" : "none" }} className="text-center my-4">
          <h1 className="bg-[#EB3E3E] w-full h- 20 text-3xl p-2 text-[#292929]">ไม่ผ่าน</h1>
        </div>
        <div style={{ display: showEnter ? "block" : "none" }} className="text-center my-4">
          <h1 className="bg-[#EB3E3E] w-full h- 20 text-3xl p-2 text-[#292929]">ใช้สิทธิ์แล้ว</h1>
        </div>
        <div className="flex justify-center my-4 h-auto" >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-56 h-14 rounded-lg" onClick={() => openCame()} >
            RESET
          </button>
        </div>
        <div className="flex justify-left my-4 h-auto" >
          <p className="">{txtStamp}</p>
        </div>
        
        
      </div>
    </div>


  );
}



/*let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, 
        qrbox: { width: 250, height: 250 },
        // videoConstraints: {
        //   facingMode: { exact: "user" },
        // },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ],
        
      }, false);

          
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  
    function onScanSuccess(decodedText: any, decodedResult: any) {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      //html5QrcodeScanner.clear();
    }
  
    function onScanFailure(error: any) {
      console.warn(`Code scan error = ${error}`);
      //html5QrcodeScanner.clear();
    }*/