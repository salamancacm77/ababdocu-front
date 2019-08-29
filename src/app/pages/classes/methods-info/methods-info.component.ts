import { Component, OnInit } from '@angular/core';
import { MethodsService } from "../../../services/classes/methods/methods.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import{ AppConstants} from '../../../constants'

@Component({
  selector: 'app-methods-info',
  templateUrl: './methods-info.component.html',
  styleUrls: ['./methods-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MethodsInfoComponent {
// Se declaran las variables a usar en el componente methods-info
  className: any = AppConstants.className;
  methods: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
  displayedColumns = ['NAME', 'DESCR', 'TYPE'];
  panelOpenState = false;
  showParameters: boolean;
// Método constructor
  constructor(
    private methodsService: MethodsService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.getClassMethods();
  }
// Método para mostrar mensaje en snackBar
  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }
// Método para obtener los métodos de una clase
  getClassMethods() {
// Se muestra el spinner de carga
    this.spinner.show();
// Se invoca el servicio para obtener los métodos
    this.methodsService.getAllMethods(this.className).subscribe(result => {
      // Se extrae el objeto METHODS_DATA del JSON
      let meth:any[] = result["METHODS_DATA"];
// Se asigna el resultado a la variable correspondiente
      this.methods = meth;
      //Se oculta el spinner de carga
      this.spinner.hide();
      console.log(meth);

    },
      error => {
        //Si ocurre un error se muestra en un snackBar y en la consola del navegador
        this.showSnackBar(this.warningMessage + " getClassMethods");
        console.log("Error getClassMethods() --> " + JSON.stringify(error));
        this.spinner.hide();
      });
  }

}

export interface methElement {
  NAME: string;
  DESCR: string;
  TYPE: string;

}
