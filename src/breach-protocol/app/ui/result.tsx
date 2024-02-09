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
        className={`${orbitron.className} flex flex-col md:flex-row items-center gap-6 md:gap-12 md:items-start md:justify-center`}
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
              className={`${orbitron.className} text-secondary font-semibold lg`}
            >
              Max Point
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              {maxPoint}
            </div>
            <div
              className={`${orbitron.className} text-secondary font-semibold lg`}
            >
              Run Time
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              {runTime.toFixed(2)} ms
            </div>
            <div
              className={`${orbitron.className} text-secondary font-semibold lg`}
            >
              Sequences
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
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
              className={`${orbitron.className} text-secondary font-semibold lg`}
            >
              Rewards
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              <span>
                {sequences.map((row, i) => {
                  return <div key={i}>{rewards[i]}</div>;
                })}
              </span>
            </div>
            <div
              className={`${orbitron.className} text-secondary font-semibold lg`}
            >
              Optimal Sequence
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              {coordinates.map(
                (coordinate) => `${matrix[coordinate.x][coordinate.y]}` + " "
              )}
            </div>
            <div
              className={`${orbitron.className} text-secondary font-semibold lg`}
            >
              Optimal Coordinate
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              :
            </div>
            <div
              className={`${orbitron.className} text-onBackground font-semibold lg`}
            >
              <span>
                {coordinates.map(
                  (coordinate) =>
                    `(${coordinate.y + 1}, ${coordinate.x + 1})` + " "
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-end lg:mt-7 md:mt-5 mt-3">
        <DownloadButton data={data} />
      </div>
    </section>
  );
}
