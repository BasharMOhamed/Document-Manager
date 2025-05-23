import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/documents/document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaggingService {
  constructor(
    @InjectRepository(Document) private documentRepo: Repository<Document>,
  ) {}

  async addTags(docId: number, tags: string[]) {
    console.log(docId, tags);
    const document = await this.documentRepo.findOneBy({ id: docId });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    document.tags = [...(document.tags || []), ...tags];
    console.log(document);
    return this.documentRepo.save(document);
  }

  async editTags(docId: number, tags: string[]) {
    const document = await this.documentRepo.findOneBy({ id: docId });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    document.tags = tags;
    return this.documentRepo.save(document);
  }

  async deleteTag(docId: number, tag: string) {
    const document = await this.documentRepo.findOneBy({ id: docId });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    if (document.tags && document.tags?.length > 0) {
      document.tags = document.tags.filter((Tag) => Tag !== tag);
    }

    return this.documentRepo.save(document);
  }
}
