import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { formatFileSize } from 'src/utils/common';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(
    value: Express.Multer.File | Express.Multer.File[],
    metadata: ArgumentMetadata,
  ) {
    if (Array.isArray(value)) {
      value.forEach((item) => this.validator(item));
    } else {
      this.validator(value);
    }
    return value;
  }

  validator(value: Express.Multer.File) {
    // 验证文件是否存在
    if (!value) {
      throw new BadRequestException('文件不存在');
    }
    // 验证文件大小
    if (value.size > MAX_FILE_SIZE) {
      throw new BadRequestException(
        `文件大小超过 ${formatFileSize(MAX_FILE_SIZE)}`,
      );
    }
    // 验证文件格式
    const allowedFileFormats = ['jpg', 'jpeg', 'png'];

    const fileFormat = value.originalname.split('.').pop().toLowerCase();
    if (!allowedFileFormats.includes(fileFormat)) {
      throw new BadRequestException(
        `文件格式仅支持 ${allowedFileFormats.join(', ')}`,
      );
    }
  }
}
