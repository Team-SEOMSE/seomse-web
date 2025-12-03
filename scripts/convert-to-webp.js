import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, "../src/assets/images");
const MIN_SIZE_KB = 50; // 50KB 이상인 파일만 변환

async function convertToWebP() {
    const files = fs.readdirSync(IMAGES_DIR);
    const pngFiles = files.filter((f) => f.endsWith(".png"));

    let totalOriginal = 0;
    let totalConverted = 0;
    let convertedCount = 0;

    for (const file of pngFiles) {
        const inputPath = path.join(IMAGES_DIR, file);
        const outputPath = path.join(IMAGES_DIR, file.replace(".png", ".webp"));

        const stats = fs.statSync(inputPath);
        const sizeKB = stats.size / 1024;

        if (sizeKB < MIN_SIZE_KB) {
            continue;
        }

        try {
            await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

            const newStats = fs.statSync(outputPath);
            const newSizeKB = newStats.size / 1024;
            const reduction = ((1 - newSizeKB / sizeKB) * 100).toFixed(1);

            totalOriginal += sizeKB;
            totalConverted += newSizeKB;
            convertedCount++;
        } catch (err) {
            console.error(err.message);
        }
    }
}

convertToWebP();
