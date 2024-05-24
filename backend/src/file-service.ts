import { Injectable } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  async delete(hostUrl: string) {
    const shortPath = hostUrl.split('/').slice(3).join('/');
    await unlink(join('/home/node/app/dist/public', shortPath));
  }
}
