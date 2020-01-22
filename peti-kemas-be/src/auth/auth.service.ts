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
    // const username = await this.userRepository.validateUserPassword(
    //   authCredentialsDto,
    // );

    const { username, password } = authCredentialsDto;

    // this.logger.log(username, 'Username');

    if (username !== 'admin' || password !== 'admin') {
      throw new UnauthorizedException({
        code: 301,
        title: 'Login Error',
        message: 'Invalid credentials',
      });
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    const code = 201;
    const title = 'Sign In';
    const message = 'Anda berhasil login';
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { code, accessToken, title, message };
  }
}
