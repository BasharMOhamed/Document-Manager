import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AccessControl {
  @ApiProperty({ description: 'The unique identifier of the access control entry' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The ID of the user who has access' })
  @Column()
  userId: number;

  @ApiProperty({ description: 'The ID of the document being accessed' })
  @Column()
  docId: number;

  @ApiProperty({ 
    description: 'The permission level for the user on this document',
    example: 'read, write, admin'
  })
  @Column()
  permission: string;
}
