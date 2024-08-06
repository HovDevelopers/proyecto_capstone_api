import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiFonasaService {
  public apiUrl: string = 'https://api-pacientes.hospitaldeovalle.cl';

  constructor(private httpService: HttpService) {}

  //Api-paciente
  obtenerPacienteApi(termino: string): Observable<AxiosResponse<any>> {
    const auth = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from('admin:Cb7A506a').toString('base64'),
      },
    };
    console.log("entro al obtener paciente Api");


    const url = `${this.apiUrl}/pacientes/buscar/${termino}`;
    return this.httpService.post(url, {}, auth).pipe(
      map(response => response.data)
    );
  }

  //api-consulta web service Fonasa
  obtenerPacienteFonasa(termino: string): Observable<AxiosResponse<any>> {
    const auth = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from('admin:Cb7A506a').toString('base64'),
      },
    };
    console.log("entro al obtener paciente fonasa");
    const url = `${this.apiUrl}/pacientes/fonasa/${termino}`;
    return this.httpService.post(url, {}, auth).pipe(
      map(response => response.data)
    );
  }
}