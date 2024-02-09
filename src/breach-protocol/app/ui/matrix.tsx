import { orbitron } from "./font";

export default function Matrix({
  matrix,
  styleArr,
  coordinates,
}: {
  matrix: string[][];
  styleArr: any[][];
  coordinates: { x: number; y: number }[];
}) {
  return (
    <div className="flex flex-col items-center gap-2 md:items-end">
      {matrix.map((row, i) => (
        <ul key={i} className="flex flex-nowrap gap-2">
          {row.map((col, j) => (
            <li key={j} className="list-none">
              <div
                className={`${
                  orbitron.className
                } px-1 m-0 text-xl text-onBackground h-11 w-12 flex items-center justify-center relative ${
                  styleArr[i][j] === 1
                    ? "border-2 border-secondary rounded-sm"
                    : ""
                }`}
              >
                {matrix[i][j]}
                {styleArr[i][j] === 2 && (
                  <div className="w-1 h-[60px] my-auto bg-secondary border-0 md:mx-10 absolute"></div>
                )}
                {styleArr[i][j] === 3 ? (
                  <hr className="w-[62px] h-1 mx-auto bg-secondary border-0 md:my-10 absolute"></hr>
                ) : null}
                {i > 0 &&
                  styleArr[i - 1][j] === 1 &&
                  styleArr[i][j] === 1 &&
                  ((i != coordinates[coordinates.length - 1].x &&
                    j != coordinates[coordinates.length - 1].y) ||
                    (i - 1 === coordinates[coordinates.length - 2].x &&
                      j === coordinates[coordinates.length - 2].y)) && (
                    <div className="w-1 h-[8px] top-[-10px] bg-secondary border-0 md:mx-10 absolute"></div>
                  )}
                {j > 0 &&
                  styleArr[i][j - 1] == 1 &&
                  styleArr[i][j] == 1 &&
                  ((i != coordinates[coordinates.length - 1].x &&
                    j != coordinates[coordinates.length - 1].y) ||
                    (i === coordinates[coordinates.length - 2].x &&
                      j - 1 === coordinates[coordinates.length - 2].y)) && (
                    <hr className="w-[8px] h-1 left-[-10px] bg-secondary border-0 md:my-10 absolute"></hr>
                  )}
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
