"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  Cpu,
  Headphones,
  Keyboard,
  Laptop,
  Lightbulb,
  Monitor,
  Mouse,
  PlugZap,
  Smartphone,
  Speaker,
  Usb,
  type LucideIcon,
} from "lucide-react";
import styles from "./page.module.css";

type ProjectIconEntry = {
  Icon: LucideIcon;
  left: number;
  top: number;
  size: number;
  drift: "floatProjectIconA" | "floatProjectIconB" | "floatProjectIconC";
  delay: string;
};

const placements: ProjectIconEntry[] = [
  { Icon: Lightbulb, left: 8, top: 12, size: 52, drift: "floatProjectIconA", delay: "-1s" },
  { Icon: Monitor, left: 26, top: 8, size: 50, drift: "floatProjectIconB", delay: "-4s" },
  { Icon: Laptop, left: 51, top: 12, size: 58, drift: "floatProjectIconC", delay: "-2s" },
  { Icon: Mouse, left: 73, top: 19, size: 42, drift: "floatProjectIconA", delay: "-7s" },
  { Icon: Cpu, left: 88, top: 13, size: 48, drift: "floatProjectIconB", delay: "-9s" },
  { Icon: Usb, left: 12, top: 36, size: 44, drift: "floatProjectIconC", delay: "-5s" },
  { Icon: Smartphone, left: 36, top: 34, size: 52, drift: "floatProjectIconA", delay: "-3s" },
  { Icon: PlugZap, left: 62, top: 39, size: 46, drift: "floatProjectIconB", delay: "-8s" },
  { Icon: Headphones, left: 82, top: 37, size: 54, drift: "floatProjectIconC", delay: "-11s" },
  { Icon: Speaker, left: 6, top: 59, size: 46, drift: "floatProjectIconA", delay: "-6s" },
  { Icon: Keyboard, left: 30, top: 63, size: 58, drift: "floatProjectIconB", delay: "-10s" },
  { Icon: Lightbulb, left: 54, top: 56, size: 42, drift: "floatProjectIconC", delay: "-12s" },
  { Icon: Cpu, left: 76, top: 65, size: 44, drift: "floatProjectIconA", delay: "-4s" },
  { Icon: Laptop, left: 17, top: 82, size: 56, drift: "floatProjectIconB", delay: "-13s" },
  { Icon: Mouse, left: 44, top: 78, size: 40, drift: "floatProjectIconC", delay: "-2s" },
  { Icon: Usb, left: 67, top: 84, size: 42, drift: "floatProjectIconA", delay: "-14s" },
  { Icon: Headphones, left: 91, top: 77, size: 50, drift: "floatProjectIconB", delay: "-15s" },
];

const mobilePlacements: ProjectIconEntry[] = [
  { Icon: Lightbulb, left: 11, top: 12, size: 28, drift: "floatProjectIconA", delay: "-1s" },
  { Icon: Monitor, left: 39, top: 9, size: 28, drift: "floatProjectIconB", delay: "-4s" },
  { Icon: Laptop, left: 70, top: 13, size: 30, drift: "floatProjectIconC", delay: "-2s" },
  { Icon: Mouse, left: 91, top: 24, size: 24, drift: "floatProjectIconA", delay: "-7s" },
  { Icon: Cpu, left: 18, top: 30, size: 26, drift: "floatProjectIconB", delay: "-9s" },
  { Icon: Usb, left: 50, top: 31, size: 24, drift: "floatProjectIconC", delay: "-5s" },
  { Icon: Smartphone, left: 79, top: 39, size: 28, drift: "floatProjectIconA", delay: "-3s" },
  { Icon: PlugZap, left: 9, top: 49, size: 25, drift: "floatProjectIconB", delay: "-8s" },
  { Icon: Headphones, left: 38, top: 55, size: 29, drift: "floatProjectIconC", delay: "-11s" },
  { Icon: Speaker, left: 68, top: 57, size: 25, drift: "floatProjectIconA", delay: "-6s" },
  { Icon: Keyboard, left: 91, top: 65, size: 30, drift: "floatProjectIconB", delay: "-10s" },
  { Icon: Lightbulb, left: 18, top: 73, size: 24, drift: "floatProjectIconC", delay: "-12s" },
  { Icon: Cpu, left: 49, top: 78, size: 25, drift: "floatProjectIconA", delay: "-4s" },
  { Icon: Laptop, left: 78, top: 82, size: 30, drift: "floatProjectIconB", delay: "-13s" },
  { Icon: Mouse, left: 10, top: 91, size: 23, drift: "floatProjectIconC", delay: "-2s" },
  { Icon: Usb, left: 60, top: 93, size: 24, drift: "floatProjectIconA", delay: "-14s" },
  { Icon: Headphones, left: 92, top: 92, size: 27, drift: "floatProjectIconB", delay: "-15s" },
];

export function FloatingProjectIcons() {
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
      setIsMobile(width <= 1100);
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
          key: `${index}-${placement.left}-${placement.top}`,
          className: `${styles.floatingProjectIcon} ${styles[placement.drift]}`,
          style: {
            "--left": `${placement.left}%`,
            "--top": `${placement.top}%`,
            "--size": `${placement.size}px`,
            "--repel-x": `${repelX}px`,
            "--repel-y": `${repelY}px`,
            "--delay": placement.delay,
          } as CSSProperties,
          size: placement.size,
        };
      }),
    [cursor, isMobile, viewport],
  );

  return (
    <div className={styles.floatingProjectIcons} aria-hidden="true">
      {items.map(({ Icon, key, className, style, size }) => (
        <span key={key} className={className} style={style}>
          <Icon size={size} />
        </span>
      ))}
    </div>
  );
}
