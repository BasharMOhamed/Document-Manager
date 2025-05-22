import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsPipe } from './documents.pipe';
import { UploadDocumentDto } from './dtos/documents.dto';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private documentService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(new DocumentsPipe()) document: Express.Multer.File,
    @Body() body: UploadDocumentDto,
  ) {
    // console.log(document);
    return this.documentService.upload(
      body.parentId,
      document,
      body.title,
      body.description,
      body.tags,
    );
  }

  @Delete('/:id')
  removeDoc(@Param('id') id: number) {
    return this.documentService.deleteDoc(id);
  }
}
