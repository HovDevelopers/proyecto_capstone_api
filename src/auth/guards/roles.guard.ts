import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../decoradores/roles.decodaror';
import { Rol } from '../enums/rol.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  
  canActivate(
    context: ExecutionContext,
  ): boolean {

    const rol = this.reflector.getAllAndOverride<Rol>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rol) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return user.id_rol === rol;
  }
}
