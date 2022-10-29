import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './models/category-data';
import { DataService } from './services/data-service.service';

@Pipe({
  name: 'filterCategories',
  pure: false
})
export class FilterCategoriesPipe implements PipeTransform {

  constructor() { }

  transform(value: Category[], filterCategories: Map<string, boolean>): Category[] {

    return value.filter(category => {
            console.log(filterCategories.get(category.id))
            return filterCategories.get(category.id);

            // return true;
            // TODO: fix filter
      // return (args[0] as boolean[])[category.id];
    })
  }

}
