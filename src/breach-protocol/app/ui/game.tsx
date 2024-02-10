"use client";

import { useState } from "react";
import { orbitron } from "./font";
import FileInput from "./file-input";
import ManualInput from "./manual-input";

export interface ResultData {
  maxPoint: number;
  runTime: number;
  matrix: string[][];
  coordinates: { x: number; y: number }[];
  styleArr: number[][];
  sequences: string[][];
  vertical: boolean[][];
  horizontal: boolean[][];
  rewards: number[];
}

export default function Game() {
  const [isFileInput, setIsFileInput] = useState(true);

  function handleInputChange() {
    setIsFileInput((input) => !input);
  }

  return (
    <>
      <section id="form">
        <div
          className={`text-md font-medium text-center text-onBackground border-b-[1.5px] border-gray-700 ${orbitron.className} mb-6 md:mb-8`}
        >
          <ul className="flex flex-wrap -mb-[1.5px]">
            <li className="me-2">
              <button
                className={`inline-block p-4 border-b-[3px] rounded-t-lg  ${
                  isFileInput
                    ? "active border-secondary text-secondary"
                    : "hover:text-secondary hover:border-secondary border-transparent"
                }`}
                onClick={() => {
                  if (!isFileInput) {
                    return handleInputChange();
                  }
                }}
              >
                File Input
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block p-4 border-b-[3px] rounded-t-lg  ${
                  !isFileInput
                    ? "active border-secondary text-secondary"
                    : "hover:text-secondary hover:border-secondary border-transparent"
                }`}
                onClick={() => {
                  if (isFileInput) {
                    return handleInputChange();
                  }
                }}
              >
                Random Input
              </button>
            </li>
          </ul>
        </div>
        {isFileInput ? <FileInput /> : <ManualInput />}
      </section>
    </>
  );
}
