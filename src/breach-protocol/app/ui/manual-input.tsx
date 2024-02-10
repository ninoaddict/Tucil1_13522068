import { orbitron } from "./font";
import { useState } from "react";
import { ResultData } from "./game";
import { getRandomResult } from "../lib/actions";
import Result from "./result";
// import { error } from "console";
import Swal from "sweetalert2";

export default function ManualInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  async function handleDataSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const res = await getRandomResult(formData);
      // console.log(res);

      if (res.errorMsg != "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.errorMsg,
          background: "rgb(55 65 81)",
          color: "#f3f3f3",
          timer: 1500,
          confirmButtonText: "Close",
          confirmButtonColor: "#03DAC6",
        });
        return;
      }

      const { errorMsg, ...hasil } = res;

      setResultData(hasil as ResultData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    return;
  }

  return (
    <>
      <form
        className={`${orbitron.className} mx-auto`}
        onSubmit={handleDataSubmit}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="row"
              className="block mb-2 text-md md:text-lg font-lg text-onBackground"
            >
              Row
            </label>
            <input
              type="number"
              id="row"
              name="row"
              className="border text-md md:text-lg rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-onBackground focus:ring-blue-500 focus:border-blue-500"
              min={1}
              required
            />
          </div>
          <div>
            <label
              htmlFor="column"
              className="block mb-2 text-md md:text-lg font-medium text-onBackground"
            >
              Column
            </label>
            <input
              type="number"
              id="column"
              name="column"
              min={1}
              className="border text-md md:text-lg rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-onBackground focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="buffer"
              className="block mb-2 text-md md:text-lg font-medium text-onBackground"
            >
              Buffer
            </label>
            <input
              type="number"
              id="buffer"
              name="buffer"
              min={0}
              className="border text-md md:text-lg rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-onBackground focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="sequenceNumber"
              className="block mb-2 text-md md:text-lg font-medium text-onBackground"
            >
              Number of Sequence
            </label>
            <input
              type="number"
              id="sequenceNumber"
              name="sequenceNumber"
              min={0}
              className="border text-md md:text-lg rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-onBackground focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="maxSequenceLength"
              className="block mb-2 text-md md:text-lg font-medium text-onBackground"
            >
              Maximum Sequence Length
            </label>
            <input
              type="number"
              id="maxSequenceLength"
              name="maxSequenceLength"
              min={2}
              className="border text-md md:text-lg rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-onBackground focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="tokenNumber"
              className="block mb-2 text-md md:text-lg font-medium text-onBackground"
            >
              Number Of Unique Token
            </label>
            <input
              type="number"
              id="tokenNumber"
              name="tokenNumber"
              min={1}
              className="border text-md md:text-lg rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-onBackground focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <label
          htmlFor="tokens"
          className="block mb-2 text-md md:text-lg font-medium text-onBackground"
        >
          Input Unique Tokens (separated by spaces)
        </label>
        <input
          type="text"
          id="tokens"
          name="tokens"
          className="[word-spacing:5px] border md:text-lg rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-onBackground focus:ring-blue-500 focus:border-blue-500"
          required
        ></input>
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
