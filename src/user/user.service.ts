import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UsersRepo: Repository<User>) {}

  async createUser(email: string, password: string) {
    const existingUser = await this.UsersRepo.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.UsersRepo.create({ email, password: hashedPassword });
    return this.UsersRepo.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.UsersRepo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
