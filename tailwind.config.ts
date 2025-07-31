import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Legacy shadcn tokens for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},

				// GC Design System Base Color Tokens
				'gcds-color-white': 'hsl(var(--gcds-color-white))',
				'gcds-color-black': 'hsl(var(--gcds-color-black))',
				'gcds-color-grayscale-50': 'hsl(var(--gcds-color-grayscale-50))',
				'gcds-color-grayscale-100': 'hsl(var(--gcds-color-grayscale-100))',
				'gcds-color-grayscale-200': 'hsl(var(--gcds-color-grayscale-200))',
				'gcds-color-grayscale-300': 'hsl(var(--gcds-color-grayscale-300))',
				'gcds-color-grayscale-400': 'hsl(var(--gcds-color-grayscale-400))',
				'gcds-color-grayscale-500': 'hsl(var(--gcds-color-grayscale-500))',
				'gcds-color-grayscale-600': 'hsl(var(--gcds-color-grayscale-600))',
				'gcds-color-grayscale-700': 'hsl(var(--gcds-color-grayscale-700))',
				'gcds-color-grayscale-800': 'hsl(var(--gcds-color-grayscale-800))',
				'gcds-color-grayscale-900': 'hsl(var(--gcds-color-grayscale-900))',
				'gcds-color-blue-50': 'hsl(var(--gcds-color-blue-50))',
				'gcds-color-blue-100': 'hsl(var(--gcds-color-blue-100))',
				'gcds-color-blue-200': 'hsl(var(--gcds-color-blue-200))',
				'gcds-color-blue-300': 'hsl(var(--gcds-color-blue-300))',
				'gcds-color-blue-400': 'hsl(var(--gcds-color-blue-400))',
				'gcds-color-blue-500': 'hsl(var(--gcds-color-blue-500))',
				'gcds-color-blue-600': 'hsl(var(--gcds-color-blue-600))',
				'gcds-color-blue-700': 'hsl(var(--gcds-color-blue-700))',
				'gcds-color-blue-800': 'hsl(var(--gcds-color-blue-800))',
				'gcds-color-blue-900': 'hsl(var(--gcds-color-blue-900))',
				'gcds-color-red-50': 'hsl(var(--gcds-color-red-50))',
				'gcds-color-red-100': 'hsl(var(--gcds-color-red-100))',
				'gcds-color-red-200': 'hsl(var(--gcds-color-red-200))',
				'gcds-color-red-300': 'hsl(var(--gcds-color-red-300))',
				'gcds-color-red-400': 'hsl(var(--gcds-color-red-400))',
				'gcds-color-red-500': 'hsl(var(--gcds-color-red-500))',
				'gcds-color-red-600': 'hsl(var(--gcds-color-red-600))',
				'gcds-color-red-700': 'hsl(var(--gcds-color-red-700))',
				'gcds-color-red-800': 'hsl(var(--gcds-color-red-800))',
				'gcds-color-red-900': 'hsl(var(--gcds-color-red-900))',

				// GC Design System Global Tokens
				'gcds-text-primary': 'hsl(var(--gcds-text-primary))',
				'gcds-text-secondary': 'hsl(var(--gcds-text-secondary))',
				'gcds-text-light': 'hsl(var(--gcds-text-light))',
				'gcds-text-link': 'hsl(var(--gcds-text-link))',
				'gcds-text-link-hover': 'hsl(var(--gcds-text-link-hover))',
				'gcds-text-danger': 'hsl(var(--gcds-text-danger))',
				'gcds-text-success': 'hsl(var(--gcds-text-success))',

				'gcds-background-primary': 'hsl(var(--gcds-background-primary))',
				'gcds-background-secondary': 'hsl(var(--gcds-background-secondary))',
				'gcds-background-accent': 'hsl(var(--gcds-background-accent))',
				'gcds-background-danger': 'hsl(var(--gcds-background-danger))',
				'gcds-background-success': 'hsl(var(--gcds-background-success))',

				'gcds-border-primary': 'hsl(var(--gcds-border-primary))',
				'gcds-border-secondary': 'hsl(var(--gcds-border-secondary))',
				'gcds-border-accent': 'hsl(var(--gcds-border-accent))',
				'gcds-border-focus': 'hsl(var(--gcds-border-focus))',

				'gcds-focus-border': 'hsl(var(--gcds-focus-border))',
				'gcds-focus-text': 'hsl(var(--gcds-focus-text))',

				// GC Design System Component Tokens
				'gcds-button-primary-default-background': 'hsl(var(--gcds-button-primary-default-background))',
				'gcds-button-primary-default-text': 'hsl(var(--gcds-button-primary-default-text))',
				'gcds-button-primary-default-border': 'hsl(var(--gcds-button-primary-default-border))',
				'gcds-button-primary-hover-background': 'hsl(var(--gcds-button-primary-hover-background))',
				'gcds-button-primary-hover-text': 'hsl(var(--gcds-button-primary-hover-text))',
				'gcds-button-primary-focus-background': 'hsl(var(--gcds-button-primary-focus-background))',

				'gcds-button-secondary-default-background': 'hsl(var(--gcds-button-secondary-default-background))',
				'gcds-button-secondary-default-text': 'hsl(var(--gcds-button-secondary-default-text))',
				'gcds-button-secondary-default-border': 'hsl(var(--gcds-button-secondary-default-border))',
				'gcds-button-secondary-hover-background': 'hsl(var(--gcds-button-secondary-hover-background))',
				'gcds-button-secondary-hover-text': 'hsl(var(--gcds-button-secondary-hover-text))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-up': 'slideUp 0.6s ease-out'
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'card-hover': 'var(--shadow-card-hover)'
			},
			transitionProperty: {
				'smooth': 'var(--transition-smooth)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
