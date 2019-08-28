import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { MethodsService } from './services/classes/methods/methods.service';
import { EventsService } from './services/classes/events/events.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  className: any = "ycl_tickets_manager_admin";
  title = 'ABAPDocu';
  methods: any;
  showMenuOption: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private methodsService: MethodsService,
    private eventsService: EventsService
  ) {
    this.validateClassMethods();
    this.validateClassEvents();
  }

  validateClassMethods() {
    this.methodsService.getAllMethods(this.className).subscribe((result) => {
      if (result.METHODS_DATA.length > 0) {
        return this.showMenuOption = true;
      } else {
        return this.showMenuOption = false;
      }
    },(error) => {
      console.log("Error validateClassMethods() --> " + JSON.stringify(error));
    });
  }

  validateClassEvents() {
    this.eventsService.getAllEvents(this.className).subscribe((result) => {
      if (result.length > 0) {
        return this.showMenuOption = true;
      } else {
        return this.showMenuOption = false;
      }
    },(error) => {
      console.log("Error validateClassEvents() --> " + JSON.stringify(error));
    });
  }
}
