import Image from "next/image";
import Game from "./ui/game";
import { orbitron } from "./ui/font";

export default function Home() {
  return (
    <main className="min-h-screen mx-auto xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] px-4 pt-10">
      <section id="title" className="flex align-center flex-col">
        <div className="glitch-wrapper" data-text="BREACH PROTOCOL SOLVER">
          <h1
            className={`${orbitron.className} text-onBackground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold md:mb-12 mb-9 text-center md:glitch`}
            data-text="BREACH PROTOCOL SOLVER"
          >
            BREACH PROTOCOL SOLVER
          </h1>
        </div>
        <h2
          className={`${orbitron.className} text-secondary text-lg md:text-[22px] font-medium md:mb-12 mb-8 text-center`}
        >
          Cyberpunk 2077 Breach Protocol Solver With Brute Force Algorithm
        </h2>
      </section>
      <Game />
    </main>
  );
}
