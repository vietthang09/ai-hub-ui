// tailwind.config.js
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			primary: 'hsl(240, 5.9%, 10%)',
  			'primary-foreground': 'hsl(0, 0%, 98%)',
  			destructive: 'hsl(0, 84.2%, 60.2%)',
  			'destructive-foreground': 'hsl(0, 0%, 98%)',
  			accent: 'hsl(240, 4.8%, 95.9%)',
  			'accent-foreground': 'hsl(240, 5.9%, 10%)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: [],
};
