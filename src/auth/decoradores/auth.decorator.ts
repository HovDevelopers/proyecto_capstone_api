import { applyDecorators } from '@nestjs/common';
import { Rol } from '../enums/rol.enum';
import { Roles } from './roles.decodaror';
import { ApiBearerAuth } from '@nestjs/swagger';

export function TokenRol(rol: Rol) {
  return applyDecorators(
    Roles(rol),
    ApiBearerAuth(),
  );
}