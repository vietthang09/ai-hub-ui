// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(240, 5.9%, 10%)",
        "primary-foreground": "hsl(0, 0%, 98%)",
        destructive: "hsl(0, 84.2%, 60.2%)",
        "destructive-foreground": "hsl(0, 0%, 98%)",
        accent: "hsl(240, 4.8%, 95.9%)",
        "accent-foreground": "hsl(240, 5.9%, 10%)",
      },
    },
  },
  plugins: [],
};
