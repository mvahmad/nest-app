import sharp from 'sharp';
import * as mkdirp from 'mkdirp';
import { UploadFileDto } from '../dtos/upload-file.dto';

export const saveImage = async (file: Express.Multer.File, body: any) => {
  try {
    const folder = body.folder || 'default'; // fallback if missing
    const destination = 'files/' + folder;
    const fileName = new Date().toISOString().replace(/[:.]/g, '-') + '-' + file.originalname;

    mkdirp.sync(destination);
    await sharp(file.buffer).toFile(`${destination}/${fileName}`);

    console.log(`✅ Image saved to ${destination}/${fileName}`);
    return { fileName, destination };
  } catch (err) {
    console.error('❌ Error saving image:', err);
    throw err;
  }
};
