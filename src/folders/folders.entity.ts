import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Document } from 'src/documents/document.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => Folder, (folder) => folder.children, { onDelete: 'CASCADE' })
  parent: Folder;

  @OneToMany(() => Folder, (folder) => folder.parent)
  children: Folder[];

  @OneToMany(() => Document, (document) => document.parent)
  documents: Document[];
}
