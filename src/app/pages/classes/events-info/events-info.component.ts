import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsService } from 'src/app/services/classes/events/events.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from "@angular/router";

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

  className: any = this.setClassName();
  events: any;
  durationWarning = 5;
  warningMessage: string = 'Ocurrió un error obteniendo los datos del servicio';
  displayedColumns = ['EVENT', 'DESCRIPTION', 'LEVEL', 'VISIBILITY', 'CREATED_BY', 'CREATED_ON'];
  panelOpenState = false;

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: WebStorageService,
    private eventsService: EventsService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.getClassEvents();
    if(this.className == ''){
      this.router.navigate([''])
    }
  }

  setClassName(){
    let classSet;
    classSet  = localStorage.getItem("className");
    if(classSet === null || typeof classSet == undefined){
      return '';
    }else{
    return classSet.replace(/["']/g, "");
    }
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }

  getClassEvents() {

    this.spinner.show();

    this.eventsService.getAllEvents(this.className).subscribe(result => {
      
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
  EVENT: string;
  DESCRIPTION: string;
  LEVEL: string;
  VISIBILITY: string;
  CREATED_BY: string;
  CREATED_ON: string;
}
