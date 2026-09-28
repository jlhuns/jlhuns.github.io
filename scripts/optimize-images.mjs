// Resizes and compresses photos for the web.
//
// Usage: npm run images -- <input-dir> [output-dir]
//
// Drop full-size photos (straight off a phone is fine) into a folder outside
// the repo, run this, and commit only the small .webp files it produces.
// Never commit the originals — a single phone photo is 10+ MB and bloats
// every clone of the repo forever.

import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_DIMENSION = 1600;
const QUALITY = 80;
const INPUT_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".heic", ".webp", ".tif", ".tiff"]);

const [inputDir, outputDir = "src/assets/images"] = process.argv.slice(2);

if (!inputDir) {
  console.error("Usage: npm run images -- <input-dir> [output-dir]");
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });

const files = (await readdir(inputDir)).filter((file) => INPUT_EXTENSIONS.has(path.extname(file).toLowerCase()));

for (const file of files) {
  const name = path.basename(file, path.extname(file)).toLowerCase();
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, `${name}.webp`);

  await sharp(inputPath)
    .rotate() // respect EXIF orientation from phone cameras
    .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  const before = (await stat(inputPath)).size;
  const after = (await stat(outputPath)).size;
  console.log(`${file} -> ${outputPath}  ${kb(before)} -> ${kb(after)}`);
}

function kb(bytes) {
  return `${Math.round(bytes / 1024).toLocaleString()} KB`;
}
