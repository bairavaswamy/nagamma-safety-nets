// Run from the project root: node scripts/generate-social.mjs
// The photograph is only cropped and composited, with no retouching.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const brandDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/brand');
const photograph = await sharp(path.join(brandDirectory, '../images/balcony-premium.webp'))
  .resize(540, 565, { fit: 'cover', position: 'centre' })
  .toBuffer();
const logo = await sharp(path.join(brandDirectory, 'logo.svg')).resize(348).png().toBuffer();

const composition = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#F7FAFE' } })
  .composite([
    { input: photograph, left: 660, top: 0 },
    { input: path.join(brandDirectory, 'social-share.svg'), left: 0, top: 0 },
    { input: logo, left: 58, top: 43 },
  ])
  .png()
  .toBuffer();

await Promise.all([
  sharp(composition).png({ compressionLevel: 9 }).toFile(path.join(brandDirectory, 'og-image.png')),
  sharp(composition).webp({ quality: 90 }).toFile(path.join(brandDirectory, 'og-image.webp')),
]);
process.stdout.write('Created 1200 × 630 social share PNG and WebP.\n');

