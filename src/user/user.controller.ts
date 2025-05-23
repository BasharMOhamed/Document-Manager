import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dtos/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user account' })
  @ApiBody({
    type: UserCreateDto,
    description: 'User credentials for registration'
  })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created',
    type: User
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input (e.g., invalid email format)'
  })
  @Post('/signup')
  async signUp(@Body() user: UserCreateDto) {
    return this.userService.createUser(user.email, user.password);
  }

  @ApiOperation({ summary: 'Sign in to an existing user account' })
  @ApiBody({
    type: UserCreateDto,
    description: 'User credentials for login'
  })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully logged in',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          description: 'JWT access token',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials'
  })
  @Post('/signin')
  async signin(@Body() user: UserCreateDto) {
    return this.userService.login(user.email, user.password);
  }
}
