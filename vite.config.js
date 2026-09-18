import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 설정: React 플러그인 적용 및 개발 서버 포트 설정
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
