
'use client';
import React from 'react';
import { useQRCode } from "next-qrcode";
import { IoLogoAndroid, IoLogoApple } from "react-icons/io";
import ApiRoutes from '../../../helpers/ApiRoutes';
const Page = ({ params }) => {
    const { Canvas } = useQRCode();
    const { type, token } = params;

    // Construct the download URL. You may need to adjust this based on your backend logic.
    // This example assumes a structure like: https://assets.cloudinstaller.app/ota/apk/your-token
    const downloadUrl = `${ApiRoutes.DOWNLOAD_ASSET_URL}${ApiRoutes.ENDPOINTS.ota}${type}/${token}`;

    return (
        <div className="w-full flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-br from-indigo-50 to-violet-100 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 mb-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4">
                    {type === "apk" ? (
                        <IoLogoAndroid className="text-6xl text-green-500" />
                    ) : (
                        <IoLogoApple className="text-6xl text-gray-700" />
                    )}
                    <h1 className="text-2xl font-bold text-gray-800">Ready to Install</h1>
                    <p className="text-md text-gray-600">
                        You are about to install the {type === 'apk' ? 'Android' : 'iOS'} application.
                    </p>
                </div>

                {/* Install Button */}
                <div className="flex items-center justify-center">
                    <a
                        className="px-5 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 transition-colors text-lg"
                        href={downloadUrl}
                    >
                        Click Here to Install
                    </a>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center justify-center gap-3 pt-4 border-t">
                    <p className="text-sm text-gray-500">Or scan this QR code with your device</p>
                    <Canvas
                        text={downloadUrl} // The QR code will also point to the download URL
                        options={{
                            errorCorrectionLevel: "M",
                            margin: 3,
                            scale: 4,
                            width: 200,
                            color: {
                                dark: "#000000ff",
                                light: "#ffffff",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;
