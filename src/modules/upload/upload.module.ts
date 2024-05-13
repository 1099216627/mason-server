import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { OssService } from '@app/oss';

@Module({
  controllers: [UploadController],
  providers: [UploadService, OssService],
})
export class UploadModule {}
