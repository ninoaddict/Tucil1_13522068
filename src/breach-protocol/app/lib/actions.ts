"use server";

import { revalidatePath } from "next/cache";
import runBruteForce from "./bruteforce";
import { formatCoordinates, readRawData } from "./util";

export async function getResultFromFile(formData: FormData) {
  const file: File = formData.get("file") as File;
  const inputString: string = await file.text();
  const data = readRawData(inputString);

  const result = runBruteForce(data);

  const coordinates = formatCoordinates(
    data.matrix.length,
    data.matrix[0].length,
    result.maxCoordinate
  );

  const styleArr = Array.from(Array(data.matrix.length), () =>
    Array(data.matrix[0].length).fill(0)
  );

  for (let i = 0; i < coordinates.length; i++) {
    styleArr[coordinates[i].x][coordinates[i].y] = 1;
    if (!i) continue;

    if (i % 2 != 0) {
      let maxIndex = Math.max(coordinates[i].x, coordinates[i - 1].x);
      let minIndex = Math.min(coordinates[i].x, coordinates[i - 1].x);

      for (let j = minIndex + 1; j < maxIndex; j++) {
        styleArr[j][coordinates[i].y] = 2;
      }
    } else {
      let maxIndex = Math.max(coordinates[i].y, coordinates[i - 1].y);
      let minIndex = Math.min(coordinates[i].y, coordinates[i - 1].y);

      for (let j = minIndex + 1; j < maxIndex; j++) {
        styleArr[coordinates[i].x][j] = 3;
      }
    }
  }

  revalidatePath("/");

  return {
    maxPoint: result.maxPoint,
    runTime: result.runTime,
    matrix: data.matrix,
    coordinates: coordinates,
    styleArr: styleArr,
  };
}
