import { Component, OnInit } from '@angular/core';
import { ClassesService } from "../../../services/classes/classes.service";
import { DdicService } from "../../../services/ddic/ddic.service";

@Component({
  selector: 'app-test-ddic',
  templateUrl: './test-ddic.component.html',
  styleUrls: ['./test-ddic.component.scss']
})
export class TestDDICComponent {
  testClassName: any = "ycl_tickets_manager_admin";
  testDdicObject: any = "uname";
  class: any;
  ddic: any;

  constructor(
    private classService: ClassesService,
    private ddicService: DdicService
    ) { 
    this.getInfoClass(); 
    //this.getInfoDDIC();
  }

  getInfoClass(){
    this.classService.testGetAllInfoClass(this.testClassName).subscribe( result => {
      this.class = result;
      console.log(this.class);
    },
    error => {
      console.log("Error aqui CLASS --> "+JSON.stringify(error));
    });
  }

  getInfoDDIC(){
    this.ddicService.testGetAllInfoDDIC(this.testDdicObject).subscribe( result => {
      this.ddic = result;
      console.log(this.ddic);
    },
    error => {
      console.log("Error aqui DDIC --> "+JSON.stringify(error));
    });
  }

}
