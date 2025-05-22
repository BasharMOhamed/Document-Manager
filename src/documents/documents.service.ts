import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private docRepo: Repository<Document>,
  ) {}
  async upload(
    parentId: number | undefined,
    file: Express.Multer.File,
    title: string | undefined,
    description: string | undefined,
    tags: string[] | undefined,
  ) {
    const type = file.originalname.split('.')[1];
    const existingDoc = await this.docRepo.findOne({
      where: { title, type, parentId },
    });
    if (existingDoc) {
      throw new BadRequestException(
        'Document with the same title already exists for this Folder.',
      );
    }
    const newDocument = this.docRepo.create({
      parentId,
      content: file.buffer,
      title,
      type,
      description,
      tags,
    });
    return this.docRepo.save(newDocument);
  }

  async deleteDoc(id: number) {
    const result = await this.docRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Document not found.');
    }
    return result;
  }
}
