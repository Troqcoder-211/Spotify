import plugin from 'tailwind-scrollbar';

export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: { extend: {} },
	plugins: [plugin({ nocompatible: true })],
};
