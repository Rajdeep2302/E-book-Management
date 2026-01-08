import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DepartmentScroller = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const element = textRef.current;
        const container = containerRef.current;

        if (!element || !container) return;

        const ctx = gsap.context(() => {
            const totalWidth = element.scrollWidth;

            gsap.set(element, { x: 0 });

            gsap.fromTo(
                element,
                { x: 0 },
                {
                    x: -(totalWidth / 2),
                    ease: "none",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    }
                }
            );

        }, container);

        return () => ctx.revert();
    }, []);


    const departments = [
        "PHYSICS", "CHEMISTRY", "MATHEMATICS", "COMPUTER SCIENCE",
        "BOTANY", "ZOOLOGY", "MICROBIOLOGY"
    ];

    const displayItems = [...departments, ...departments, ...departments, ...departments];

    return (
        <div
            ref={containerRef}
            className="w-full h-[30vh] md:h-[40vh] bg-[#030303] overflow-hidden flex items-center relative border-t border-b border-white/5"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />

            <div
                ref={textRef}
                className="flex gap-12 whitespace-nowrap px-4 will-change-transform"
            >
                {displayItems.map((dept, i) => (
                    <span
                        key={i}
                        className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase tracking-tighter hover:from-white/40 hover:to-white/20 transition-all duration-700 cursor-default select-none"
                    >
                        {dept}
                    </span>
                ))}
            </div>

            <div className="
  absolute bottom-4 left-1/2 -translate-x-1/2 z-20
  text-[10px] sm:text-xs font-bold uppercase
  tracking-[0.35em] sm:tracking-[0.5em]
  flex flex-col sm:flex-row
  items-center sm:gap-3 gap-1
">
    <span className="text-white">College of</span>
    <span className="text-blue-500">Science</span>
</div>


        </div>
    );
};

export default DepartmentScroller;