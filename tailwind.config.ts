import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Studio dark palette
        ink: {
          950: "#070809",
          900: "#0c0e12",
          850: "#101319",
          800: "#151922",
          700: "#1d222d",
          600: "#272e3b",
          500: "#3a4456",
        },
        // Hardware accent colors
        mpc: "#f6c026", // Akai amber
        rytm: "#ff5c5c", // Rytm red/percussion
        a4: "#5cc8ff", // Analog Four blue/melodic
        accent: {
          DEFAULT: "#a78bfa",
          soft: "#c4b5fd",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(167,139,250,0.4), 0 0 24px -6px rgba(167,139,250,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
