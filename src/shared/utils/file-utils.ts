import sharp from 'sharp';
import * as mkdirp from 'mkdirp';
// import { UploadFileDto } from '../dtos/upload-file.dto';

export const saveImage = async (file: Express.Multer.File, body: any) => {
  try {
    const folder = body.folder || 'default'; // fallback if missing
    const destination = 'files/' + folder;
    const fileName = new Date().toISOString().replace(/[:.]/g, '-') + '-' + file.originalname.split(".")[0] + ".webp" ;
    mkdirp.sync(destination + "/main");
    mkdirp.sync(destination + "/resized");

    await sharp(file.buffer).webp().toFile(destination + "/main" + fileName);

    await sharp(file.buffer).webp().
    resize({
      width: body.width || 200 ,
      height: body.height ||200,
    }).toFile(destination + "/resized" + fileName);

    console.log(`✅ Image saved to ${destination}/${fileName}`);
    return { fileName, destination };
  } catch (err) {
    console.error('❌ Error saving image:', err);
    throw err;
  }
};
