import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './models/category-data';
import { DataService } from './services/data-service.service';

@Pipe({
  name: 'filterCategories'
})
export class FilterCategoriesPipe implements PipeTransform {

  constructor(private data: DataService) { }

  transform(value: Category[], ...args: unknown[]): Category[] {
    return value.filter(category => {
      (args[0] as Category[])[category.id] || true;
    })
  }

}
