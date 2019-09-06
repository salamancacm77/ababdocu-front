import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { MethodsService } from './services/classes/methods/methods.service';
import { TypesInfoService } from './services/classes/types-info/types-info.service';
import { InheritanceService } from './services/classes/inheritance/inheritance.service';
import { FriendsService } from './services/classes/friends/friends.service';
import { EventsService } from './services/classes/events/events.service';
import { AppConstants} from '../app/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
// Se declaran las variables para usar en el componente principal
  className: any = AppConstants.className;
  title = 'ABAPDocu';
  methods: any;
  showMethodsOption: boolean;
  showInheritanceOption: boolean;
  showEventsOption: boolean;
  showMenuTypes: boolean;
  showFriendsOption: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );
// Método constructor
  constructor(
    private breakpointObserver: BreakpointObserver,
    private methodsService: MethodsService,
    private TypesInfoService: TypesInfoService,
    private eventsService: EventsService,
    private friendsService: FriendsService,
    private inhetitanceService: InheritanceService
  ) {
    this.validateClassMethods();
    this.validateClasstypes();
    this.validateClassEvents();
    this.validateClassFriends();
    this.validateClassInheritance();
  }

  validateClassMethods() {
    this.methodsService.getAllMethods(this.className).subscribe((result) => {
      console.log(result.METHODS_DATA.length);
      if (result.METHODS_DATA.length > 0) {
        return this.showMethodsOption = true;
      } else {
        return this.showMethodsOption = false;
      }
    }, (error) => {
      console.log("Error validateClassMethods() --> " + JSON.stringify(error));
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
      console.log("Error validateClassTypes() --> " + JSON.stringify(error));
    });
  }
  validateClassInheritance() {
    this.inhetitanceService.getClassInheritance(this.className).subscribe((result) => {
      if (result.INHERITANCE.CLASS_UP !== '') {
        return this.showInheritanceOption = true;
      } else {
        return this.showInheritanceOption = false;
      }
    },(error) => {
      console.log("Error validateClassInheritance() --> " + JSON.stringify(error));
    });
  }

  validateClassEvents() {
    this.eventsService.getAllEvents(this.className).subscribe((result) => {
      if (result.length > 0) {
        return this.showEventsOption = true;
      } else {
        return this.showEventsOption = false;
      }
      console.log(result);
    },(error) => {
      console.log("Error validateClassEvents() --> " + JSON.stringify(error));
    });
  }

  validateClassFriends() {
    this.friendsService.getClassFriends(this.className).subscribe((result) => {
      if (result.FRIENDSHIPS.length > 0) {
        return this.showFriendsOption = true;
      } else {
        return this.showFriendsOption = false;
      }
    }, (error) => {
      console.log("Error validateClassFriends() --> " + JSON.stringify(error));
    });
  }

}
