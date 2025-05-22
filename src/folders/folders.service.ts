import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Folder } from './folders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { replaceFolderPath } from 'utils/utils';
import { Document } from 'src/documents/document.entity';
@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder) private folderRepo: Repository<Folder>,
    @InjectRepository(Document) private docRepo: Repository<Document>,
  ) {}

  async createFolder(name: string, parentId: number | undefined) {
    // check if this name already exists
    const existing = await this.folderRepo.findOneBy({
      name,
      parentId: parentId || undefined,
    });
    if (existing) {
      throw new BadRequestException('A folder with this name already exists');
    }

    let folderPath = '';
    if (parentId) {
      const parentFolder = await this.folderRepo.findOneBy({ id: parentId });
      if (!parentFolder) {
        throw new BadRequestException('Parent folder not found');
      }
      folderPath = `${parentFolder.path}`;
    }
    folderPath += `/${name}`;
    const newFolder = this.folderRepo.create({
      name,
      path: folderPath,
      parentId: parentId || undefined,
    });
    return this.folderRepo.save(newFolder);
  }

  async editFolder(newname: string, id: number) {
    // todo => check if this name already exists
    const folder = await this.folderRepo.findOneBy({ id });
    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    const duplicate = await this.folderRepo.findOneBy({
      name: newname,
      parentId: folder.parentId,
    });
    if (duplicate && duplicate.id !== id) {
      throw new BadRequestException(
        'Folder name already exists under this parent',
      );
    }

    folder.name = newname;
    folder.path = replaceFolderPath(folder.path, newname);
    return this.folderRepo.save(folder);
  }

  async deleteFolder(id: number) {
    const folder = await this.folderRepo.findOneBy({ id });
    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    if (folder.children && folder.children.length > 0) {
      await Promise.all(
        folder.children.map((child) => this.deleteFolder(child.id)),
      );
      // await Promise.all(
      //   folder.documents.map((child) => this.deleteFolder(child.id)),
      // );
    }

    if (folder.documents && folder.documents.length > 0) {
      await Promise.all(
        folder.documents.map((doc) => this.docRepo.delete(doc.id)),
      );
    }
    return this.folderRepo.delete(id);
  }
}
