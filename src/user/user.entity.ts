import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    type: Number
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com'
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    writeOnly: true
  })
  @Column()
  password: string;
}
