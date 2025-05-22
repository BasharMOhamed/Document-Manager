import { Folder } from 'src/folders/folders.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: Buffer;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  type: string;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => Folder, (folder) => folder.documents, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: Folder;
}
