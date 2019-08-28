import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

import { InheritanceService } from "../../../services/classes/inheritance/inheritance.service";

import{ AppConstants} from '../../../constants'

@Component({
  selector: 'app-inheritance', 
  templateUrl: './inheritance.component.html',
  styleUrls: ['./inheritance.component.scss']
})
export class InheritanceComponent {
// Se declaran las variables a usar en el compoonente inheritance
  className: any = AppConstants.className;
  inheritance: any;
  redefinitions: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
// Método constructor
  constructor(
    private inheritanceService: InheritanceService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) 
  {
    this.getInheritanceByClass();
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
