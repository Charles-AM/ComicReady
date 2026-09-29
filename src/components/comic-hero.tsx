'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useSpring } from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';

export function ComicHero({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 65, damping: 24 });
  const y = useSpring(0, { stiffness: 65, damping: 24 });
  const tilt = useSpring(0, { stiffness: 65, damping: 24 });

  function move(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    x.set(horizontal * -18);
    y.set(vertical * -12);
    tilt.set(horizontal * 1.2);
  }

  function reset() {
    x.set(0);
    y.set(0);
    tilt.set(0);
  }

  return <section className="hero comic-world" aria-labelledby="hero-title" onPointerMove={move} onPointerLeave={reset}>
    <div className="comic-world-art" aria-hidden="true">
      <motion.div className="comic-world-plane" style={{ x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y, rotateY: reducedMotion ? 0 : tilt }}>
        <Image src="/art/comic-world-v1.png" alt="" fill sizes="(max-width: 1296px) 100vw, 1296px" preload className="comic-world-image" />
      </motion.div>
    </div>
    <div className="comic-world-shade" aria-hidden="true" />
    {children}
    <div className="world-caption" aria-hidden="true"><span>EVERY GREAT COMIC STARTS SOMEWHERE.</span><strong>YOURS GOES NEXT. ↗</strong></div>
  </section>;
}
