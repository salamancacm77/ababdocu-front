import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormatYYYYMMDD'
})
export class DateFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}


  transform(date: Date | string, format: string = 'yyyy-MM-dd'): string {
    if (date) {
      let year = date.toString().substring(0,4);
      let month = date.toString().substring(4,6);
      let day = date.toString().substring(6,8);
      date = new Date(parseInt(year),parseInt(month),parseInt(day)); 
      date.setDate(date.getDate());
      return this.datePipe.transform(date, format);

    } else {
      return 'ERROR'
    }
  }

}
 