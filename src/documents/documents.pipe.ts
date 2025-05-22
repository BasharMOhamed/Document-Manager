import {
  ArgumentMetadata,
  Injectable,
  PayloadTooLargeException,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

@Injectable()
export class DocumentsPipe implements PipeTransform {
  private allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  private maxFileSize = 5 * 1024 * 1024; // 5MB
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.allowedMimeTypes.includes(value.mimetype)) {
      throw new UnsupportedMediaTypeException(
        `Invalid document type: ${value.mimetype}`,
      );
    }

    if (value.size > this.maxFileSize) {
      throw new PayloadTooLargeException(
        `Document size exceeds limit of ${this.maxFileSize / 1024 / 1024}`,
      );
    }
    return value;
  }
}
