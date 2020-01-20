import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async findByUsername(search): Promise<void> {
    const found = this.userRepository.findOne({
      select: ['username'],
      where: { username: search },
    });

    // this.logger.log(search);
    // this.logger.log(found);
  }

  async getAllUsers(): Promise<User[]> {
    const query = this.userRepository.find();
    return query;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{
    code: number;
    accessToken: string;
    title: string;
    message: string;
  }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    // this.logger.log(username);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    const code = 201;
    const title = 'Sign In';
    const message = 'Sign In Success';
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { code, accessToken, title, message };
  }
}
