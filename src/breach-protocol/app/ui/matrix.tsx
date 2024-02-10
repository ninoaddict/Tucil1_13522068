import { orbitron } from "./font";

export default function Matrix({
  matrix,
  styleArr,
  vertical,
  horizontal,
}: {
  matrix: string[][];
  styleArr: any[][];
  vertical: boolean[][];
  horizontal: boolean[][];
}) {
  return (
    <div className="flex flex-col items-center md:gap-2 gap-1 lg:items-end">
      {matrix.map((row, i) => (
        <ul key={i} className="flex flex-nowrap md:gap-2 gap-1">
          {row.map((col, j) => (
            <li key={j} className="list-none">
              <div
                className={`${
                  orbitron.className
                } px-1 m-0 text-md sm:text-lg md:text-xl text-onBackground md:h-11 md:w-12 h-8 w-9 flex items-center justify-center relative ${
                  styleArr[i][j] === 1 ||
                  styleArr[i][j] === 2 ||
                  styleArr[i][j] === 3 ||
                  styleArr[i][j] === 4 ||
                  styleArr[i][j] === 5
                    ? "border-2 border-secondary rounded-sm"
                    : ""
                }`}
              >
                {matrix[i][j]}
                {vertical[i][j] && (
                  <div className="w-1 md:h-[60px] h-[40px] my-auto bg-secondary border-0 md:mx-10 absolute"></div>
                )}
                {horizontal[i][j] ? (
                  <hr className="md:w-[62px] w-[43px] h-1 mx-auto bg-secondary border-0 md:my-10 absolute"></hr>
                ) : null}
                {styleArr[i][j] === 2 && (
                  <div className="w-1 md:h-[8px] h-[6px]  top-[-6px] md:top-[-10px] bg-secondary border-0 md:mx-10 absolute"></div>
                )}
                {styleArr[i][j] === 3 && (
                  <div className="w-1 md:h-[8px] h-[6px] bottom-[-6px] md:bottom-[-10px] bg-secondary border-0 md:mx-10 absolute"></div>
                )}
                {styleArr[i][j] === 4 && (
                  <hr className="md:w-[8px] w-[6px] left-[-6px] h-1 md:left-[-10px] bg-secondary border-0 md:my-10 absolute"></hr>
                )}
                {styleArr[i][j] === 5 && (
                  <hr className="md:w-[8px] w-[6px] h-1 right-[-6px] md:right-[-10px] bg-secondary border-0 md:my-10 absolute"></hr>
                )}
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
