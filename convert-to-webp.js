const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directoryPath = path.join(__dirname, 'public');

const convertImagesInDirectory = async (dirPath) => {
  try {
    const files = await fs.promises.readdir(dirPath);
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = await fs.promises.stat(fullPath);
      
      if (stat.isDirectory()) {
        await convertImagesInDirectory(fullPath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const name = path.basename(file, ext);
          const newPath = path.join(dirPath, `${name}.webp`);
          
          try {
            console.log(`Converting ${file} to webp...`);
            await sharp(fullPath)
              .webp({ quality: 80 })
              .toFile(newPath);
              
            console.log(`Successfully converted ${file}. Deleting original...`);
            await fs.promises.unlink(fullPath);
          } catch (err) {
            console.error(`Error converting ${file}:`, err);
          }
        }
      }
    }
  } catch (err) {
    console.error('Error reading directory:', dirPath, err);
  }
};

convertImagesInDirectory(directoryPath).then(() => {
  console.log('Conversion process finished.');
});
