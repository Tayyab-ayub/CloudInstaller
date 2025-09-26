import { ClipLoader } from "react-spinners";

export default function Loader({ size = 40, color = "#2563eb" }) {
  return (
    <div className="flex justify-center items-center w-full h-full mt-32">
      <ClipLoader size={size} color={color} />
    </div>
  );
}
