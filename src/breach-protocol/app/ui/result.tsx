import { uuid } from "uuidv4";
import DownloadButton from "./download-button";
import { orbitron } from "./font";
import { ResultData } from "./game";
import Matrix from "./matrix";

export default function Result({ data }: { data: ResultData }) {
  const {
    maxPoint,
    runTime,
    matrix,
    coordinates,
    styleArr,
    sequences,
    vertical,
    horizontal,
    rewards,
  } = data;
  return (
    <section className="mt-12 md:mt-16 flex flex-col mb-9 md:mb-12 lg:mb-16">
      <div className="flex justify-center mb-4 md:mb-8">
        <h1
          className={`${orbitron.className} text-onBackground font-semibold md:text-5xl text-3xl sm:text-4xl mb-3`}
        >
          RESULT
        </h1>
      </div>
      <div
        className={`${
          orbitron.className
        } flex flex-col items-center gap-6 md:gap-12 ${
          matrix[0].length <= 10
            ? "lg:flex-row lg:items-start lg:justify-center"
            : ""
        }`}
      >
        <div className="md:w-1/2">
          <Matrix
            matrix={matrix}
            styleArr={styleArr}
            vertical={vertical}
            horizontal={horizontal}
          />
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-auto-auto gap-1.5 sm:gap-2 md:gap-2.5 max-w-80 md:max-w-none pt-2">
            <div
              className={`${orbitron.className} text-secondary font-semibold text-md sm:text-lg`}
            >
              Max Point
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
            >
              {coordinates.length > 0 ? maxPoint : "No Solution Exist"}
            </div>
            <div
              className={`${orbitron.className} text-secondary font-semibold text-md sm:text-lg`}
            >
              Run Time
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
            >
              {runTime.toFixed(2)} ms
            </div>
            <div
              className={`${orbitron.className} text-secondary font-semibold text-md sm:text-lg`}
            >
              Sequences
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
            >
              <span>
                {sequences.map((row, i) => {
                  return (
                    <div key={i}>
                      {row.map((col, j) => {
                        return <span key={j}>{sequences[i][j] + " "}</span>;
                      })}
                    </div>
                  );
                })}
              </span>
            </div>
            <div
              className={`${orbitron.className} text-secondary font-semibold text-md sm:text-lg`}
            >
              Rewards
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
            >
              <span>
                {sequences.map((row, i) => {
                  return <div key={i}>{rewards[i]}</div>;
                })}
              </span>
            </div>
            {coordinates.length > 0 && (
              <>
                <div
                  className={`${orbitron.className} text-secondary font-semibold text-md sm:text-lg`}
                >
                  Optimal Sequence
                </div>
                <div
                  className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
                >
                  :
                </div>
                <div
                  className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
                >
                  {coordinates.map(
                    (coordinate) =>
                      `${matrix[coordinate.x][coordinate.y]}` + " "
                  )}
                </div>
                <div
                  className={`${orbitron.className} text-secondary font-semibold text-md sm:text-lg`}
                >
                  Optimal Coordinate
                </div>
                <div
                  className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
                >
                  :
                </div>
                <div
                  className={`${orbitron.className} text-onBackground font-semibold text-md sm:text-lg`}
                >
                  <span>
                    {coordinates.map((coordinate, i) => (
                      <div key={i}>
                        <span>{"("}</span>
                        <span className="inline-flex justify-center w-4">
                          {coordinate.y + 1}
                        </span>
                        <span>{", "}</span>
                        <span className="inline-flex justify-center w-4">
                          {coordinate.x + 1}
                        </span>
                        <span>{")"}</span>
                      </div>
                    ))}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center lg:mt-7 md:mt-5 mt-3 ${
          matrix[0].length > 10 ? "" : "lg:justify-end"
        }`}
      >
        <DownloadButton data={data} />
      </div>
    </section>
  );
}
