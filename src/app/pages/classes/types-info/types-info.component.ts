import { Component, Inject } from '@angular/core';
import { TypesInfoService } from "../../../services/classes/types-info/types-info.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants} from '../../../constants';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-types-info',
  templateUrl: './types-info.component.html',
  styleUrls: ['./types-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TypesInfoComponent {
// Se declaran las variables a usar en el componente methods-info
  className: any = this.setClassName();
  types: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
  displayedColumns = ['NAME', 'DESCRIPTION', 'VISIBILITY', 'STATE', 'AUTHOR', 'CREATED', 'CHANGEBY', 'TYPIF'];
  panelOpenState = false;
// Método constructor
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: WebStorageService,
    private TypesInfoService : TypesInfoService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.getClassTypes();
    if(this.className == ''){
      this.router.navigate([''])
    }
  }
  
  setClassName(){
    let classSet;
    classSet  = localStorage.getItem("className");
    if(classSet === null || typeof classSet == undefined){
      return '';
    }else{
    return classSet.replace(/["']/g, "");
    }
  }

// Método para mostrar mensaje en snackBar
  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }
// Método para obtener los tipos de una clase
  getClassTypes() {
// Se muestra el spinner de carga
    this.spinner.show();
// Se invoca el servicio para obtener los typos
    this.TypesInfoService.getAllTypes(this.className).subscribe(result => {
     //let c_types:any[] = result[0];

      this.types = result;
      this.spinner.hide();
      console.log(result);

    },
      error => {
        //Si ocurre un error se muestra en un snackBar y en la consola del navegador
        this.showSnackBar(this.warningMessage + " getClassTypes");
        console.log("Error getClassTypes() --> " + JSON.stringify(error));
        this.spinner.hide();
      });
  }

}

export interface typeElement {
  NAME: string;
  DESCRIPTION: string;
  VISIBILITY: string;
  STATE: string;
  AUTHOR: string;
  CREATED: string;
  CHANGEBY: string;
  TYPIF: string;
}