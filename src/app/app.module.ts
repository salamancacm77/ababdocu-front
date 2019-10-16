import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'

/***
 * UI
***/

/***
 * Bootstrap
***/
import {NgbModule, NgbProgressbarModule, NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

/* Angular Material */
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatTreeModule} from '@angular/material/tree';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';

/***
 * Routes
***/
import { AppRoutingModule } from './app-routing.module';

/***
 * Components
***/
import { AppComponent } from './app.component';

/* Pages */
import { ClassInfoComponent } from './pages/classes/class-info/class-info.component';
import { MethodsInfoComponent } from './pages/classes/methods-info/methods-info.component';
import { EventsInfoComponent } from './pages/classes/events-info/events-info.component';
import { FriendsInfoComponent } from './pages/classes/friends-info/friends-info.component';
import { TypesInfoComponent } from './pages/classes/types-info/types-info.component';
import { InheritanceComponent } from './pages/classes/inheritance/inheritance.component';
import { InicioComponent } from './pages/global/inicio/inicio.component';
import { SelectDataComponent } from './pages/global/inicio/select-data/select-data.component';

/***
 * Service Providers
***/
import { DdicService } from './services/ddic/ddic.service';
import { ClassesService } from './services/classes/classes.service';
import { MethodsService } from '../app/services/classes/methods/methods.service';
import { TypesInfoService } from '../app/services/classes/types-info/types-info.service';
import { EventsService } from './services/classes/events/events.service';
import { DatePipe } from '@angular/common';

/***
 * Pipes
***/
import { DateFormatPipe } from './pipes/date-format/date-format.pipe';

/***
 * Others
***/
import { PrismModule } from '@ngx-prism/core';
import {ProgressBarModule} from "angular-progress-bar";
import { StorageServiceModule} from 'angular-webstorage-service';




@NgModule({
  declarations: [
    AppComponent,
    ClassInfoComponent,
    MethodsInfoComponent,
    TypesInfoComponent,
    EventsInfoComponent,
    InheritanceComponent,
    DateFormatPipe,
    FriendsInfoComponent,
    InicioComponent,
    SelectDataComponent,
  ],
  entryComponents: [
    SelectDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    LayoutModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatChipsModule,
    MatTableModule,
    NgxSpinnerModule,
    MatExpansionModule,
    MatDividerModule,
    MatTreeModule,
    MatGridListModule,
    MatTabsModule,
    PrismModule,
    NgbModule,
    NgbProgressbarModule,
    ProgressBarModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    StorageServiceModule
  ],
  providers: [
    DdicService,
    ClassesService,
    MethodsService,
    TypesInfoService,
    EventsService,
    DatePipe,
    DateFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
