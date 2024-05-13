import { Injectable } from '@nestjs/common';
import { OssService } from '../../../libs/oss/src/oss.service';

@Injectable()
export class UploadService {
  constructor(private readonly ossService: OssService) {}

  async uploadFile(file) {
    const filename = file.originalname;
    const filepath = file.path;
    const url = await this.ossService.uploadFile(filename, filepath);
    return url;
  }

  async uploadFiles(files) {
    const urls = await this.ossService.uploadFiles(files);
    return urls;
  }
}
