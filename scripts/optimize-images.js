import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const SIZES = [400, 800, 1200];
const QUALITY = 90;

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
  }
}

async function optimizeImage(inputPath, outputDir, baseName) {
  await ensureDir(outputDir);
  
  const metadata = await sharp(inputPath).metadata();
  const originalWidth = metadata.width || 1200;
  
  console.log(`Optimizing ${baseName} (original: ${originalWidth}px)...`);
  
  const sizes = SIZES.filter(size => size <= originalWidth * 1.5);
  
  if (sizes.length === 0) {
    sizes.push(Math.min(originalWidth, 800));
  }
  
  const results = {};
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `${baseName}-${size}w.webp`);
    
    await sharp(inputPath)
      .resize(size, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    results[size] = {
      path: outputPath.replace(projectRoot + '/public', ''),
      size: stats.size
    };
    console.log(`  Created ${size}w: ${(stats.size / 1024).toFixed(1)} KB`);
  }
  
  return results;
}

async function getAllImages(dir) {
  const images = [];
  
  async function scan(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        await scan(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  }
  
  await scan(dir);
  return images;
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`Quality: ${QUALITY}%`);
  console.log(`Sizes: ${SIZES.join(', ')}w\n`);
  
  const publicDir = path.join(projectRoot, 'public', 'images');
  
  const images = await getAllImages(publicDir);
  console.log(`Found ${images.length} images to optimize\n`);
  
  const optimizedImages = {};
  
  for (const imagePath of images) {
    const relativePath = path.relative(publicDir, imagePath);
    const ext = path.extname(relativePath);
    const baseName = path.basename(relativePath, ext);
    const category = path.dirname(relativePath);
    const outputDir = path.join(publicDir, category);
    
    try {
      const results = await optimizeImage(imagePath, outputDir, baseName);
      optimizedImages[relativePath] = {
        sizes: results,
        fallback: Object.values(results)[Object.values(results).length - 1].path
      };
    } catch (error) {
      console.error(`Error processing ${relativePath}:`, error.message);
    }
  }
  
  const manifestPath = path.join(projectRoot, 'src', 'imageManifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(optimizedImages, null, 2));
  
  console.log('\n✅ Optimization complete!');
  console.log(`Manifest saved to: ${manifestPath}`);
  console.log('\nSample output structure:');
  console.log(JSON.stringify({
    "menu/Tropical_Bliss.png": {
      sizes: {
        400: { path: "/images/menu/Tropical_Bliss-400w.webp", size: 45000 },
        800: { path: "/images/menu/Tropical_Bliss-800w.webp", size: 85000 }
      },
      fallback: "/images/menu/Tropical_Bliss-800w.webp"
    }
  }, null, 2));
}

main().catch(console.error);