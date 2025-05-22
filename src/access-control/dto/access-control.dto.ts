import { IsString, IsNumber } from 'class-validator';
export class AccessControlDto {
  @IsNumber()
  docId: number;

  @IsNumber()
  userId: number;

  @IsString()
  permission: string;
}
