import { Component, OnInit } from '@angular/core';
import { ClassesService } from "../../../services/classes/classes.service";
import { AttributesService } from "../../../services/classes/attributes/attributes.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

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

  className: any = "ycl_tickets_manager_admin";
  class: any;
  attributes: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
  columnsToDisplay = ['ATTRIBUTE', 'LEVEL', 'DESCRIPTION', 'VISIBILITY'];
  expandedElement: attElement | null;

  constructor(
    private classService: ClassesService,
    private attributesService: AttributesService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
    ) { 
    this.getInfoClass();
    this.getClassAttributes();
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }

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

  getClassAttributes(){
    this.spinner.show();
    this.attributesService.getClassAttributes(this.className).subscribe( result => {
      let attrs = result["ATTRIBUTES"];
      let att = attrs[0];
      this.attributes = attrs;
      console.log(this.attributes);
      this.spinner.hide();
      //console.log(attrs);
    },
    error => {
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