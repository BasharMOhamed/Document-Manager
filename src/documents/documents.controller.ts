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
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { Document } from './document.entity';

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(private documentService: DocumentsService) {}

  @ApiOperation({ summary: 'Upload a new document' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The document file to upload',
        },
        title: {
          type: 'string',
          description: 'Title of the document',
        },
        description: {
          type: 'string',
          description: 'Optional description of the document',
        },
        parentId: {
          type: 'number',
          description: 'Optional ID of the parent folder',
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Optional array of tags',
        },
      },
    },
  })
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

  @ApiOperation({ summary: 'Delete a document by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the document to delete' })
  @Delete('/:id')
  removeDoc(@Param('id') id: number) {
    return this.documentService.deleteDoc(id);
  }
}
