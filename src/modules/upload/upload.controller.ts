import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from './storage';
import { FileValidationPipe } from 'src/pipes/file-validation/file-validation.pipe';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  @Post('file')
  uploadFile(@UploadedFile(FileValidationPipe) file) {
    return this.uploadService.uploadFile(file);
  }

  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage,
    }),
  )
  @Post('files')
  uploadFiles(@UploadedFiles(FileValidationPipe) files) {
    return this.uploadService.uploadFiles(files);
  }
}
