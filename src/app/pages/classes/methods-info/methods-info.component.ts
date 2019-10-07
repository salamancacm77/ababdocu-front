import { Component, OnInit, Input } from '@angular/core';
import { MethodsService } from "../../../services/classes/methods/methods.service";
import { SourcecodeService } from "../../../services/classes/methods/sourcecode/sourcecode.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from '../../../constants';
import { DateFormatPipe } from "../../../pipes/date-format/date-format.pipe";

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
  colorPercentDocBar = '#488aff';
  numberPercentDocBar:any = 20;
  verifyMethodDesc: any;
  counterElementsDoc: any;
  elementsForEvaluation: any;
  suggestedMethodCode: any[];
  methods: any;
  methodCode: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
  displayedColumns = ['NAME', 'DESCR', 'TYPE'];
  panelOpenState = false;
  showParameters: boolean;

  // Método constructor
  constructor(
    private methodsService: MethodsService,
    private sourceCodeService: SourcecodeService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private datePipe: DateFormatPipe
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
      let meth: any[] = result["METHODS_DATA"];
      // Se asigna el resultado a la variable correspondiente
      this.methods = meth;
      //Se oculta el spinner de carga
      this.spinner.hide();
      //console.log(meth);
      this.suggestedMethodCode = this.evaluateMethodDocu(meth);
      console.log("Imprimo Modificado")
      console.log(this.suggestedMethodCode)

    },
      error => {
        //Si ocurre un error se muestra en un snackBar y en la consola del navegador
        this.showSnackBar(this.warningMessage + " getClassMethods");
        console.log("Error getClassMethods() --> " + JSON.stringify(error));
        this.spinner.hide();
      });
  }

  evaluateMethodDocu(serviceResponse: any[]) {
    var forCodeArray = new Array();
    forCodeArray = JSON.parse(JSON.stringify(serviceResponse));
    var starComment = "*";
    var quoteComment = "\"";
    var methodStart = "METHOD";
    var counterMethodDesc = 0;
    var counterParamsDesc = 0;
    var totalDescriptions = 0;

    console.log("Imprimo copia")
    console.log(forCodeArray)
    forCodeArray.forEach(element => {
      /*console.log("Primera linea")
      console.log(element.CODE[0])*/
      console.log("Metodo " + element.NAME)

      if(element.DESCRIPTION == ""){
        console.log("Este método no tiene descripción")
      }else {
        console.log("Este método si tiene descripción")
        this.verifyMethodDesc = "Este método posee descripción";
        counterMethodDesc = 1;
      }

      element.PARAMETER.forEach(paramElement => {
        if (paramElement.DESCRIP == "") {
          console.log("El parámetro " + paramElement.NAME + " NO tiene descripción");
        } else {
          console.log("El parámetro " + paramElement.NAME + " SI tiene descripción");
          counterParamsDesc = counterParamsDesc + 1;
        }

      });
      console.log("Tiene " + counterParamsDesc + " descripciones llenas")

      element.CODE.forEach((line,i) => {
        if (line.LINE.includes(starComment) /*|| line.LINE.includes(quoteComment)*/) {
          delete line.LINE;
          element.CODE.splice(i,1);
        } else {
          line.LINE = line.LINE;
        }

      });
      element.CODE.unshift(
        { "LINE": "*---------------------------------------------------------------------------------------*" },
        { "LINE": "* Método: " + element.NAME },
        { "LINE": "* Descripción método: " + element.DESCRIPTION },
        { "LINE": "* Programa: " + element.PROGRAM },
        { "LINE": "* Autor: " + element.AUTHOR },
        { "LINE": "* Fecha de creación: " + this.transformDate(element.CREATED_ON) },
        { "LINE": "*---------------------------------------------------------------------------------------*" },
        { "LINE": "" });

      console.log("Fuera del IF")
      console.log(element.CODE)
      totalDescriptions = counterMethodDesc + counterParamsDesc;
      console.log("El total de descripciones es "+totalDescriptions)
      // element.push([
      //   {"TOTALDESC": totalDescriptions }
      // ])
      /*console.log("Imprimo percent bar por metodo")
      console.log(this.numberPercentDocBar)
      counterMethodDesc = 0;
      counterParamsDesc = 0;*/
    });
    /*console.log("Imprimo percent bar completo")
      console.log(this.numberPercentDocBar)*/
    return forCodeArray;
  }

  transformDate(date) {
    return this.datePipe.transform(date);
  }
}

export interface methElement {
  NAME: string;
  DESCR: string;
  TYPE: string;
}

