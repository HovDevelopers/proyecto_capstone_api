import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiFonasaService } from '../modelos/servicios/api_fonasa.service';
import { ApiFonasaController } from '../controladores/api_fonasa.controller';

@Module({
    imports: [HttpModule],
    providers: [ApiFonasaService],
    controllers: [ApiFonasaController]
})
export class ApiFonasaModule {}