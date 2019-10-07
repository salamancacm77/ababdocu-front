import { Component, OnInit } from '@angular/core';
import { ClassesService } from "../../../services/classes/classes.service";
import { AttributesService } from "../../../services/classes/attributes/attributes.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants} from '../../../constants'
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClassInfoComponent{
//Se declaran variables para uso en el componente class-info
  className: any = AppConstants.className;
  class: any;
  attributes: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
  columnsToDisplay = ['ATTRIBUTE', 'LEVEL', 'DESCRIPTION', 'VISIBILITY'];
  expandedElement: attElement | null;
  displayedColumns = ['ATTRIBUTE', 'LEVEL', 'DESCRIPTION', 'VISIBILITY', 'TYPING', 'ASSOCIATEDTYPE'];
  showAttributes: boolean;
// Método constructor
  constructor(
    private classService: ClassesService,
    private attributesService: AttributesService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
    ) { 
    this.getInfoClass();
    this.getClassAttributes();
    this.route.paramMap.subscribe(params => {
      console.log(params);
    })

  }
// Método para mostrar mensaje en snackBar
  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }
// Método para obtener datos de la clase consultada
  getInfoClass(){
    this.classService.getClassInfo(this.className).subscribe( result => {
      this.class = result;
      console.log(this.class);
    },
    error => {
      this.showSnackBar(this.warningMessage+" getInfoClass");
      console.log("Error getInfoClass() --> "+JSON.stringify(error));
    });
  }
// Método para obtener los atributos de la clase consultada
  getClassAttributes(){
    // Se muestra el spinner de carga
    this.spinner.show();
    // Se invoca el servicio para obtener los datos
    this.attributesService.getClassAttributes(this.className).subscribe( result => {
      // Se extrae el objeto ATTRIBUTES del JSON
      let attrs = result["ATTRIBUTES"];
      // Se asigna el resultado a la variable correspondiente
      this.attributes = attrs;
      console.log(this.attributes);
      if(this.attributes.length>0){
        this.showAttributes = true;
      }else{
        this.showAttributes = false;
      }
      //Se oculta el spinner de carga
      this.spinner.hide();
    },
    error => {
      //Si ocurre un error se muestra en un snackBar y en la consola del navegador
      this.showSnackBar(this.warningMessage+" getClassAttributes");
      console.log("Error getClassAttributes() --> "+JSON.stringify(error));
      this.spinner.hide();
    });
  }

}

export interface attElement {
  attribute: string;
  level: string;
  visibility: string;
  readonly: string;
  typing: string;
  associatedType: string;
  description: string;
  initialvalue: string;
  created_by: string;
  created_on: string;
  code: string;
}