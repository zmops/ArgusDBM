import path from 'node:path';
import fs from 'node:fs';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerVariantGroup,
} from 'unocss';

const svgList: Record<string, string> = {};

function readSvg() {
  const svgPath = path.resolve(__dirname, './src/icons/svg');
  const files = fs.readdirSync(svgPath);
  files.forEach((file) => {
    const data = fs.readFileSync(`${svgPath}/${file}`, 'utf8');
    svgList[file.replace('.svg', '')] = data;
  });
}
readSvg();

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'column': 'flex flex-col',
    'icon-btn': 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',

  },
  theme: {
    colors: {
      dark: '#232324',
      primary: '#2179FF',
      title: '#1F2329',
      subtitle: '#4E5969',
      border: '#E1E4E8',
    },
    spacing: {
      base: '10px',
      sm: '8px',
      xs: '4px',
      md: '14px',
      lg: '16px',
    },
    fontSize: {
      base: '14px',
      sm: '12px',
      md: '16px',
      lg: '18px',
      xl: '22px',
      xxl: '36px',
    },
    borderRadius: {
      base: '4px',
      sm: '2px',
      md: '8px',
      lg: '10px',
      xl: '12px',
    },
    backgroundSize: {
      full: '100%',
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
      // i-costom:xxx
      collections: {
        custom: svgList
      }
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  include: ['./src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'].map(dir => path.resolve(__dirname, dir))
});
