import React, { useEffect, useRef } from "react";
import { useQRCode } from "next-qrcode";
import { useSelector } from "react-redux";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import gsap from "gsap";

const FilePublicAccess = ({ onClickUploadNewFile = () => {} }) => {
  const { Canvas } = useQRCode();
  const [emails, setEmails] = React.useState([]);
  const [focused, setFocused] = React.useState(false);
  const modalRef = useRef(null);
  const { fileProgress, loading } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (fileProgress === 100 && !loading && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: -30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [fileProgress, loading]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-br from-indigo-50 to-violet-100 min-h-screen">
      {/* Modal */}
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 mb-8"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-indigo-600">Your App is Ready</h2>
          <a
            className="text-indigo-500 hover:text-indigo-700 font-semibold underline cursor-pointer transition-colors"
            download
            href={"#"}
          >
            Install
          </a>
        </div>
      </div>

      {/* QR Code */}
      <div className="flex items-center justify-center w-full mb-10">
        <Canvas
          text={"https://github.com/bunlong/next-qrcode"}
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

      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-8">
        <form className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Enter Recipients:
            </label>
            <ReactMultiEmail
              emails={emails}
              onChange={setEmails}
              autoFocus
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              getLabel={(email, index, removeEmail) => (
                <div data-tag key={index} className="bg-indigo-100 px-2 py-1 rounded-lg text-sm">
                  <span className="text-indigo-700">{email}</span>
                  <span
                    className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => removeEmail(index)}
                  >
                    ×
                  </span>
                </div>
              )}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
              placeholder="Type your message here..."
              id="message"
              name="message"
              rows={4}
              maxLength={500}
              required
            ></textarea>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg bg-violet-500 text-white font-medium shadow-md hover:bg-violet-600 focus:ring-2 focus:ring-violet-400 transition"
            >
              Submit
            </button>
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg bg-violet-500 text-white font-medium shadow-md hover:bg-violet-600 focus:ring-2 focus:ring-violet-300 transition"
              onClick={onClickUploadNewFile}
            >
              Upload New File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilePublicAccess;
