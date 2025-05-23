import { Folder } from 'src/folders/folders.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Document {
  @ApiProperty({ description: 'The unique identifier of the document' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The content of the document stored as a Buffer' })
  @Column()
  content: Buffer;

  @ApiProperty({ description: 'The title of the document' })
  @Column()
  title: string;

  @ApiPropertyOptional({ description: 'Optional description of the document' })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ description: 'The file type/extension of the document' })
  @Column()
  type: string;

  @ApiPropertyOptional({ 
    description: 'Optional array of tags associated with the document',
    type: [String]
  })
  @Column('simple-array', { nullable: true })
  tags?: string[];

  @ApiPropertyOptional({ 
    description: 'The ID of the parent folder',
    type: Number
  })
  @Column({ nullable: true })
  parentId: number;

  @ApiPropertyOptional({ 
    description: 'The parent folder object',
    type: () => Folder
  })
  @ManyToOne(() => Folder, (folder) => folder.documents, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: Folder;
}
