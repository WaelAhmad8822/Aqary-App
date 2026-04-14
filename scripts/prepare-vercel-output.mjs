import path from "node:path";
import { fileURLToPath } from "node:url";
import { cp, rm, access } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const sourceDir = path.resolve(rootDir, "artifacts", "aqary", "dist", "public");
const targetDir = path.resolve(rootDir, "public");

async function run() {
  await access(sourceDir);
  await rm(targetDir, { recursive: true, force: true });
  await cp(sourceDir, targetDir, { recursive: true });
}

run().catch((error) => {
  console.error("Failed to prepare Vercel output directory:", error);
  process.exit(1);
});
