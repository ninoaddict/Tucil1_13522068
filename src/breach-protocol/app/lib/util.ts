export function readRawData(rawData: string) {
  // const arr = rawData.split(/\r|\n| /);
  try {
    const arr = rawData.split("\r");
    const filteredArr = arr.map((val) => val.replace(/\n/g, ""));

    const bufferSize: number = parseInt(filteredArr[0]);
    const matrixSize = filteredArr[1].split(/\s+/);
    const col = parseInt(matrixSize[0]);
    const row = parseInt(matrixSize[1]);

    const matrix = [];
    const sequences = [];
    const rewards = [];
    let currIdx: number = 2;

    for (let i = 0; i < row; i++) {
      const currRow = filteredArr[currIdx].split(/\s+/);
      matrix.push(currRow);
      currIdx++;
    }

    const numberOfSequence = parseInt(filteredArr[currIdx]);
    currIdx++;

    for (let i = 0; i < numberOfSequence; i++) {
      const currSequence = filteredArr[currIdx].replace(/\s/g, "");
      sequences.push(currSequence);
      currIdx++;

      const reward = parseInt(filteredArr[currIdx]);
      rewards.push(reward);
      currIdx++;
    }

    return {
      bufferSize,
      matrix,
      sequences,
      rewards,
    };
  } catch (error) {
    return null;
  }
}

export function getIndex(i: number, j: number, col: number) {
  return i * col + j;
}

export function getRowFromIndex(i: number, row: number) {
  return Math.floor(i / row);
}

export function getColFromIndex(i: number, col: number) {
  return i % col;
}

export function random(lowerbound: number, upperbound: number) {
  return Math.floor(Math.random() * (upperbound - lowerbound)) + lowerbound;
}

export function getPoint(
  token: string,
  sequences: string[],
  rewards: number[]
) {
  let points = 0;
  for (let i = 0; i < sequences.length; i++) {
    if (token.includes(sequences[i])) {
      points += rewards[i];
    }
  }

  return points;
}

export function formatCoordinates(
  row: number,
  col: number,
  coordinates: number[]
) {
  const res = [];

  for (let i = 0; i < coordinates.length; i++) {
    res.push({
      x: getRowFromIndex(coordinates[i], row),
      y: getColFromIndex(coordinates[i], col),
    });
  }

  return res;
}

export function convertDataToString(
  maxPoint: number,
  coordinates: { x: number; y: number }[],
  matrix: string[][],
  runTime: number
) {
  let res: string = "";
  res += maxPoint.toString();
  res += "\n";
  for (let i = 0; i < coordinates.length; i++) {
    res += matrix[coordinates[i].x][coordinates[i].y];
    if (i != coordinates.length - 1) {
      res += " ";
    }
  }
  if (coordinates.length > 0) res += "\n";

  for (let i = 0; i < coordinates.length; i++) {
    res += (coordinates[i].y + 1).toString();
    res += ", ";
    res += (coordinates[i].x + 1).toString();
    res += "\n";
  }
  if (coordinates.length > 0) res += "\n";
  res += runTime.toFixed(2).toString();
  res += " ms";
  return res;
}
