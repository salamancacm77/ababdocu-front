import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private httpClient: HttpClient) { }
  
  testGetAllInfoClass(className): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('sergiom:qwerty123')}`
      })
    };

    const path = 'http://localhost:8000/35.184.254.201:8000/sap/bc/sofka/abapdocu/class/info/'+ className +'?sap-client=800';

    return this.httpClient.get(path, httpOptions);

  }

}
