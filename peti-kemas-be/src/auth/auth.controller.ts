import { Controller, Post, Body, ValidationPipe, Logger } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  authUsers(
    @Body('type') type: string,
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    let query;
    const { username } = authCredentialsDto;

    switch (type) {
      case 'signup':
        query = this.authService.signUp(authCredentialsDto);
        break;

      case 'signin':
        query = this.authService.signIn(authCredentialsDto);
        break;

      case 'search':
        query = this.authService.findByUsername(username);
        break;

      case 'users':
        // this.logger.log(type, 'Ke sini get all');
        query = this.authService.getAllUsers();
        break;

      default:
        query = 'NOT FOUND';
        break;
    }

    return query;
  }
}
