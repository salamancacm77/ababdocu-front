import { Component } from '@angular/core';
import { TypesInfoService } from "../../../services/classes/types-info/types-info.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

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

  className: any = "ycl_tickets_manager_admin";
  types: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
  displayedColumns = ['NAME', 'DESCR', 'TYPE'];
  expandedElement: typeElement | null;
  panelOpenState = false;

  constructor(
    private TypesInfoService : TypesInfoService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.getClassTypes();
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }

  getClassTypes() {

    this.spinner.show();

    this.TypesInfoService.getAllTypes(this.className).subscribe(result => {
      
     // let c_types:any[] = result;

      this.types = result;
      this.spinner.hide();
      console.log(result);

    },
      error => {
        this.showSnackBar(this.warningMessage + " getClassTypes");
        console.log("Error getClassTypes() --> " + JSON.stringify(error));
        this.spinner.hide();
      });
  }

} 

export interface typeElement {
  NAME: string;
  DESCR: string;
  TYPE: string;

}