import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import RevealElement from "../RevealElement";

const HeaderOld = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.25]);
  return (
    <header className="relative mt-6 lg:mt-20 lg:mb-10 h-[calc(100vh-150px)] bg-zinc-800 flex justify-center">
      <div className="lg:max-w-6xl">
        <div className="grid grid-cols-2 gap-8">
          <div className="relative lg:mt-10">
            <div className="absolute left-14 bg-sky-300 max-w-[calc(100vw-50px)] skew-4 lg:max-w-[350px] mx-auto flex h-[calc(100vh-150px)] flex-col grow w-full overflow-hidden rounded-b-3xl rounded-t-3xl"></div>
            <div className="absolute right-10 top-5 bg-sky-300/40 scale-90 max-w-[calc(100vw-50px)] -skew-4 lg:max-w-[350px] mx-auto flex h-[calc(100vh-150px)] flex-col grow w-full overflow-hidden rounded-b-3xl rounded-t-3xl"></div>
            <div className="relative max-w-[calc(100vw-50px)] lg:skew-0 lg:max-w-[380px] mx-auto flex h-[calc(100vh-150px)] flex-col grow w-full overflow-hidden rounded-3xl shadow-xl">
              <motion.img
                style={{ scale }}
                className="absolute w-full h-full object-cover"
                src="/my-photo-2.jpg"
                alt=""
              />
              {/* Overlay */}
              <div className="absolute top-0 h-1/2 w-full bg-linear-to-b from-sky-300/50 to-ransparent"></div>
              <div className="absolute bottom-0 h-full w-full bg-linear-to-t from-black/90 to-ransparent"></div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8">
            <RevealElement>
              <h2 className="text-5xl/snug text-white text-shadow font-bold capitalize">
                Senior Full‑Stack Engineer & UX/UI Designer
              </h2>
            </RevealElement>
            <RevealElement>
              <h2 className="text-lg text-slate-300 text-shadow">
                I design and engineer high‑quality digital products that scale —
                combining strategy, design excellence, and robust software
                architecture.
              </h2>
            </RevealElement>
            <div className="shrink-0">
              <a
                href={"#"}
                className={
                  "px-4 py-3 font-semibold text-white dark:text-zinc-700 duration-150 bg-sky-300 rounded-full hover:text-white active:brightness-90 transition-all hover:border hover:bg-white/10"
                }
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOld;
