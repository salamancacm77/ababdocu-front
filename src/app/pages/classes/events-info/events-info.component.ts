import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsService } from 'src/app/services/classes/events/events.service';

@Component({
  selector: 'app-events-info',
  templateUrl: './events-info.component.html',
  styleUrls: ['./events-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EventsInfoComponent {

  className: any = "ZCL_DOC_GENERATOR_SRICO";
  events: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
  displayedColumns = ['NAME', 'DESCR', 'TYPE'];
  expandedElement: eventElement | null;
  panelOpenState = false;

  constructor(
    private eventsService: EventsService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.getClassEvents();
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }

  getClassEvents() {

    this.spinner.show();

    this.eventsService.getAllEvents(this.className).subscribe(result => {
      
      //let event:any[] = result["EVENTS_DATA"];

      this.events = result;
      this.spinner.hide();
      console.log(result);

    },
      error => {
        this.showSnackBar(this.warningMessage + " getClassEvents");
        console.log("Error getClassEvents() --> " + JSON.stringify(error));
        this.spinner.hide();
      });
  }

}

export interface eventElement {
  NAME: string;
  DESCR: string;
  TYPE: string;
}
