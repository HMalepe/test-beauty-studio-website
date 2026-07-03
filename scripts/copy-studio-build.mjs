import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "studio", "dist");
const dest = join(root, "public", "__tinker__");

if (!existsSync(src)) {
  console.error(
    "studio/dist not found. Run `npm run build:studio` first.",
  );
  process.exit(1);
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true });
}

cpSync(src, dest, { recursive: true });
console.log("Copied studio build → public/__tinker__");
