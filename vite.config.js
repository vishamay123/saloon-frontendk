import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/saloon-frontendk/', // આ લાઈન બરાબર ચેક કરી લેવી
  build: {
    outDir: 'docs', // આ લાઈન ઉમેરવાથી બિલ્ડ સીધું docs ફોલ્ડરમાં જશે
  },
  server: {
    port: 3000
  }
});
