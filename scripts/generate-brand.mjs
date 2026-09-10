import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const brandDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/brand');
const originalLogo = await fs.readFile(path.join(brandDirectory, 'logo.svg'), 'utf8');
const wordmark = (await fs.readFile(path.join(brandDirectory, 'wordmark.svg'), 'utf8')).match(/d="([^"]+)"/)[1];
const monogram = (await fs.readFile(path.join(brandDirectory, 'monogram.svg'), 'utf8')).match(/d="([^"]+)"/)[1];
const subtitle = originalLogo.match(/<g transform="translate\(121 76\)"[\s\S]+?<\/g>/)?.[0]
  ?? originalLogo.match(/<g id="subtitle"[\s\S]+?<\/g>/)?.[0];
if (!subtitle) throw new Error('The outlined subtitle is missing from logo.svg.');

const definitions = `<defs>
  <linearGradient id="gold" x1="12" y1="8" x2="79" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#FFF0C6"/><stop offset=".19" stop-color="#B38A4F"/><stop offset=".42" stop-color="#F3DBA4"/><stop offset=".69" stop-color="#98703E"/><stop offset="1" stop-color="#DFBF7C"/></linearGradient>
  <linearGradient id="blue" x1="22" y1="16" x2="76" y2="90" gradientUnits="userSpaceOnUse"><stop stop-color="#376FAA"/><stop offset=".42" stop-color="#174D8B"/><stop offset="1" stop-color="#09233F"/></linearGradient>
  <linearGradient id="ivory" x1="30" y1="24" x2="70" y2="70" gradientUnits="userSpaceOnUse"><stop stop-color="#FFFFFF"/><stop offset=".57" stop-color="#F7FAFE"/><stop offset="1" stop-color="#DAE4F0"/></linearGradient>
  <linearGradient id="word" x1="0" y1="0" x2="0" y2="39" gradientUnits="userSpaceOnUse"><stop stop-color="#376FAA"/><stop offset="1" stop-color="#10335D"/></linearGradient>
  <linearGradient id="wordLight" x1="0" y1="0" x2="0" y2="39" gradientUnits="userSpaceOnUse"><stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#E3EAF4"/></linearGradient>
  <pattern id="net" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)"><path d="M0 0H10M0 0V10" stroke="#D6BD84" stroke-width=".65"/><circle cx="0" cy="0" r=".9" fill="#D6BD84"/></pattern>
  <clipPath id="inset"><path d="M48 13C60 21 71 26 80 28v23c0 19-11 31-32 41-21-10-32-22-32-41V28c9-2 20-7 32-15Z"/></clipPath>
</defs>`;

const crest = `<g>
  <path d="M48 2C61 12 74 18 90 21v31c0 24-14 40-42 51C20 92 6 76 6 52V21C22 18 35 12 48 2Z" fill="url(#gold)" stroke="#906B3A" stroke-width=".65"/>
  <path d="M48 7c12 9 25 15 37 18v27c0 21-12 35-37 46-25-11-37-25-37-46V25c12-3 25-9 37-18Z" fill="#09233F"/>
  <path d="M48 11c12 8 24 14 34 17v24c0 20-12 33-34 43-22-10-34-23-34-43V28c10-3 22-9 34-17Z" fill="url(#gold)"/>
  <path d="M48 13C60 21 71 26 80 28v23c0 19-11 31-32 41-21-10-32-22-32-41V28c9-2 20-7 32-15Z" fill="url(#blue)"/>
  <g clip-path="url(#inset)">
    <path d="M15 20h68v74H15z" fill="url(#net)" opacity=".19"/>
    <path d="M18 30 77 16 88 42 16 60Z" fill="#B5CCE8" opacity=".045"/>
    <g stroke="#C5A46D" stroke-width="1.1" stroke-linejoin="round" opacity=".65">
      <path d="M22 67V47l10-5v25M24.5 48.5l5-2.5M24.5 54l5-2.5M24.5 59.5l5-2.5"/>
      <path d="m62 61 8-6 7 5v10M65 64v5m5-8v8m5-6v6"/>
    </g>
    <path d="${monogram}" transform="translate(28 28)" fill="#09233F" opacity=".75"/>
    <path d="${monogram}" transform="translate(28 26.7)" fill="url(#ivory)"/>
    <path d="M20 69c15 1 29 4 55 1v4c-20 3-36 0-55-1v-4Z" fill="url(#gold)"/>
    <path d="M25 74v8m8-7v12m8-11v14m8-13v16m8-16v12m8-13v9m8-10v6" stroke="#C8AC73" stroke-width="1.35"/>
    <path d="M25 83c13 6 30 8 45-1" stroke="#E3CC97" stroke-width="1.25"/>
  </g>
  <path d="M48 18 50 21 48 24 46 21Z" fill="#EAD197"/>
  <path d="M10 25c14-3 26-8 38-18" stroke="#FFF7DA" stroke-width=".9" opacity=".6"/>
  <path d="M86 54c-1 18-14 34-38 44" stroke="#FBE8B8" stroke-width=".8" opacity=".5"/>
</g>`;

