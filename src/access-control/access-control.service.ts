import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessControl } from './access-control.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccessControlService {
  constructor(
    @InjectRepository(AccessControl)
    private accessControlRepo: Repository<AccessControl>,
  ) {}

  async addPermission(docId: number, userId: number, permission: string) {
    const newPermission = this.accessControlRepo.create({
      docId,
      userId,
      permission,
    });
    return this.accessControlRepo.save(newPermission);
  }

  async editPermission(docId: number, userId: number, newPermission: string) {
    const existingPermission = await this.accessControlRepo.findOneBy({
      docId,
      userId,
    });
    if (!existingPermission) {
      throw new NotFoundException('Permission not found');
    }
    existingPermission.permission = newPermission;
    return this.accessControlRepo.save(existingPermission);
  }

  async deletePermission(permissionId: number) {
    return this.accessControlRepo.delete(permissionId);
  }
}
