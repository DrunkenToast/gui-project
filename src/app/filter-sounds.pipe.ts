import { Pipe, PipeTransform } from '@angular/core';
import { Sound } from './models/sound-data';

@Pipe({
  name: 'filterSounds'
})
export class FilterSoundsPipe implements PipeTransform {

  transform(value: Sound[], keyword: string, categoryID: string): Sound[] {
    return (value as Sound[])
      .filter(sound => sound.title.toLowerCase().includes((keyword).toString().toLowerCase()))
      .filter((a) => a.categoryID === categoryID);
  }

}
