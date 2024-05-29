import { SetMetadata } from "@nestjs/common";
import { Rol } from "../enums/rol.enum";

export const ROLES = 'roles';
export const Roles = (id_rol: Rol) => SetMetadata(ROLES, id_rol);