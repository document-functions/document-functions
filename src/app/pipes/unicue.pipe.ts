import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
  pure: true,
})
export class UniquePipe implements PipeTransform {
  transform(value: any[], propertyName: string): any[] {
    const uniqueValues = new Set();

    return value.filter((item) => {
      const propertyValue = item[propertyName];
      if (!uniqueValues.has(propertyValue)) {
        uniqueValues.add(propertyValue);
        return true;
      }
      return false;
    });
  }
}
