// Fails the build early if dist/ isn't produced
import { stat } from "node:fs/promises"
try {
  await stat(new URL("../dist/index.html", import.meta.url))
  console.log("dist/ folder found")
} catch {
  console.error("dist/ folder NOT produced - Vite build failed")
  process.exit(1)
}
