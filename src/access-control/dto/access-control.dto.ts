import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessControlDto {
  @ApiProperty({ 
    description: 'The ID of the document to set permissions for',
    type: Number
  })
  @IsNumber()
  docId: number;

  @ApiProperty({ 
    description: 'The ID of the user to grant permissions to',
    type: Number
  })
  @IsNumber()
  userId: number;

  @ApiProperty({ 
    description: 'The permission level to set',
    example: 'read, write, admin',
    type: String
  })
  @IsString()
  permission: string;
}
