"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
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

export function FloatingSocialIcons() {
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      setCursor({ x: event.clientX, y: event.clientY });
    }

    function handleResize() {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResize();
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = useMemo(
    () =>
      placements.map((placement, index) => {
        const x = (placement.left / 100) * viewport.width;
        const y = (placement.top / 100) * viewport.height;
        const dx = x - cursor.x;
        const dy = y - cursor.y;
        const distance = Math.hypot(dx, dy);
        const strength = Math.max(0, 1 - distance / 220);
        const repelX = strength ? (dx / Math.max(distance, 1)) * 90 * strength : 0;
        const repelY = strength ? (dy / Math.max(distance, 1)) * 90 * strength : 0;

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
    [cursor, viewport],
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
