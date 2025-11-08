import sharp from 'sharp';
import * as mkdirp from 'mkdirp';
import { UploadFilesDto } from '../dtos/upload-files.dto';
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


export const saveImages = async (
  files: Array<Express.Multer.File>,
  body: UploadFilesDto,
) => {
  try {
    const folder = body.folder || 'default';
    const destination = `files/${folder}`;

    // Ensure both folders exist
    mkdirp.sync(`${destination}/main`);
    mkdirp.sync(`${destination}/resized`);

    const width = parseInt((body.width as any) ?? '200', 10);
    const height = parseInt((body.height as any) ?? '200', 10);

    const fileNames: string[] = [];

    for (const file of files) {
      const fileName =
        new Date().toISOString().replace(/[:.]/g, '-') +
        '-' +
        file.originalname.split('.')[0] +
        '.webp';

      // Save main image
      await sharp(file.buffer)
        .webp()
        .toFile(`${destination}/main/${fileName}`);

      // Save resized version
      await sharp(file.buffer)
        .webp()
        .resize({ width, height })
        .toFile(`${destination}/resized/${fileName}`);

      console.log(`✅ Image saved to ${destination}/${fileName}`);
      fileNames.push(fileName);
    }

    return fileNames;
  } catch (err) {
    console.error('❌ Error saving image:', err);
    throw err;
  }
};

