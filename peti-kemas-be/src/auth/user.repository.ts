import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('AuthoController');

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const found = await this.findOne({ username });

    this.logger.log(found, 'Andri found ngga sih');

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return user;
    } catch (error) {
      this.logger.log(error, 'Error');
      if (error.errno === 1062) {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        this.logger.log(error, 'Error Joko');
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
