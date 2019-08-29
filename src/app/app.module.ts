import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
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

import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule  } from '@covalent/core/steps';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClassInfoComponent } from './pages/classes/class-info/class-info.component';
import { MethodsInfoComponent } from './pages/classes/methods-info/methods-info.component';
import { EventsInfoComponent } from './pages/classes/events-info/events-info.component';

import { DdicService } from './services/ddic/ddic.service';
import { ClassesService } from './services/classes/classes.service';
import { MethodsService } from "../app/services/classes/methods/methods.service";
import { TypesInfoService } from "../app/services/classes/types-info/types-info.service";
import { TypesInfoComponent } from './pages/classes/types-info/types-info.component';
import { EventsService } from './services/classes/events/events.service';
import { DatePipe } from '@angular/common';

import { InheritanceComponent } from './pages/classes/inheritance/inheritance.component';
import { DateFormatPipe } from './pipes/date-format.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ClassInfoComponent,
    MethodsInfoComponent,
    TypesInfoComponent,
    EventsInfoComponent,
    InheritanceComponent,
    DateFormatPipe,
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
    CovalentLayoutModule,
    CovalentStepsModule,
    MatGridListModule
  ],
  providers: [
    DdicService,
    ClassesService,
    MethodsService,
    TypesInfoService,
    EventsService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
