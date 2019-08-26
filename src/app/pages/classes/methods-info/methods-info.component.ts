import { Component, OnInit } from '@angular/core';
import { MethodsService } from "../../../services/classes/methods/methods.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

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

  className: any = "ycl_tickets_manager_admin";
  methods: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
  columnsToDisplay = ['ATTRIBUTE', 'LEVEL', 'DESCRIPTION', 'VISIBILITY'];
  expandedElement: attElement | null;

  constructor(
    private methodsService: MethodsService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.getClassMethods();
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }

  getClassMethods() {
    this.spinner.show();
    this.methodsService.getAllMethods(this.className).subscribe( result => {
      let meth = result["METHODS_DATA"];
      this.methods = meth;
      this.spinner.hide();
      console.log(meth);
    },
      error => {
        this.showSnackBar(this.warningMessage + " getClassMethods");
        console.log("Error getClassMethods() --> " + JSON.stringify(error));
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
