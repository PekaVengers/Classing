export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      animation: {
        shine: "shine 8s ease-in-out infinite",
      },
      keyframes: {
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      colors: {
        bgBlack: "#212325",
        lightBlue: "#9CDAF1",
        darkBlue: "#368186",
        lightRed: "#F4CBB2",
        lightGrey: "#ABABAB",
        darkGrey: "#2E3136",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        primary: "Inter",
        secondary: "Borel",
      },
      screens: {
        xxl: "1751px",
        mmd: "851px",
        gsm: "571px",
        msm: "491px",
        vsm: "441px",
        vvsm: "351px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
