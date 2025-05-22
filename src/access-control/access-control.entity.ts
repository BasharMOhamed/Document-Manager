import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccessControl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  docId: number;

  @Column()
  permission: string;
}
