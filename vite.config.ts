import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/riscv-software-ecosystem/", // adjust if your repo name differs
});