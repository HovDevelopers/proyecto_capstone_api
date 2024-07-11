import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from '../modelos/servicios/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
  @Post('login')
  login(@Body() login: login, @Req() req: any) {
    return this.authService.login(login, req);
  }

  @Post('refresh_token')
  async refreshToken(@Body('refresh_token') token: string) {
    try {
      return this.authService.refreshToken(token);
    } catch (e) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED); 
    }
  }

}
