import { UseGuards, applyDecorators } from '@nestjs/common';
import { Rol } from '../enums/rol.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decodaror';
import { ApiBearerAuth } from '@nestjs/swagger';

export function TokenRol(rol: Rol) {
  return applyDecorators(
    Roles(rol),
    UseGuards(RolesGuard),
    ApiBearerAuth(),
  );
}