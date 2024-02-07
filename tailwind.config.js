module.exports = {
  darkMode: 'class',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [
      {
          pattern: /(bg|text|border)-(blue|green|yellow|orange|red|pink|purple)/,
          variants: ['before', 'after']
      },
      {
          pattern: /(bg|text|border)-(blue|green|yellow|orange|red|pink|purple)-(400)/
      },
      {
          pattern: /(text)-(blue|green|yellow|orange|red|pink|purple)-(700)/
      }
  ],
  theme: {
      colors: {
          'base-logo': 'oklch(var(--base-logo) / <alpha-value>)',
          'base-content-accent': 'oklch(var(--base-content-accent) / <alpha-value>)',
          'neutral-content-accent': 'oklch(var(--neutral-content-accent) / <alpha-value>)',
          'primary-content-active': 'oklch(var(--primary-content-active) / <alpha-value>)',
          'primary-content-accent': 'oklch(var(--primary-content-accent) / <alpha-value>)',
          'secondary-content-accent': 'oklch(var(--secondary-content-accent) / <alpha-value>)',
          white: '#ffffff',
          black: '#000000',
          founder: '#D3A917',
          blue: {
              DEFAULT: '#CBE9FF',
              50: '#F5FAFF',
              100: '#E5F4FF',
              200: '#CBE9FF',
              300: '#B8DFFF',
              400: '#A3D3FF',
              500: '#8AC2FF',
              600: '#75B3FF',
              700: '#5CA0FF',
              800: '#3D87FF',
              900: '#1A6AFF',
              950: '#0051FF'
          },
          green: {
              DEFAULT: '#C2E1BF',
              50: '#F1F8F2',
              100: '#E3F2E3',
              200: '#C2E1BF',
              300: '#B3DBB3',
              400: '#A8D6AC',
              500: '#9AD0A3',
              600: '#8CC99C',
              700: '#7BC192',
              800: '#6AB98B',
              900: '#58B185',
              950: '#50AA84'
          },
          yellow: {
              DEFAULT: '#FBF6BC',
              50: '#FEFDF5',
              100: '#FDFAE2',
              200: '#FBF6BC',
              300: '#F9ED9F',
              400: '#F7E17D',
              500: '#F6D56A',
              600: '#F4C54D',
              700: '#F3B73F',
              800: '#F2A222',
              900: '#F18F0E',
              950: '#EC810E'
          },
          orange: {
              DEFAULT: '#FFDFB9',
              50: '#FFF8F0',
              100: '#FFF1E0',
              200: '#FFDFB9',
              300: '#FFD4A3',
              400: '#FFC98F',
              500: '#FFBD7A',
              600: '#FFAD61',
              700: '#FF9D47',
              800: '#FF8C2E',
              900: '#FF7105',
              950: '#FA6800'
          },
          red: {
              DEFAULT: '#F6CBD0',
              50: '#FDF2F2',
              100: '#FBE9EB',
              200: '#F6CBD0',
              300: '#F1ABB6',
              400: '#EF9FA8',
              500: '#ED9299',
              600: '#EB898E',
              700: '#E87879',
              800: '#E56462',
              900: '#E04F47',
              950: '#DD4032'
          },
          pink: {
              DEFAULT: '#F4CFDF',
              50: '#FCF3F7',
              100: '#FAEAF2',
              200: '#F4CFDF',
              300: '#F1C1D7',
              400: '#EEB4D1',
              500: '#EAA4C9',
              600: '#E693C2',
              700: '#E27EBA',
              800: '#DD6AB3',
              900: '#D64DA8',
              950: '#CF309F'
          },
          purple: {
              DEFAULT: '#DDCFF4',
              50: '#F6F3FC',
              100: '#F0EAFA',
              200: '#DDCFF4',
              300: '#D2C1F1',
              400: '#C8B4EE',
              500: '#BBA4EA',
              600: '#AD93E6',
              700: '#9C7EE2',
              800: '#8765DC',
              900: '#6E48D5',
              950: '#5B34D0'
          }
      },
      fontSize: {
          xs: '0.750002rem',
          sm: '0.8125rem',
          base: '0.875rem',
          xl: '1rem',
          '2xl': '1.25rem',
          '3xl': '1.563rem',
          '4xl': '1.953rem',
          '5xl': '2.441rem'
      },
      extend: {
          fontFamily: {
              sans: ['var(--font-inter)'],
              mono: ['var(--font-roboto-mono)']
          },
          animation: {
              fade: 'fadeOut 5s ease-in-out'
          },
          keyframes: {
              fadeOut: {
                  '0%': { opacity: 1 },
                  '80%': { opacity: 1 },
                  '100%': { opacity: 0 }
              }
          }
      }
  },
  daisyui: {
      themes: [
          {
              talkdark: {
                  // lowest layer (e.g. background of app)
                  '--base-logo': '91.92% 0.04365319149931883 239.80454882034041', // #cbe9ff (logo)
                  'base-100': '#143349', // app background
                  'base-content': '#ffffff', // primary text
                  '--base-content-accent': '91.92% 0.04365319149931883 239.80454882034041', // #cbe9ff (subtle text)
                  'base-200': '#0B273A',
                  'base-300': '#0A1A25',

                  // subtle accent to base (e.g. navbar, media popover and chat box)
                  neutral: '#183F5B',
                  'neutral-content': '#ffffff',
                  '--neutral-content-accent': '91.92% 0.04365319149931883 239.80454882034041', // #cbe9ff

                  // strong accent to base (e.g links, chips, pills and smaller nav)
                  accent: '#5784BA',
                  'accent-content': '#ffffff',

                  // primary theme action color (e.g. buttons)
                  primary: '#CBE9FF',
                  'primary-content': '#143349',
                  '--primary-content-active': '1 0 0', // #ffffff
                  '--primary-content-accent': '60.39% 0.097 253.72', // #5784BA

                  // high contrast alternative (e.g. menu popovers, inputs)
                  secondary: '#ffffff',
                  'secondary-content': '#143349',
                  '--secondary-content-accent': '60.39% 0.097 253.72', // #5784BA

                  // states
                  info: '#5784BA',
                  success: '#C2E1BF',
                  warning: '#FBF6BC',
                  error: '#F1ABB6'
              },
              talklight: {
                  // lowest layer (e.g. background of app)
                  '--base-logo': '30.9% 0.054 242.27', // #143349 (logo)
                  'base-100': '#ffffff', // app background
                  'base-content': '#143349', // primary text
                  '--base-content-accent': '53.13% 0 0', // #6c6c6c (subtle text)
                  'base-200': '#E8EAEF',
                  'base-300': '#0A1A25',

                  // subtle accent to base (e.g. navbar, media popover and chat box)
                  neutral: '#E8EAEF',
                  'neutral-content': '#143349',
                  '--neutral-content-accent': '53.13% 0 0', // #6c6c6c (subtle text)

                  // strong accent to base (e.g links, chips, pills and smaller nav)
                  accent: '#5784BA',
                  'accent-content': '#ffffff',

                  // primary theme action color (e.g. buttons)
                  primary: '#CBE9FF',
                  'primary-content': '#143349',
                  '--primary-content-active': '1 0 0', // #ffffff
                  '--primary-content-accent': '60.39% 0.097 253.72', // #5784BA

                  // high contrast alternative (e.g. menu popovers, inputs)
                  secondary: '#143349',
                  'secondary-content': '#ffffff',
                  '--secondary-content-accent': '60.39% 0.097 253.72', // #5784BA

                  // states
                  info: '#5784BA',
                  success: '#C2E1BF',
                  warning: '#FBF6BC',
                  error: '#F1ABB6'
              },
              solana: {
                  // lowest layer (e.g. background of app)
                  '--base-logo': '91.92% 0.04365319149931883 239.80454882034041', // #cbe9ff (logo)
                  'base-100': '#1B1B1D', // app background
                  'base-content': '#E3E3E3', // primary text
                  '--base-content-accent': '86.99% 0 0', // #D4D4D4 (subtle text)
                  'base-200': '#0F0F0F',
                  'base-300': '#000000',

                  // subtle accent to base (e.g. navbar, media popover and chat box)
                  neutral: '#242526',
                  'neutral-content': '#E3E3E3',
                  '--neutral-content-accent': '86.99% 0 0', // #D4D4D4 (subtle text)

                  // strong accent to base (e.g links, chips, pills and smaller nav)
                  accent: '#898cff',
                  'accent-content': '#ffffff',

                  // primary theme action color (e.g. buttons)
                  primary: '#14f195',
                  'primary-content': '#000000',
                  '--primary-content-active': '1 0 0', // #ffffff
                  '--primary-content-accent': '0% 0 0', // #000000

                  // high contrast alternative (e.g. menu popovers, inputs)
                  secondary: '#E3E3E3',
                  'secondary-content': '#1B1B1D',
                  '--secondary-content-accent': '68.98% 0.166 279.97', // #898cff

                  // states
                  info: '#5784BA',
                  success: '#C2E1BF',
                  warning: '#FBF6BC',
                  error: '#F1ABB6'
              }
          }
      ]
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
