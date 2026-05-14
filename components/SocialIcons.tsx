type IconProps = {
  size?: number;
};

export function GitHubIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.38-3.88-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.48.11-3.06 0 0 .98-.31 3.18 1.18A11 11 0 0 1 12 6.1c.98 0 1.96.13 2.88.39 2.2-1.5 3.17-1.18 3.17-1.18.64 1.58.24 2.76.12 3.05.75.82 1.2 1.85 1.2 3.11 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.08.8 2.18v3c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

export function LinkedInIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.25 0h3.84v1.57h.05c.54-1.02 1.85-2.1 3.8-2.1 4.06 0 4.81 2.68 4.81 6.16v5.87h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74v5.29h-4V9.75Z"
      />
    </svg>
  );
}

export function XIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.9 2.25h3.32l-7.25 8.29 8.53 11.21h-6.68l-5.23-6.83-5.99 6.83H2.28l7.75-8.86L1.85 2.25H8.7l4.73 6.24 5.47-6.24Zm-1.16 17.55h1.84L7.7 4.1H5.72l12.02 15.7Z"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.35a4.65 4.65 0 1 1 0 9.3 4.65 4.65 0 0 1 0-9.3Zm0 2a2.65 2.65 0 1 0 0 5.3 2.65 2.65 0 0 0 0-5.3Zm5.1-2.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"
      />
    </svg>
  );
}

export function FacebookIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.8-.08-1.6-.13-2.4-.13-2.38 0-4.02 1.45-4.02 4.12v2.3H8.1V14h2.68v8h2.72Z"
      />
    </svg>
  );
}
