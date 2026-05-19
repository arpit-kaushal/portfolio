"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "../../components/SocialIcons";
import styles from "./page.module.css";

type IconEntry = {
  Icon: typeof XIcon;
  left: number;
  top: number;
  size: number;
  drift: "floatIconA" | "floatIconB" | "floatIconC";
  delay: string;
};

const iconCycle = [XIcon, LinkedInIcon, GitHubIcon, InstagramIcon, FacebookIcon] as const;

const placements: IconEntry[] = [
  { Icon: iconCycle[0], left: 7, top: 12, size: 44, drift: "floatIconA", delay: "-1s" },
  { Icon: iconCycle[1], left: 22, top: 8, size: 38, drift: "floatIconB", delay: "-4s" },
  { Icon: iconCycle[2], left: 48, top: 11, size: 42, drift: "floatIconC", delay: "-2s" },
  { Icon: iconCycle[3], left: 72, top: 18, size: 40, drift: "floatIconA", delay: "-7s" },
  { Icon: iconCycle[4], left: 88, top: 14, size: 36, drift: "floatIconB", delay: "-9s" },
  { Icon: iconCycle[0], left: 12, top: 38, size: 40, drift: "floatIconC", delay: "-5s" },
  { Icon: iconCycle[1], left: 38, top: 34, size: 46, drift: "floatIconA", delay: "-3s" },
  { Icon: iconCycle[2], left: 62, top: 40, size: 38, drift: "floatIconB", delay: "-8s" },
  { Icon: iconCycle[3], left: 82, top: 36, size: 44, drift: "floatIconC", delay: "-11s" },
  { Icon: iconCycle[4], left: 5, top: 58, size: 42, drift: "floatIconA", delay: "-6s" },
  { Icon: iconCycle[0], left: 28, top: 62, size: 36, drift: "floatIconB", delay: "-10s" },
  { Icon: iconCycle[1], left: 52, top: 56, size: 40, drift: "floatIconC", delay: "-12s" },
  { Icon: iconCycle[2], left: 76, top: 64, size: 38, drift: "floatIconA", delay: "-4s" },
  { Icon: iconCycle[3], left: 18, top: 82, size: 44, drift: "floatIconB", delay: "-13s" },
  { Icon: iconCycle[4], left: 44, top: 78, size: 40, drift: "floatIconC", delay: "-2s" },
  { Icon: iconCycle[0], left: 68, top: 84, size: 36, drift: "floatIconA", delay: "-14s" },
  { Icon: iconCycle[1], left: 92, top: 76, size: 42, drift: "floatIconB", delay: "-15s" },
];

const mobilePlacements: IconEntry[] = [
  { Icon: iconCycle[0], left: 12, top: 13, size: 26, drift: "floatIconA", delay: "-1s" },
  { Icon: iconCycle[1], left: 38, top: 9, size: 24, drift: "floatIconB", delay: "-4s" },
  { Icon: iconCycle[2], left: 68, top: 12, size: 26, drift: "floatIconC", delay: "-2s" },
  { Icon: iconCycle[3], left: 89, top: 24, size: 24, drift: "floatIconA", delay: "-7s" },
  { Icon: iconCycle[4], left: 18, top: 30, size: 23, drift: "floatIconB", delay: "-9s" },
  { Icon: iconCycle[0], left: 49, top: 29, size: 25, drift: "floatIconC", delay: "-5s" },
  { Icon: iconCycle[1], left: 79, top: 39, size: 27, drift: "floatIconA", delay: "-3s" },
  { Icon: iconCycle[2], left: 10, top: 48, size: 24, drift: "floatIconB", delay: "-8s" },
  { Icon: iconCycle[3], left: 36, top: 55, size: 26, drift: "floatIconC", delay: "-11s" },
  { Icon: iconCycle[4], left: 65, top: 57, size: 25, drift: "floatIconA", delay: "-6s" },
  { Icon: iconCycle[0], left: 90, top: 64, size: 23, drift: "floatIconB", delay: "-10s" },
  { Icon: iconCycle[1], left: 17, top: 72, size: 25, drift: "floatIconC", delay: "-12s" },
  { Icon: iconCycle[2], left: 47, top: 78, size: 24, drift: "floatIconA", delay: "-4s" },
  { Icon: iconCycle[3], left: 76, top: 81, size: 26, drift: "floatIconB", delay: "-13s" },
  { Icon: iconCycle[4], left: 9, top: 91, size: 24, drift: "floatIconC", delay: "-2s" },
  { Icon: iconCycle[0], left: 58, top: 93, size: 23, drift: "floatIconA", delay: "-14s" },
  { Icon: iconCycle[1], left: 91, top: 91, size: 25, drift: "floatIconB", delay: "-15s" },
];

export function FloatingSocialIcons() {
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const nextCursor = { x: event.clientX, y: event.clientY };

      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = requestAnimationFrame(() => {
        setCursor(nextCursor);
        frameRef.current = null;
      });
    }

    function handlePointerLeave() {
      setCursor({ x: -9999, y: -9999 });
    }

    function handleResize() {
      const width = window.innerWidth;
      setViewport({ width, height: window.innerHeight });
      setIsMobile(width <= 980);
    }

    handleResize();
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const items = useMemo(
    () =>
      (isMobile ? mobilePlacements : placements).map((placement, index) => {
        const x = (placement.left / 100) * viewport.width;
        const y = (placement.top / 100) * viewport.height;
        const dx = x - cursor.x;
        const dy = y - cursor.y;
        const distance = Math.hypot(dx, dy);
        const strength = isMobile ? 0 : Math.max(0, 1 - distance / 300);
        const safeDistance = Math.max(distance, 1);
        const repelX = strength ? (dx / safeDistance) * 170 * strength : 0;
        const repelY = strength ? (dy / safeDistance) * 170 * strength : 0;

        return {
          Icon: placement.Icon,
          iconSize: placement.size,
          key: `${index}-${placement.left}-${placement.top}`,
          style: {
            "--left": `${placement.left}%`,
            "--top": `${placement.top}%`,
            "--size": `${placement.size}px`,
            "--repel-x": `${repelX}px`,
            "--repel-y": `${repelY}px`,
            "--delay": placement.delay,
          } as CSSProperties,
          driftClass: styles[placement.drift],
        };
      }),
    [cursor, isMobile, viewport],
  );

  return (
    <div className={styles.floatingIcons} aria-hidden="true">
      {items.map(({ Icon, iconSize, key, style, driftClass }) => (
        <span key={key} className={`${styles.floatingIcon} ${driftClass}`} style={style}>
          <Icon size={iconSize} />
        </span>
      ))}
    </div>
  );
}
