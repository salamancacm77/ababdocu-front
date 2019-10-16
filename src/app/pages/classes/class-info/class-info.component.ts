import { Component, Inject } from '@angular/core';
import { ClassesService } from "../../../services/classes/classes.service";
import { AttributesService } from "../../../services/classes/attributes/attributes.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClassInfoComponent {
  //Se declaran variables para uso en el componente class-info
  className: any = this.setClassName();
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
    @Inject(LOCAL_STORAGE) private localStorage: WebStorageService,
    private classService: ClassesService,
    private attributesService: AttributesService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getInfoClass();
    this.getClassAttributes();
    this.route.paramMap.subscribe(params => {
      console.log(params);
    })
    if(this.className == ''){
      this.router.navigate([''])
    }else{
      location.reload();
    }

  }
  // Método para mostrar mensaje en snackBar
  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }

  setClassName() {
    let classSet;
    classSet = localStorage.getItem("className");
    if (classSet === null || typeof classSet == undefined) {
      return '';
    } else {
      return classSet.replace(/["']/g, "");
    }
  }

  // Método para obtener datos de la clase consultada
  getInfoClass() {
    this.classService.getClassInfo(this.className).subscribe(result => {
      this.class = result;
      console.log(this.class);
    },
      error => {
        this.showSnackBar(this.warningMessage + " getInfoClass");
        console.log("Error getInfoClass() --> " + JSON.stringify(error));
      });
  }
  // Método para obtener los atributos de la clase consultada
  getClassAttributes() {
    // Se muestra el spinner de carga
    this.spinner.show();
    // Se invoca el servicio para obtener los datos
    this.attributesService.getClassAttributes(this.className).subscribe(result => {
      // Se extrae el objeto ATTRIBUTES del JSON
      let attrs = result["ATTRIBUTES"];
      // Se asigna el resultado a la variable correspondiente
      this.attributes = attrs;
      console.log(this.attributes);
      if (this.attributes.length > 0) {
        this.showAttributes = true;
      } else {
        this.showAttributes = false;
      }
      //Se oculta el spinner de carga
      this.spinner.hide();
    },
      error => {
        //Si ocurre un error se muestra en un snackBar y en la consola del navegador
        this.showSnackBar(this.warningMessage + " getClassAttributes");
        console.log("Error getClassAttributes() --> " + JSON.stringify(error));
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