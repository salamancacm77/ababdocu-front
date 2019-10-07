import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'methodDocu'
})
export class MethodDocuPipe implements PipeTransform {

  transform(originalJson: any[]): any {
    return null;
  }

}
