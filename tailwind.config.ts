import { nextui } from "@nextui-org/react"
import { type Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'
import radixPlugin from 'tailwindcss-radix'
import { marketingPreset } from './app/routes/_marketing+/tailwind-preset.ts'
import { extendedTheme } from './app/utils/extended-theme.ts'


export default {
	content: [
		'./app/**/*.{ts,tsx,jsx,js}',
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		fontFamily: {
			'sans': ['ui-sans-serif', 'system-ui'],
			'serif': ['ui-serif', 'Georgia'],
			'mono': ['ui-monospace', 'SFMono-Regular'],
			'ZCOOLXiaoWei': ['ZCOOLXiaoWei', 'system-ui'],
		},
		extend: extendedTheme,
	},
	presets: [marketingPreset],
	plugins: [animatePlugin, radixPlugin, nextui()],
} satisfies Config
