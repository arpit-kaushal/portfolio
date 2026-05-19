"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./page.module.css";

const photos = [
  "/about-photo.png",
  "/photo1.png",
  "/photo2.png",
  "/photo3.png",
  "/photo4.png",
  "/photo5.png",
  "/about-float-1.png",
  "/about-float-2.png",
  "/about-float-3.png",
  "/about-float-4.png",
  "/about-float-5.png",
];

const placements = [
  { left: 8, top: 16, size: 72, drift: "floatPhotoA", delay: "-1s" },
  { left: 26, top: 10, size: 62, drift: "floatPhotoB", delay: "-5s" },
  { left: 52, top: 14, size: 68, drift: "floatPhotoC", delay: "-3s" },
  { left: 74, top: 20, size: 58, drift: "floatPhotoA", delay: "-8s" },
  { left: 15, top: 42, size: 66, drift: "floatPhotoC", delay: "-6s" },
  { left: 42, top: 38, size: 56, drift: "floatPhotoB", delay: "-2s" },
  { left: 68, top: 48, size: 70, drift: "floatPhotoA", delay: "-9s" },
  { left: 6, top: 72, size: 58, drift: "floatPhotoB", delay: "-4s" },
  { left: 30, top: 78, size: 68, drift: "floatPhotoC", delay: "-7s" },
  { left: 58, top: 74, size: 62, drift: "floatPhotoA", delay: "-10s" },
  { left: 78, top: 70, size: 64, drift: "floatPhotoC", delay: "-12s" },
];

const mobilePlacements = [
  { left: 12, top: 13, size: 34, drift: "floatPhotoA", delay: "-1s" },
  { left: 43, top: 10, size: 32, drift: "floatPhotoB", delay: "-5s" },
  { left: 76, top: 14, size: 34, drift: "floatPhotoC", delay: "-3s" },
  { left: 20, top: 31, size: 31, drift: "floatPhotoA", delay: "-8s" },
  { left: 61, top: 33, size: 34, drift: "floatPhotoC", delay: "-6s" },
  { left: 88, top: 43, size: 30, drift: "floatPhotoB", delay: "-2s" },
  { left: 9, top: 54, size: 32, drift: "floatPhotoA", delay: "-9s" },
  { left: 38, top: 62, size: 31, drift: "floatPhotoB", delay: "-4s" },
  { left: 71, top: 65, size: 34, drift: "floatPhotoC", delay: "-7s" },
  { left: 20, top: 83, size: 32, drift: "floatPhotoA", delay: "-10s" },
  { left: 82, top: 84, size: 31, drift: "floatPhotoC", delay: "-12s" },
];

export function FloatingPhotos() {
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

  const photoStyles = useMemo(
    () =>
      photos.map((src, index) => {
        const placement = isMobile ? mobilePlacements[index] : placements[index];
        const x = (placement.left / 100) * viewport.width;
        const y = (placement.top / 100) * viewport.height;
        const dx = x - cursor.x;
        const dy = y - cursor.y;
        const distance = Math.hypot(dx, dy);
        const strength = isMobile ? 0 : Math.max(0, 1 - distance / 320);
        const safeDistance = Math.max(distance, 1);
        const repelX = strength ? (dx / safeDistance) * 180 * strength : 0;
        const repelY = strength ? (dy / safeDistance) * 180 * strength : 0;

        return {
          src,
          style: {
            "--left": `${placement.left}%`,
            "--top": `${placement.top}%`,
            "--size": `${placement.size}px`,
            "--repel-x": `${repelX}px`,
            "--repel-y": `${repelY}px`,
            "--delay": placement.delay,
          } as CSSProperties,
          driftClass: styles[placement.drift as keyof typeof styles],
        };
      }),
    [cursor, isMobile, viewport],
  );

  return (
    <div className={styles.floatingPhotos} aria-hidden="true">
      {photoStyles.map(({ src, style, driftClass }) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`${styles.floatingPhoto} ${driftClass}`}
          style={style}
        />
      ))}
    </div>
  );
}
