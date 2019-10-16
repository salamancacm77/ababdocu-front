import { Component, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { ClassesService } from "../app/services/classes/classes.service";
import { MethodsService } from './services/classes/methods/methods.service';
import { TypesInfoService } from './services/classes/types-info/types-info.service';
import { InheritanceService } from './services/classes/inheritance/inheritance.service';
import { EventsService } from './services/classes/events/events.service';
import { AppConstants} from '../app/constants';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
// Se declaran las variables para usar en el componente principal
  className: any = this.setClassName();
  title = 'ABAPDocu';
  methods: any;
  showClassOption: boolean;
  showMethodsOption: boolean;
  showInheritanceOption: boolean;
  showEventsOption: boolean;
  showMenuTypes: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );
// Método constructor
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: WebStorageService,
    private classService: ClassesService,
    private breakpointObserver: BreakpointObserver,
    private methodsService: MethodsService,
    private TypesInfoService: TypesInfoService,
    private eventsService: EventsService,
    private inhetitanceService: InheritanceService
  ) {
    this.validateClass();
    this.validateClassMethods();
    this.validateClasstypes();
    this.validateClassEvents();
    this.validateClassInheritance();
  }

  setClassName(){
    let classSet;
    classSet  = localStorage.getItem("className");
    if(classSet === null){
      return '';
    }else{
    return classSet.replace(/["']/g, "");
    }
  }

  validateClass() {
    this.classService.getClassInfo(this.className).subscribe((result) => {
      if (result.CLASS_DATA.NAME !== '') {
        return this.showClassOption = true;
      } else {
        return this.showClassOption = false;
      }
    },(error) => {
      //console.log("Error validateClass() --> " + JSON.stringify(error));
    });
  }

  validateClassMethods() {
    this.methodsService.getAllMethods(this.className).subscribe((result) => {
      if (result.METHODS_DATA.length > 0) {
        return this.showMethodsOption = true;
      } else {
        return this.showMethodsOption = false;
      }
    },(error) => {
      //console.log("Error validateClassMethods() --> " + JSON.stringify(error));
    });
  }

  validateClasstypes() {
    this.TypesInfoService.getAllTypes(this.className).subscribe((result) => {
      if (result.length > 0) {
        return this.showMenuTypes = true;
      } else {
        return this.showMenuTypes = false;
      }
    },(error) => {
      //console.log("Error validateClassTypes() --> " + JSON.stringify(error));
    });
  }
  validateClassInheritance() {
    this.inhetitanceService.getClassInheritance(this.className).subscribe((result) => {
      if (result.INHERITANCE.CLASS_UP.length > 0) {
        return this.showInheritanceOption = true;
      } else {
        return this.showInheritanceOption = false;
      }
    },(error) => {
      //console.log("Error validateClassInheritance() --> " + JSON.stringify(error));
    });
  }

  validateClassEvents() {
    this.eventsService.getAllEvents(this.className).subscribe((result) => {
      if (result.length > 0) {
        return this.showEventsOption = true;
      } else {
        return this.showEventsOption = false;
      }
    },(error) => {
      //console.log("Error validateClassEvents() --> " + JSON.stringify(error));
    });
  }
}
