import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {

  const [scanResult, setScanResult] = useState("");


  useEffect(() => {


    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = async (decodedText: any, decodedResult: any) => {
      /* handle success */
      //setScanResult(decodedText);
      console.log(decodedText);
      let data = {
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRfaWQiOiIxMTAzNzAzNzM2OTkwIiwiaWF0IjoxNzA1MDUyMDY5LCJleHAiOjE3MDUxMzg0Njl9.VkXgyvpkxDmq6HdXRv5aWdZNiNpERlJGP1lfj4UFP4E' 
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://60th.scmc.cmu.ac.th/verifyToken',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        let resData = response.data;
        if(resData.status == 1){
          setScanResult("PASS");
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
      

      html5QrCode.clear();


    };
    const config = { fps: 2, qrbox: { width: 250, height: 250 } };
    html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccessCallback, (err) => { });

  }, [])


  return (
    <div
      className={"grid m-5 h-50"}>
      <div className="justify-center col">
        <div className="" id="reader"></div>
        <div className="" >
          <h1>{scanResult}</h1>
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