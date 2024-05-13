import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OssService {
  private client: OSS;

  constructor(private readonly configService: ConfigService) {
    this.client = new OSS({
      region: this.configService.get('oss.region'),
      accessKeyId: this.configService.get('oss.accessKeyId'),
      accessKeySecret: this.configService.get('oss.accessKeySecret'),
      bucket: this.configService.get('oss.bucket'),
    });
  }

  async uploadFile(filename: string, filepath: string) {
    try {
      const ossPath = 'images/' + filename; // Specify the path in the OSS bucket where the file should be uploaded
      let { url } = await this.client.put(ossPath, filepath);
      return url;
    } catch (error) {
      throw new HttpException('文件上传错误', HttpStatus.BAD_REQUEST);
    }
  }

  async uploadFiles(files: Express.Multer.File[]) {
    try {
      const urls = [];
      for (const file of files) {
        const ossPath = 'images/' + file.originalname; // Specify the path in the OSS bucket where the file should be uploaded
        const { url } = await this.client.put(ossPath, file.path);
        urls.push(url);
      }
      return urls;
    } catch (error) {
      throw new HttpException('文件上传错误', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFile(filename: string) {
    try {
      await this.client.delete(filename);
    } catch (error) {
      throw new HttpException('文件删除错误', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllFileUrls() {
    try {
      const files = await this.client.list();
      const urls = files.objects.map((file) =>
        this.client.signatureUrl(file.name),
      );
      return urls;
    } catch (error) {
      throw new HttpException('获取全部文件URL错误', HttpStatus.BAD_REQUEST);
    }
  }
}
