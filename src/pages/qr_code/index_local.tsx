import router from "next/router";
import { useQRCode } from 'next-qrcode';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from "next/navigation";

export default function Page() {

    const searchParams = useSearchParams();
    const { SVG } = useQRCode();
    const [tkData, setTkData] = useState([]);
    const cit_id = searchParams.get("citizen_id") || '1609900595354';

    useEffect(() => {
        const getToken = async () => {
            console.log("22222   " + process.env.NEXT_PUBLIC_CMU_SERVICE);
            const response = await axios.post(process.env.NEXT_PUBLIC_CMU_SERVICE + '/setSertTK', { cit_id: cit_id }, {
                headers: {
                    "content-type": "application/json",
                }
            });
            setTkData(response.data.token || '3');
            console.log(response.data);
        }
        getToken();
    }, []); 

    return (
        <div>
            <p className="text-4xl font-semibold text-gray-900 dark:text-white">QR Code</p>
            <div className="flex h-screen">
                <div className="m-auto">
                    <SVG text={tkData.toString() ||'3'}
                        options={{
                            margin: 2,
                            width: 200,
                            color: {
                                dark: '#000000',
                                light: '#FFFFFF',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}



