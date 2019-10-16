import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from "../app/pages/global/inicio/inicio.component";
import {ClassInfoComponent  } from '../app/pages/classes/class-info/class-info.component';
import { MethodsInfoComponent } from '../app/pages/classes/methods-info/methods-info.component';
import { TypesInfoComponent } from '../app/pages/classes/types-info/types-info.component';
import { EventsInfoComponent } from '../app/pages/classes/events-info/events-info.component';
import { FriendsInfoComponent } from './pages/classes/friends-info/friends-info.component';
import { InheritanceComponent } from './pages/classes/inheritance/inheritance.component';

const routes: Routes = [
  {
    path: 'home',
    component: InicioComponent
  },
  {
    path: 'classInfo',
    component: ClassInfoComponent
  },
  {
    path: 'classInfo/:id',
    component: ClassInfoComponent
  },
  {
    path: 'classMethods',
    component: MethodsInfoComponent
  },
  {
    path: 'classTypes',
    component: TypesInfoComponent
  },
    {
    path: 'classEvents',
    component: EventsInfoComponent
  },
  {
    path: 'classFriends',
    component: FriendsInfoComponent
  },
  {
    path: 'classInheritance',
    component: InheritanceComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
