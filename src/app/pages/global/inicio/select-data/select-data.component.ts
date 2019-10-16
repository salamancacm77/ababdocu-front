import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from "@angular/router"
import { ExistenceService } from "../../../../services/classes/existence/existence.service";

export interface Types {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select-data',
  templateUrl: './select-data.component.html',
  styleUrls: ['./select-data.component.scss']
})
export class SelectDataComponent implements OnInit {

  types: Types[] = [
    { value: '1', viewValue: 'Paquete' },
    { value: '2', viewValue: 'Clase' },
    { value: '3', viewValue: 'Programa' },
    { value: '4', viewValue: 'Módulo de Función' }
  ];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  className: any;
  objectType: any;
  classExistence: any;

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: WebStorageService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private existenceService: ExistenceService
  ) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  setObjectType() {
    return this.objectType;

  }

  async getObjectExistence() {
    // Se invoca el servicio para validar la existencia
    console.log("Validando existencia")
    await this.existenceService.getClassExistence(this.className).then(result => {

      // Se asigna el resultado a la variable correspondiente
      console.log("Yuju")
      console.log(result)
      console.log("Seteando classExistence")
      this.classExistence = result;
      console.log("La clase seteada es")
      console.log(this.classExistence)
      //Se oculta el spinner de carga
      //this.spinner.hide();

    },
      error => {
        //Si ocurre un error se muestra en un snackBar y en la consola del navegador
        //this.showSnackBar(this.warningMessage + " getClassMethods");
        console.log("Error getObjectExistence() --> " + error);
        //this.spinner.hide();
      });
  }

  async setName() {
    console.log("Empieza seteo")
    await this.getObjectExistence();
    console.log(this.className)
    console.log(this.objectType)

    switch (this.objectType) {
      case '2':
        console.log("Es una clase")
        if (this.classExistence == true) {
          console.log("Entro al IF")
          this.localStorage.set("className", this.className);
        } else {
          console.log("La clase no existe")
        }
        var name = localStorage.getItem("className");
        console.log("La clase en sesión es ")
        console.log(name)

        if (name === '' || name === null || typeof name === undefined) {
          console.log("Esta vacío")
          this.router.navigate(['/classInfo']);
          this.reloadPage();
        } else {
          this.router.navigate(['/classInfo']);
          this.reloadPage();
          //this.router.navigateByUrl('/classInfo');
        }
        break;

      default:
        break;
    }
  }

  reloadPage(){
    location.reload(true);
  }

}
