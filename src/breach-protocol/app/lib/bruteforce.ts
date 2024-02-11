import { getPoint } from "./util";

export default function runBruteForce(data: {
  bufferSize: number;
  matrix: string[][];
  sequences: string[];
  rewards: number[];
}) {
  // variable declaration
  const { bufferSize, matrix, sequences, rewards } = data;
  const vis = Array.from(Array(matrix.length), () =>
    Array(matrix[0].length).fill(false)
  );
  let maxPoint = 0;
  let maxCoordinate: { x: number; y: number }[] = [];
  let isSolutionFound: boolean = false;

  // function declaration
  function searchOptimalValue(
    row: number,
    col: number,
    coordinates: { x: number; y: number }[],
    direction: boolean,
    token: string,
    steps: number
  ) {
    // init
    coordinates.push({ x: row, y: col });
    vis[row][col] = true;

    // check current point
    let currPoint = getPoint(token, sequences, rewards);
    if (currPoint) {
      if (!isSolutionFound) {
        maxPoint = currPoint;
        maxCoordinate = [...coordinates];
        isSolutionFound = true;
      } else if (
        currPoint === maxPoint &&
        maxCoordinate.length > coordinates.length
      ) {
        maxCoordinate = [...coordinates];
      } else if (currPoint > maxPoint) {
        maxPoint = currPoint;
        maxCoordinate = [...coordinates];
      }
    }

    // check if steps is equal to buffer size
    if (steps < bufferSize) {
      if (direction) {
        for (let i = 0; i < matrix.length; i++) {
          if (!vis[i][col]) {
            searchOptimalValue(
              i,
              col,
              coordinates,
              !direction,
              token + matrix[i][col],
              steps + 1
            );
          }
        }
      } else {
        for (let i = 0; i < matrix[0].length; i++) {
          if (!vis[row][i]) {
            searchOptimalValue(
              row,
              i,
              coordinates,
              !direction,
              token + matrix[row][i],
              steps + 1
            );
          }
        }
      }
    }

    // termination
    coordinates.pop();
    vis[row][col] = false;
    return;
  }

  const startTime = performance.now();

  if (bufferSize > 0 && sequences.length > 0) {
    for (let i = 0; i < matrix[0].length; i++) {
      searchOptimalValue(0, i, [], true, matrix[0][i], 1);
    }
  }

  const endTime = performance.now();
  const runTime = endTime - startTime;

  return { maxPoint, maxCoordinate, runTime };
}
