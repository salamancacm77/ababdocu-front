import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { api } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(private httpClient: HttpClient) { }
  
  getClassAttributes(className): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(api.user+':'+api.passUser)}`
      })
    };

    const path = api.urlLocalhost + api.urlServer + api.mainService + api.classAttributes + className + api.mandt;

    return this.httpClient.get(path, httpOptions);

  }
}
