"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const photos = [
  "/photo1.png",
  "/photo2.png",
  "/photo3.png",
  "/photo4.png",
  "/photo5.png",
];

const FACE_ANGLE = 360 / photos.length;
const RADIUS = 190;

function getOverlay(index: number, activeIdx: number) {
  const diff =
    ((index - activeIdx) % photos.length + photos.length) % photos.length;
  const angleDist = Math.min(diff, photos.length - diff);
  if (angleDist === 0) return 0;
  if (angleDist === 1) return 0.45;
  if (angleDist === 2) return 0.6;
  return 0.7;
}

export default function HomePage() {
  const step = useRef(0);
  const [angle, setAngle] = useState(0);
  const activeIdx = ((step.current % photos.length) + photos.length) % photos.length;

  useEffect(() => {
    const id = setInterval(() => {
      step.current += 1;
      setAngle(step.current * FACE_ANGLE);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.page}>
      <div>
        <h1 className={styles.title}>
          Build. <span>Innovate.</span> Grow.
        </h1>
        <p className={styles.copy}>
          Welcome to a space where creativity meets purpose and ideas are
          transformed into meaningful digital experiences. Every project is built
          with passion, attention to detail, and a strong focus on delivering
          something unique, modern, and impactful. The goal is not just to create
          visually appealing experiences, but to craft solutions that connect with
          people, build trust, and help brands grow with confidence in the digital
          world.
        </p>
      </div>

      <div className={styles.portraitStage} aria-label="Profile picture area">
        <div className={styles.ring} />
        <div className={`${styles.ring} ${styles.ringSmall}`} />
        <div className={styles.portraitWrap}>
          <div
            className={styles.cylinder}
            style={{ transform: `rotateY(${angle}deg)` }}
          >
            {photos.map((src, i) => {
              const overlay = getOverlay(i, activeIdx);
              return (
                <div
                  key={src}
                  className={styles.face}
                  style={{
                    transform: `rotateY(${i * -FACE_ANGLE}deg) translateZ(${RADIUS}px)`,
                  }}
                >
                  <img
                    src={src}
                    alt={`Photo ${i + 1}`}
                    className={styles.portrait}
                  />
                  <div
                    className={styles.whiteOverlay}
                    style={{ opacity: overlay }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
