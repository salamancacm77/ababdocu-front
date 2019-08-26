import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassInfoComponent  } from "../app/pages/classes/class-info/class-info.component";
import { MethodsInfoComponent } from "../app/pages/classes/methods-info/methods-info.component";

const routes: Routes = [
  {
    path: 'classInfo',
    component: ClassInfoComponent
  },
  {
    path: 'classMethods',
    component: MethodsInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
