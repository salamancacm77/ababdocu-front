import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DdicService {
// Método constructor
  constructor(private httpClient: HttpClient) { }
  //Se crea el método que llama el servicio REST creado en ABAP
  testGetAllInfoDDIC(ddicObject): Observable<any> {
// Datos de autenticación para el servicio
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('sergiom:qwerty123')}`
      })
    };
// Se arma la URL del servicio con variables del ambiente de desarrollo
    const path = 'http://localhost:8000/35.184.254.201:8000/sap/bc/sofka/abapdocu/ddic/info/'+ ddicObject +'?sap-client=800';
// Se retorna la respuesta del servicio (JSON)
    return this.httpClient.get(path, httpOptions);

  }
}
