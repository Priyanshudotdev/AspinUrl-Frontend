import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import envCompatible from 'vite-plugin-env-compatible'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
    ,
    envCompatible({
      mountedPath: "import.meta.env",
    })

  ],
  resolve:{
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
