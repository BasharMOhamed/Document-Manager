import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() user: UserCreateDto) {
    return this.userService.createUser(user.email, user.password);
  }

  @Post('/signin')
  async signin(@Body() user: UserCreateDto) {
    return this.userService.login(user.email, user.password);
  }
}
