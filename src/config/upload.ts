import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
interface IUploadConfig {
    driver: 's3' | 'disk';
    tmpFolder: string;
    multer: {
        storage: StorageEngine;
    };
    uploadsFolder: string;
    config: {
        disk: {};
        aws: {
            bucket: string;
        };
    };
}
export default {
    driver: process.env.STORAGE_DRIVER,
    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),
    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `IMG_${fileHash}.${file.originalname
                    .split('.')
                    .pop()}`;
                return callback(null, fileName);
            },
        }),
    },
    config: {
        disk: {},
        aws: {
            bucket: 'jhoseph-app-gobarber',
        },
    },
} as IUploadConfig;
