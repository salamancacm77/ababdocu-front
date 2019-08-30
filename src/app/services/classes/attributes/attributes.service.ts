import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {
// Método constructor
  constructor(private httpClient: HttpClient) { }
  // Se crea el método que llama el servicio REST creado en ABAP
  getClassAttributes(className): Observable<any> {
// Datos de autenticación para el servicio
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(api.user + ':' + api.passUser)}`
      })
    };
// Se arma la URL del servicio con variables del ambiente de desarrollo
    const path = api.urlLocalhost + api.urlServer + api.mainService + api.classAttributes + className + api.mandt;
// Se retorna la respuesta del servicio (JSON)
    return this.httpClient.get(path, httpOptions);

  }
}
