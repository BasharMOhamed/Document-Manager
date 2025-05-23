import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Document } from 'src/documents/document.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Folder {
  @ApiProperty({
    description: 'The unique identifier of the folder',
    type: Number
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The name of the folder',
    example: 'Documents'
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The full path of the folder',
    example: '/root/documents'
  })
  @Column()
  path: string;

  @ApiPropertyOptional({
    description: 'The ID of the parent folder',
    type: Number,
    nullable: true
  })
  @Column({ nullable: true })
  parentId: number;

  @ApiPropertyOptional({
    description: 'The parent folder object',
    type: () => Folder
  })
  @ManyToOne(() => Folder, (folder) => folder.children, { onDelete: 'CASCADE' })
  parent: Folder;

  @ApiPropertyOptional({
    description: 'Array of child folders',
    type: () => [Folder]
  })
  @OneToMany(() => Folder, (folder) => folder.parent)
  children: Folder[];

  @ApiPropertyOptional({
    description: 'Array of documents in this folder',
    type: () => [Document]
  })
  @OneToMany(() => Document, (document) => document.parent)
  documents: Document[];
}
