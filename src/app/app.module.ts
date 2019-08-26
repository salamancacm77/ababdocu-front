import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassesService } from './services/classes/classes.service';
import { DdicService } from './services/ddic/ddic.service';
import { MethodsService } from "../app/services/classes/methods/methods.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClassInfoComponent } from './pages/classes/class-info/class-info.component';
import { MethodsInfoComponent } from './pages/classes/methods-info/methods-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassInfoComponent,
    MethodsInfoComponent,
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
    NgxSpinnerModule
  ],
  providers: [
    DdicService,
    ClassesService,
    MethodsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
