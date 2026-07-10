import styles from "./page.module.css";

export function AwardVisual() {
  return (
    <div className={styles.awardFrame} aria-hidden="true">
      <svg
        className={styles.awardSvg}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="awardBodyGrad"
            x1="40"
            y1="36"
            x2="160"
            y2="168"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--accentTwo)" />
            <stop offset="52%" stopColor="var(--accentThree)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
          <linearGradient
            id="awardShineGrad"
            x1="72"
            y1="52"
            x2="112"
            y2="132"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--text)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--text)" stopOpacity="0" />
          </linearGradient>
          <radialGradient
            id="awardGlowGrad"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(100 100) rotate(90) scale(92)"
          >
            <stop offset="0%" stopColor="var(--accentTwo)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accentTwo)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="92" fill="url(#awardGlowGrad)" />
        <circle
          cx="100"
          cy="100"
          r="78"
          stroke="color-mix(in srgb, var(--accentTwo) 34%, var(--line))"
          strokeWidth="1.5"
          opacity="0.9"
        />

        <path
          d="M68 58h64c4.4 0 8 3.6 8 8v18c0 22-14 40.8-34 47.2V146h20c3.3 0 6 2.7 6 6s-2.7 6-6 6H74c-3.3 0-6-2.7-6-6s2.7-6 6-6h20v-14.8C74 104.8 60 86 60 64v-8c0-4.4 3.6-8 8-8Z"
          fill="url(#awardBodyGrad)"
        />
        <path
          d="M68 58h64c4.4 0 8 3.6 8 8v18c0 22-14 40.8-34 47.2V146h20c3.3 0 6 2.7 6 6s-2.7 6-6 6H74c-3.3 0-6-2.7-6-6s2.7-6 6-6h20v-14.8C74 104.8 60 86 60 64v-8c0-4.4 3.6-8 8-8Z"
          fill="url(#awardShineGrad)"
        />

        <path
          d="M52 68c-10 2-18 10.8-20 21.2-1.2 6.4 0.8 12.6 5.2 17.2 3.2 3.4 7.4 5.4 12 6.1V78c0-5.5 4.5-10 10-10h-7.2Z"
          fill="color-mix(in srgb, var(--accentTwo) 72%, var(--accent))"
          opacity="0.92"
        />
        <path
          d="M148 68c10 2 18 10.8 20 21.2 1.2 6.4-0.8 12.6-5.2 17.2-3.2 3.4-7.4 5.4-12 6.1V78c0-5.5-4.5-10-10-10h7.2Z"
          fill="color-mix(in srgb, var(--accent) 72%, var(--accentTwo))"
          opacity="0.92"
        />

        <rect
          x="78"
          y="154"
          width="44"
          height="10"
          rx="3"
          fill="color-mix(in srgb, var(--accentThree) 70%, var(--text))"
        />
        <rect
          x="70"
          y="166"
          width="60"
          height="12"
          rx="4"
          fill="color-mix(in srgb, var(--accentTwo) 40%, var(--panelStrong))"
          stroke="color-mix(in srgb, var(--accentTwo) 50%, var(--line))"
          strokeWidth="1.2"
        />

        <path
          d="M100 78l7.6 15.4 17 2.5-12.3 12 2.9 16.9L100 117.8 84.8 124.8l2.9-16.9-12.3-12 17-2.5L100 78Z"
          fill="var(--text)"
          opacity="0.92"
        />
      </svg>
    </div>
  );
}
