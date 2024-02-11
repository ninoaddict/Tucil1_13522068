import { orbitron } from "./font";
import { ResultData } from "./game";
import { v4 } from "uuid";

export default function DownloadButton({ data }: { data: ResultData }) {
  async function handleClick() {
    const url = v4();
    const fileName = url + ".txt";
    const response = await fetch("api/download", {
      method: "POST",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify(data),
    });

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);

    link.download = fileName;

    link.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <button
      className="mt-6 relative inline-flex items-center justify-center p-0.5 mb-2 mr-0 me-2 overflow-hidden text-md font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white text-onBackground focus:ring-4 focus:outline-none focus:ring-green-800"
      onClick={handleClick}
    >
      <span
        className={`${orbitron.className} relative px-5 py-2.5 transition-all ease-in duration-75 bg-background rounded-md group-hover:bg-opacity-0`}
      >
        <svg
          className="inline fill-current w-4 h-4 me-2 animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        Download
      </span>
    </button>
  );
}
