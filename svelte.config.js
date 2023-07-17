import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
  },
};

export default config;
