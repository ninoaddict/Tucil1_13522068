"use client";
import { useState } from "react";
import { ResultData } from "./game";
import { getResultFromFile } from "../lib/actions";
import { orbitron } from "./font";
import Result from "./result";

export default function FileInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  async function handleOnFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // event.preventDefault();
    if (!event.target.files || event.target.files.length == 0) {
      console.log("tidak ada");
      return;
    }
    const newFile = event.target.files[0];
    setFile(newFile);
  }

  async function handleFileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      console.log("No file found!");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await getResultFromFile(formData);
      // console.log(res);
      setResultData(res);
      // setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    return;
  }

  return (
    <>
      <form onSubmit={handleFileSubmit}>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="txt-file"
            className="flex flex-col items-center justify-center w-full h-56 md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              {!file ? (
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop txt file
                </p>
              ) : (
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">{file.name}</span>
                </p>
              )}
            </div>
            <input
              id="txt-file"
              name="txt-file"
              type="file"
              className="hidden"
              accept=".txt"
              onChange={handleOnFileChange}
              required
            />
          </label>
        </div>

        <div className="flex justify-center md:justify-end">
          <button
            className="mt-6 relative inline-flex items-center justify-center p-0.5 mb-2 mr-0 me-2 overflow-hidden text-md font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white text-onBackground focus:ring-4 focus:outline-none focus:ring-green-800"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className={`${orbitron.className} relative px-5 py-2.5 transition-all ease-in duration-75 bg-background rounded-md group-hover:bg-opacity-0`}
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin bg"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading
              </span>
            ) : (
              <span
                className={`${orbitron.className} relative px-5 py-2.5 transition-all ease-in duration-75 bg-background rounded-md group-hover:bg-opacity-0`}
              >
                Solve
              </span>
            )}
          </button>
        </div>
      </form>
      <div className="divide-y-[1.5px] divide-gray-700 mt-4">
        <div></div>
        <div></div>
      </div>
      {resultData != null && <Result data={resultData} />}
    </>
  );
}
