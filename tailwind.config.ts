
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
				// Ocean Theme colors
				ocean: {
					deep: '#0D47A1',
					blue: '#1976D2',
					light: '#42A5F5',
					coral: '#FF7043',
					warm: '#FFB74D',
					seafoam: '#4DB6AC',
					pearl: '#F5F5F5'
				},
				// Growth App custom colors (kept for compatibility)
				garden: {
					sky: '#87CEEB',
					grass: '#90EE90',
					earth: '#D2B48C',
					leaf: '#228B22',
					flower: '#FFB6C1',
					water: '#ADD8E6',
					gold: '#FFD700'
				},
				// Enhanced Forest Theme colors
				forest: {
					deep: '#1B4332',      // Deep forest green
					pine: '#2D5A3D',      // Pine green
					sage: '#52734D',      // Sage green
					moss: '#74A478',      // Moss green
					fern: '#8FBC8F',      // Light fern
					bark: '#8B4513',      // Tree bark brown
					earth: '#A0522D',     // Forest earth
					gold: '#DAA520',      // Forest gold
					mist: '#F0F8F0',      // Forest mist
					shadow: '#2F4F2F'     // Forest shadow
				},
				growth: {
					seedling: '#4DB6AC',
					sprout: '#42A5F5',
					mature: '#1976D2',
					blooming: '#FF7043'
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
				},
				'wave': {
					'0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
					'50%': { transform: 'translateX(-5px) rotate(1deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'grow': 'grow 0.8s ease-out',
				'bounce-gentle': 'bounce-gentle 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'sparkle': 'sparkle 1.5s ease-in-out infinite',
				'coin-flip': 'coin-flip 0.6s ease-in-out',
				'wave': 'wave 2s ease-in-out infinite'
			},
			backgroundImage: {
				'ocean-gradient': 'linear-gradient(180deg, #E3F2FD 0%, #B3E5FC 30%, #4FC3F7 70%, #29B6F6 100%)',
				'garden-gradient': 'linear-gradient(180deg, #87CEEB 0%, #90EE90 50%, #D2B48C 100%)',
				'forest-gradient': 'linear-gradient(180deg, #F0F8F0 0%, #8FBC8F 30%, #52734D 70%, #2D5A3D 100%)',
				'sky-gradient': 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 100%)',
				'earth-gradient': 'linear-gradient(180deg, #90EE90 0%, #D2B48C 100%)',
				'ocean-depth': 'linear-gradient(180deg, #E1F5FE 0%, #B3E5FC 50%, #4FC3F7 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
