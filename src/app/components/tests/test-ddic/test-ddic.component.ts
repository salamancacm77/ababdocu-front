import { Component, OnInit } from '@angular/core';
import { ClassesService } from "../../../services/classes/classes.service";

@Component({
  selector: 'app-test-ddic',
  templateUrl: './test-ddic.component.html',
  styleUrls: ['./test-ddic.component.scss']
})
export class TestDDICComponent {
  testObject: any = "zd_tkstatus";
  ddic: any;

  constructor(private classesService: ClassesService) { 
    this.getInfoDDIC();
  }

  getInfoDDIC(){
    this.classesService.testGetAllInfoDDIC(this.testObject).subscribe( result => {
      this.ddic = result;
      console.log(this.ddic);
    },
    error => {
      console.log("Error aqui --> "+JSON.stringify(error));
    });
  }

}