const subtitlePaths = subtitle.slice(subtitle.indexOf('>') + 1, subtitle.lastIndexOf('</g>'));
function logo(light = false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="438" height="104" viewBox="0 0 438 104" fill="none" role="img" aria-labelledby="title desc"><title id="title">Nagamma Safety Nets</title><desc id="desc">A layered brass and blue shield with a serif N, net lattice, architectural details and a refined Nagamma wordmark.</desc>${definitions}${crest}<g transform="translate(118 24)"><path d="${wordmark}" fill="url(#${light ? 'wordLight' : 'word'})"/></g><path d="M120 82h24m215 0h65" stroke="#B69961" stroke-width="1"/><path d="m148 82 2-2 2 2-2 2Z" fill="#B69961"/><g id="subtitle" transform="translate(162 76) scale(.94)" stroke="${light ? '#CDDCEE' : '#5C6F86'}" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="round">${subtitlePaths}</g></svg>`;
}

await Promise.all([
  fs.writeFile(path.join(brandDirectory, 'logo.svg'), logo()),
  fs.writeFile(path.join(brandDirectory, 'logo-light.svg'), logo(true)),
  fs.writeFile(path.join(brandDirectory, 'mark.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="104" height="104" viewBox="0 0 104 104" fill="none" role="img" aria-labelledby="title"><title id="title">Nagamma Safety Nets</title>${definitions}<g transform="translate(4)">${crest}</g></svg>`),
]);
await Promise.all([
  sharp(path.join(brandDirectory, 'mark.svg')).resize(512, 512).png().toFile(path.join(brandDirectory, 'mark-512.png')),
  sharp(path.join(brandDirectory, 'mark.svg')).resize(32, 32).png().toFile(path.join(brandDirectory, 'favicon.png')),
  sharp(path.join(brandDirectory, 'mark.svg')).resize(140, 140).extend({ top: 20, bottom: 20, left: 20, right: 20, background: '#F7FAFE' }).flatten({ background: '#F7FAFE' }).png().toFile(path.join(brandDirectory, 'apple-touch-icon.png')),
  sharp(path.join(brandDirectory, 'logo.svg')).resize(876, 208).flatten({ background: '#F7FAFE' }).png().toFile(path.join(brandDirectory, 'logo-preview.png')),
  sharp(path.join(brandDirectory, 'logo-light.svg')).resize(876, 208).flatten({ background: '#10335D' }).png().toFile(path.join(brandDirectory, 'logo-light-preview.png')),
  sharp(path.join(brandDirectory, 'logo.svg')).resize(215).flatten({ background: '#F7FAFE' }).png().toFile(path.join(brandDirectory, 'logo-header-preview.png')),
]);
const iconSizes = [16, 32, 48];
const iconFrames = await Promise.all(iconSizes.map((size) => sharp(path.join(brandDirectory, 'mark.svg')).resize(size, size).png().toBuffer()));
const iconHeader = Buffer.alloc(6 + 16 * iconFrames.length);
iconHeader.writeUInt16LE(1, 2);
iconHeader.writeUInt16LE(iconFrames.length, 4);
let iconOffset = iconHeader.length;
iconFrames.forEach((frame, index) => {
  const directoryOffset = 6 + 16 * index;
  iconHeader.writeUInt8(iconSizes[index], directoryOffset);
  iconHeader.writeUInt8(iconSizes[index], directoryOffset + 1);
  iconHeader.writeUInt16LE(1, directoryOffset + 4);
  iconHeader.writeUInt16LE(32, directoryOffset + 6);
  iconHeader.writeUInt32LE(frame.length, directoryOffset + 8);
  iconHeader.writeUInt32LE(iconOffset, directoryOffset + 12);
  iconOffset += frame.length;
});
await fs.writeFile(path.join(brandDirectory, 'favicon.ico'), Buffer.concat([iconHeader, ...iconFrames]));
process.stdout.write('Created premium SVG identity and PNG exports.\n');

