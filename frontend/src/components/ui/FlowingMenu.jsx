import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

function FlowingMenu({
  items = [],
  speed = 10,
  textColor = "#fff",
  bgColor = "#000",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#fff",
  borderColor = "#fff",
}) {
  return (
    <div className="w-full h-full overflow-hidden bg-transparent" >
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
}) {
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  /* =========================
     Calculate repetitions
  ========================= */
  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector(".marquee-part");
      if (!part) return;

      const contentWidth = part.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;

      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [text, image]);

  /* =========================
     Auto-running marquee
  ========================= */
  useEffect(() => {
    if (!marqueeInnerRef.current) return;

    const part = marqueeInnerRef.current.querySelector(".marquee-part");
    if (!part) return;

    const contentWidth = part.offsetWidth;
    if (!contentWidth) return;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.to(marqueeInnerRef.current, {
      x: -contentWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [repetitions, speed]);

  return (
    <div
      className="flex-1 relative overflow-hidden text-center"
      style={{ borderTop: isFirst ? "none" : `1px solid ${borderColor}` }}
    >
      {/* Static center text */}
      <a
        href={link}
        className="flex items-center justify-center h-full uppercase font-semibold text-[4vh]"
        style={{ color: textColor }}
      >
        {text}
      </a>

      {/* Always-visible marquee */}
      {/* Always-visible marquee */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none
             bg-black/20 backdrop-blur-xl"
      >
        <div className="h-full w-fit flex" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div
              key={idx}
              className="marquee-part flex items-center shrink-0"
              style={{ color: marqueeTextColor }}
            >
              <span className="whitespace-nowrap uppercase font-normal text-[4vh] leading-none px-[1vw]">
                {text}
              </span>
              <div
                className="w-50 h-[5vh] my-[2em] mx-[2vw] py-[1em] rounded-[50px]
                     bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default FlowingMenu;
