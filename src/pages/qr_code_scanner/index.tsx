import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {

  const [scanResult, setScanResult] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [txtStamp, setTxtStamp] = useState("");
  var html5QrCode:Html5Qrcode;// = new Html5Qrcode("reader");
  


  useEffect(() => {

    let dateSmp = new Date();
    //  + dateSmp.getDate() + "/" + (dateSmp.getMonth() +1) + "/" + dateSmp.getFullYear() + " "
    setTxtStamp("เข้างาน : " + dateSmp.getHours() + ":" + dateSmp.getMinutes() + ":" + dateSmp.getSeconds());

    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRfaWQiOiIxMTQ5NTAwMDA1NTU0IiwiaWF0IjoxNzA1Mzc3MTQxLCJleHAiOjE3MDYyNDExNDF9.F_VR3_7bEpJLFDbMAI4rJK3fVhRXRTq3P_Cr1H9hbho";   
    const qrCodeSuccessCallback = async (decodedText: any, decodedResult: any) => {
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
            setScanResult(`<h1 className="bg-[#50d71e] w-full h- 20 text-3xl">ผ่าน</h1>`);
          }else{
            setScanResult(`<h1 className="bg-[#ff3333] w-full h- 20 text-3xl">ไม่ผ่าน</h1>`);
          }
          html5QrCode.pause();
          //html5QrCode.stop();
          html5QrCode.clear();
          setShowPass(false);
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
    if(html5QrCode){
      html5QrCode.resume();
    }else{              
      const qrCodeSuccessCallback = async (decodedText: any, decodedResult: any) => {
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
              setScanResult(`<h1 className="bg-[#50d71e] w-full h- 20 text-3xl">ผ่าน</h1>`);
              setShowPass(true);
            }else if(resData.status == 2){
              let dateSmp = new Date(resData.stamp);
              //+ dateSmp.getDate() + "/" + (dateSmp.getMonth() +1) + "/" + dateSmp.getFullYear() + " " 
              setTxtStamp("เข้างาน : " + dateSmp.getHours() + ":" + dateSmp.getMinutes() + ":" + dateSmp.getSeconds());
              setShowPass(false);
            }
            else{
              setScanResult(`<h1 className="bg-[#ff3333] w-full h- 20 text-3xl">ไม่ผ่าน</h1>`);
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