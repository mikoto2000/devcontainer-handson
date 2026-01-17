import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  base: '/devcontainer-workshop/',
  title: 'シリーズ: コンテナで構築する開発環境',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  logo: null,
  logoText: 'コンテナで構築する開発環境',
  themeConfig: {
    socialLinks: [],
  },
  globalStyles: path.join(__dirname, 'styles/global.css'),
});
