import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../modelos/servicios/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Rol } from '../auth/enums/rol.enum';
import { TokenRol } from '../auth/decoradores/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
  @Post('login')
  login(@Body() login: login) {
    return this.authService.login(login);
  }

  /*
  @Get('perfil')
  @TokenRol(Rol.ADMIN)
  getPerfil(@Request() req: any){
    return this.authService.perfil(req.user);
  }*/
}
