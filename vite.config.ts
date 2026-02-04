import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/adm-riscv-software-ecosystem/", // GH Pages base path
});