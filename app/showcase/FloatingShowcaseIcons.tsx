"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  Award,
  BadgeCheck,
  GraduationCap,
  Medal,
  Sparkles,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import styles from "./page.module.css";

type ShowcaseIconEntry = {
  Icon: LucideIcon;
  left: number;
  top: number;
  size: number;
  drift: "floatShowcaseA" | "floatShowcaseB" | "floatShowcaseC";
  delay: string;
};

const placements: ShowcaseIconEntry[] = [
  { Icon: Trophy, left: 7, top: 10, size: 50, drift: "floatShowcaseA", delay: "-1s" },
  { Icon: Award, left: 24, top: 7, size: 46, drift: "floatShowcaseB", delay: "-4s" },
  { Icon: BadgeCheck, left: 48, top: 11, size: 54, drift: "floatShowcaseC", delay: "-2s" },
  { Icon: Medal, left: 71, top: 16, size: 42, drift: "floatShowcaseA", delay: "-7s" },
  { Icon: Star, left: 89, top: 9, size: 48, drift: "floatShowcaseB", delay: "-9s" },
  { Icon: GraduationCap, left: 10, top: 34, size: 44, drift: "floatShowcaseC", delay: "-5s" },
  { Icon: Sparkles, left: 34, top: 32, size: 50, drift: "floatShowcaseA", delay: "-3s" },
  { Icon: Trophy, left: 58, top: 37, size: 46, drift: "floatShowcaseB", delay: "-8s" },
  { Icon: Award, left: 81, top: 35, size: 52, drift: "floatShowcaseC", delay: "-11s" },
  { Icon: BadgeCheck, left: 5, top: 57, size: 44, drift: "floatShowcaseA", delay: "-6s" },
  { Icon: Medal, left: 28, top: 61, size: 56, drift: "floatShowcaseB", delay: "-10s" },
  { Icon: Star, left: 53, top: 55, size: 40, drift: "floatShowcaseC", delay: "-12s" },
  { Icon: GraduationCap, left: 75, top: 63, size: 44, drift: "floatShowcaseA", delay: "-4s" },
  { Icon: Sparkles, left: 16, top: 80, size: 54, drift: "floatShowcaseB", delay: "-13s" },
  { Icon: Trophy, left: 42, top: 77, size: 40, drift: "floatShowcaseC", delay: "-2s" },
  { Icon: Award, left: 66, top: 83, size: 42, drift: "floatShowcaseA", delay: "-14s" },
  { Icon: BadgeCheck, left: 90, top: 76, size: 48, drift: "floatShowcaseB", delay: "-15s" },
];

const mobilePlacements: ShowcaseIconEntry[] = [
  { Icon: Trophy, left: 10, top: 11, size: 26, drift: "floatShowcaseA", delay: "-1s" },
  { Icon: Award, left: 38, top: 8, size: 26, drift: "floatShowcaseB", delay: "-4s" },
  { Icon: BadgeCheck, left: 68, top: 12, size: 28, drift: "floatShowcaseC", delay: "-2s" },
  { Icon: Medal, left: 90, top: 22, size: 24, drift: "floatShowcaseA", delay: "-7s" },
  { Icon: Star, left: 16, top: 29, size: 25, drift: "floatShowcaseB", delay: "-9s" },
  { Icon: GraduationCap, left: 48, top: 30, size: 26, drift: "floatShowcaseC", delay: "-5s" },
  { Icon: Sparkles, left: 78, top: 38, size: 28, drift: "floatShowcaseA", delay: "-3s" },
  { Icon: Trophy, left: 8, top: 48, size: 24, drift: "floatShowcaseB", delay: "-8s" },
  { Icon: Award, left: 36, top: 54, size: 28, drift: "floatShowcaseC", delay: "-11s" },
  { Icon: BadgeCheck, left: 66, top: 56, size: 24, drift: "floatShowcaseA", delay: "-6s" },
  { Icon: Medal, left: 90, top: 64, size: 28, drift: "floatShowcaseB", delay: "-10s" },
  { Icon: Star, left: 18, top: 72, size: 24, drift: "floatShowcaseC", delay: "-12s" },
  { Icon: GraduationCap, left: 48, top: 77, size: 26, drift: "floatShowcaseA", delay: "-4s" },
  { Icon: Sparkles, left: 76, top: 81, size: 28, drift: "floatShowcaseB", delay: "-13s" },
  { Icon: Trophy, left: 10, top: 90, size: 23, drift: "floatShowcaseC", delay: "-2s" },
  { Icon: Award, left: 58, top: 92, size: 24, drift: "floatShowcaseA", delay: "-14s" },
  { Icon: BadgeCheck, left: 90, top: 91, size: 26, drift: "floatShowcaseB", delay: "-15s" },
];

export function FloatingShowcaseIcons() {
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
          className: `${styles.floatingShowcaseIcon} ${styles[placement.drift]}`,
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
    <div className={styles.floatingShowcaseIcons} aria-hidden="true">
      {items.map(({ Icon, key, className, style, size }) => (
        <span key={key} className={className} style={style}>
          <Icon size={size} />
        </span>
      ))}
    </div>
  );
}
