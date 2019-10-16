import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectDataComponent } from "../inicio/select-data/select-data.component";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  type: string;
  name: string;
  dialogRef: any;

  constructor(
    public dialog: MatDialog
  ) {

  }

  openSelectData(): void {
      this.dialogRef = this.dialog.open(SelectDataComponent, {
      width: '75%',
      height: '75%'
    });
  }

  close(){
    this.dialogRef.close();
  }

}

