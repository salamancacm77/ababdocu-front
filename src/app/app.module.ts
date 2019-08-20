import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestDDICComponent } from './components/tests/test-ddic/test-ddic.component';
import { ClassesService } from './services/classes/classes.service';
import { DdicService } from './services/ddic/ddic.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TestDDICComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    DdicService,
    ClassesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
