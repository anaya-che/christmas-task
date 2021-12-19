import {
  IOptions, IToy,
} from '../../../types/types';
import GetToyCards from '../getToyCards';
import Sorting from './sorting';
import Filter from './filter';

class Options {
  options: IOptions;

  data: IToy[];

  filter: Filter;

  sort: string;

  sorting: Sorting;

  constructor(data: IToy[]) {
    this.data = data;
    this.options = {
      shape: ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'],
      color: ['белый', 'желтый', 'красный', 'синий', 'зелёный'],
      size: ['большой', 'средний', 'малый'],
      favorite: ['да', 'нет'],
      count: [1, 12],
      year: [1940, 2020],
    };
    this.filter = new Filter(this.options);
    this.sort = 'name-asc';
    this.sorting = new Sorting(this.data, this.sort);
  }

  start(): void {
    this.sorting.start();
    document.addEventListener('click', this.applySorting.bind(this));

    this.filter.start();
    document.addEventListener('click', this.applyOptions.bind(this));

    GetToyCards.getToys(this.data, this.options);
  }

  applySorting() {
    if (this.sort !== this.sorting.sort) {
      this.sort = this.sorting.sort;
      GetToyCards.getToys(this.data, this.options);
    }
  }

  applyOptions() {
    this.options = this.filter.options;
    GetToyCards.getToys(this.data, this.options);
  }
}

export default Options;
