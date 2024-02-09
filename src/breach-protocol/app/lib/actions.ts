"use server";

import runBruteForce from "./bruteforce";
import { readRawData } from "./util";

export async function getResultFromFile(formData: FormData) {
  const file: File = formData.get("file") as File;
  const inputString: string = await file.text();
  const data = readRawData(inputString);

  const result = runBruteForce(data);

  return { result };
}
