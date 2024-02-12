"use server";

import runBruteForce from "./bruteforce";
import { readRawData } from "./util";
import { random } from "./util";

export async function getResultFromFile(formData: FormData) {
  const file: File = formData.get("file") as File;
  const inputString: string = await file.text();
  const data = readRawData(inputString);

  if (!data) {
    return { errorMsg: "Wrong input format" };
  }

  const result = runBruteForce(data);

  const coordinates = result.maxCoordinate;

  /* 
  style
  0: nostyle
  1: chosen
  2: top
  3: bottom
  4: left
  5: right
  */

  const styleArr = Array.from(Array(data.matrix.length), () =>
    Array(data.matrix[0].length).fill(0)
  );

  const vertical = Array.from(Array(data.matrix.length), () =>
    Array(data.matrix[0].length).fill(false)
  );

  const horizontal = Array.from(Array(data.matrix.length), () =>
    Array(data.matrix[0].length).fill(false)
  );

  for (let i = 0; i < coordinates.length; i++) {
    styleArr[coordinates[i].x][coordinates[i].y] = 1;
    if (!i) continue;

    if (i % 2 != 0) {
      let maxIndex = Math.max(coordinates[i].x, coordinates[i - 1].x);
      let minIndex = Math.min(coordinates[i].x, coordinates[i - 1].x);

      for (let j = minIndex + 1; j < maxIndex; j++) {
        vertical[j][coordinates[i].y] = true;
      }

      if (maxIndex === minIndex + 1) {
        if (coordinates[i].x > coordinates[i - 1].x) {
          styleArr[coordinates[i].x][coordinates[i].y] = 2;
        } else {
          styleArr[coordinates[i].x][coordinates[i].y] = 3;
        }
      }
    } else {
      let maxIndex = Math.max(coordinates[i].y, coordinates[i - 1].y);
      let minIndex = Math.min(coordinates[i].y, coordinates[i - 1].y);

      for (let j = minIndex + 1; j < maxIndex; j++) {
        horizontal[coordinates[i].x][j] = true;
      }

      if (maxIndex === minIndex + 1) {
        if (coordinates[i].y > coordinates[i - 1].y) {
          styleArr[coordinates[i].x][coordinates[i].y] = 4;
        } else {
          styleArr[coordinates[i].x][coordinates[i].y] = 5;
        }
      }
    }
  }

  const sequences: string[][] = [];

  for (let i = 0; i < data.sequences.length; i++) {
    let temp: string[] = data.sequences[i].split(/\s+/);
    sequences.push(temp);
  }

  return {
    maxPoint: result.maxPoint,
    runTime: result.runTime,
    matrix: data.matrix,
    coordinates: coordinates,
    styleArr: styleArr,
    rewards: data.rewards,
    sequences,
    vertical,
    horizontal,
    errorMsg: "",
  };
}

export async function getRandomResult(formData: FormData) {
  const row = formData.get("row") as unknown as number;
  const col = formData.get("column") as unknown as number;
  const bufferSize = formData.get("buffer") as unknown as number;
  const numberOfSequence = formData.get("sequenceNumber") as unknown as number;
  const maxSequenceLength = formData.get(
    "maxSequenceLength"
  ) as unknown as number;
  const tokenNumber = formData.get("tokenNumber") as unknown as number;
  const rawTokens = formData.get("tokens") as unknown as string;
  const tokens: string[] = rawTokens.trim().split(/\s+/);

  if (tokens.length != tokenNumber) {
    return { errorMsg: "Token length is incorrect" };
  }

  // generate random sequences and rewards
  const sequences: string[] = [];
  const rewards: number[] = [];

  for (let i = 0; i < numberOfSequence; i++) {
    let isContinue = false;
    // prevent impossible permutation
    let cnt = 0;

    while (!isContinue && cnt < 1000) {
      // generate random sequence length
      const rdLen = random(2, maxSequenceLength);
      let temp = "";
      for (let j = 0; j < rdLen; j++) {
        // generate random token index
        const rdIndex = random(0, tokenNumber - 1);
        temp += tokens[rdIndex];
        if (j != rdLen - 1) {
          temp += " ";
        }
      }

      // if temp has been added before
      if (!sequences.includes(temp)) {
        isContinue = true;

        // generate random rewards
        const reward: number = random(0, 1000);

        rewards.push(reward);
        sequences.push(temp);
      }
      cnt++;
    }

    if (cnt === 1000) {
      // handle impossible permutation
      return { errorMsg: "Fail to randomize sequences" };
    }
  }

  // generate random matrix content
  const matrix: string[][] = [];

  for (let i = 0; i < row; i++) {
    const temp = [];
    for (let j = 0; j < col; j++) {
      let rnIndex: number = random(0, tokenNumber - 1);
      temp.push(tokens[rnIndex]);
    }
    matrix.push(temp);
  }

  const data = {
    bufferSize,
    matrix,
    sequences,
    rewards,
  };

  const result = runBruteForce(data);

  const coordinates = result.maxCoordinate;
  const styleArr = Array.from(Array(data.matrix.length), () =>
    Array(data.matrix[0].length).fill(0)
  );

  const vertical = Array.from(Array(data.matrix.length), () =>
    Array(data.matrix[0].length).fill(false)
  );

  const horizontal = Array.from(Array(data.matrix.length), () =>
    Array(data.matrix[0].length).fill(false)
  );

  for (let i = 0; i < coordinates.length; i++) {
    styleArr[coordinates[i].x][coordinates[i].y] = 1;
    if (!i) continue;

    if (i % 2 != 0) {
      let maxIndex = Math.max(coordinates[i].x, coordinates[i - 1].x);
      let minIndex = Math.min(coordinates[i].x, coordinates[i - 1].x);

      for (let j = minIndex + 1; j < maxIndex; j++) {
        vertical[j][coordinates[i].y] = true;
      }

      if (maxIndex === minIndex + 1) {
        if (coordinates[i].x > coordinates[i - 1].x) {
          styleArr[coordinates[i].x][coordinates[i].y] = 2;
        } else {
          styleArr[coordinates[i].x][coordinates[i].y] = 3;
        }
      }
    } else {
      let maxIndex = Math.max(coordinates[i].y, coordinates[i - 1].y);
      let minIndex = Math.min(coordinates[i].y, coordinates[i - 1].y);

      for (let j = minIndex + 1; j < maxIndex; j++) {
        horizontal[coordinates[i].x][j] = true;
      }

      if (maxIndex === minIndex + 1) {
        if (coordinates[i].y > coordinates[i - 1].y) {
          styleArr[coordinates[i].x][coordinates[i].y] = 4;
        } else {
          styleArr[coordinates[i].x][coordinates[i].y] = 5;
        }
      }
    }
  }

  const resultSequence: string[][] = [];
  for (let i = 0; i < sequences.length; i++) {
    let temp: string[] = sequences[i].split(/\s+/);
    resultSequence.push(temp);
  }

  return {
    maxPoint: result.maxPoint,
    runTime: result.runTime,
    matrix: data.matrix,
    coordinates: coordinates,
    styleArr: styleArr,
    sequences: resultSequence,
    rewards: data.rewards,
    horizontal,
    vertical,
    errorMsg: "",
  };
}
