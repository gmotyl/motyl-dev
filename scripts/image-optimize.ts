import sharp from "sharp";
import { existsSync, statSync } from "fs";
import { resolve, dirname, basename, extname } from "path";

const TARGET_KB = 100;
const MAX_WIDTH = 1920;

async function optimizeImage(inputPath: string): Promise<void> {
  const absPath = resolve(inputPath);

  if (!existsSync(absPath)) {
    console.error(`Error: File not found — ${absPath}`);
    process.exit(1);
  }

  const dir = dirname(absPath);
  const name = basename(absPath, extname(absPath));
  const outputPath = resolve(dir, `${name}.webp`);

  const originalKB = Math.round(statSync(absPath).size / 1024);
  console.log(`Input:  ${absPath} (${originalKB} KB)`);

  const image = sharp(absPath);
  const meta = await image.metadata();
  const originalWidth = meta.width ?? MAX_WIDTH;

  // Start at quality 82, shrink in steps until under target
  let quality = 82;
  let width = Math.min(originalWidth, MAX_WIDTH);
  let buffer: Buffer;

  while (true) {
    buffer = await sharp(absPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    const kb = buffer.byteLength / 1024;

    if (kb <= TARGET_KB || quality <= 30) break;

    // Reduce quality first, then shrink dimensions if still too large
    if (quality > 50) {
      quality -= 8;
    } else {
      quality -= 5;
      width = Math.round(width * 0.85);
    }
  }

  await sharp(buffer).toFile(outputPath);

  const finalKB = Math.round(buffer.byteLength / 1024);
  console.log(`Output: ${outputPath} (${finalKB} KB, quality=${quality}, width=${width}px)`);

  if (buffer.byteLength / 1024 > TARGET_KB) {
    console.warn(`Warning: Could not reach ${TARGET_KB} KB target (stopped at ${finalKB} KB)`);
  }
}

const [, , input] = process.argv;

if (!input) {
  console.error("Usage: pnpm image:optimize <path-to-image>");
  process.exit(1);
}

optimizeImage(input);
