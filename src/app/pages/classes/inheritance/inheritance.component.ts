import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { InheritanceService } from "../../../services/classes/inheritance/inheritance.service";
import{ AppConstants} from '../../../constants'
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-inheritance',
  templateUrl: './inheritance.component.html',
  styleUrls: ['./inheritance.component.scss']
})
export class InheritanceComponent {
// Se declaran las variables a usar en el compoonente inheritance
  className: any = this.setClassName();
  inheritance: any;
  redefinitions: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
// Método constructor
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: WebStorageService,
    private inheritanceService: InheritanceService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private router: Router
  ) 
  {
    this.getInheritanceByClass();
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
// Método para obtener los datos de herencia de una clase
  getInheritanceByClass(){
    // Se muestra el spinner de carga
    this.spinner.show();
    // Se invoca el servicio para obtener los datos de herencia
    this.inheritanceService.getClassInheritance(this.className).subscribe( result => {
      // Se extrae el objeto REDEFINITIONS del JSON
      let redf:any[] = result["REDEFINITIONS"];
      // Se asigna el resultado a las variablescorrespondientes
      this.inheritance = result;
      this.redefinitions = redf;
      console.log(this.inheritance);
      console.log(redf);
      //Se oculta el spinner de carga
      this.spinner.hide();
    },
    error => {
      //Si ocurre un error se muestra en un snackBar y en la consola del navegador
      this.showSnackBar(this.warningMessage+" getInheritanceClass");
      console.log("Error getInheritanceClass() --> "+JSON.stringify(error));
      this.spinner.hide();
    });
  }

}
