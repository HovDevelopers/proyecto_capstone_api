import { Module } from '@nestjs/common';
import { AuthController } from '../controladores/auth.controller';
import { AuthService } from '../modelos/servicios/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from 'src/modulos/usuario.module';
import { jwtConstantes } from '../auth/constants/jwt.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAcceso } from 'src/modelos/clases/log_acceso.entity';

@Module({
  imports:[UsuarioModule,
    JwtModule.register({
      global: true,
      secret: jwtConstantes.secret,
      signOptions: {expiresIn: '1h'}
    }), TypeOrmModule.forFeature([LogAcceso])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
