
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
				// Growth App custom colors
				garden: {
					sky: '#87CEEB',
					grass: '#90EE90',
					earth: '#D2B48C',
					leaf: '#228B22',
					flower: '#FFB6C1',
					water: '#ADD8E6',
					gold: '#FFD700'
				},
				growth: {
					seedling: '#90EE90',
					sprout: '#32CD32',
					mature: '#228B22',
					blooming: '#FF69B4'
				}
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
				},
				'grow': {
					'0%': { transform: 'scale(0) translateY(20px)', opacity: '0' },
					'50%': { transform: 'scale(0.8) translateY(10px)', opacity: '0.7' },
					'100%': { transform: 'scale(1) translateY(0)', opacity: '1' }
				},
				'bounce-gentle': {
					'0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
					'40%': { transform: 'translateY(-10px)' },
					'60%': { transform: 'translateY(-5px)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'sparkle': {
					'0%, 100%': { opacity: '0', transform: 'scale(0)' },
					'50%': { opacity: '1', transform: 'scale(1)' }
				},
				'coin-flip': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'grow': 'grow 0.8s ease-out',
				'bounce-gentle': 'bounce-gentle 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'sparkle': 'sparkle 1.5s ease-in-out infinite',
				'coin-flip': 'coin-flip 0.6s ease-in-out'
			},
			backgroundImage: {
				'garden-gradient': 'linear-gradient(180deg, #87CEEB 0%, #90EE90 50%, #D2B48C 100%)',
				'sky-gradient': 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 100%)',
				'earth-gradient': 'linear-gradient(180deg, #90EE90 0%, #D2B48C 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
