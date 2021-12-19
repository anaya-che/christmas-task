import {
  IOptions, IToy,
} from '../../../types/types';
import GetToyCards from '../toyCards/getToyCards';
import Sorting from './sorting';
import Filter from './filter';
import Storage from './storage';

class Options {
  options: IOptions;

  data: IToy[];

  sort: string;

  filter: Filter;

  sorting: Sorting;

  selectedCards: string[];

  storage: Storage;

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
    this.sort = 'name-asc';
    this.filter = new Filter(this.options);
    this.sorting = new Sorting(this.data, this.sort);
    this.selectedCards = [];
    this.storage = new Storage(this.options, this.sort, this.selectedCards);
  }

  start(): void {
    const filter = <HTMLElement>document.querySelector('.form-filter');
    const toyCards = <HTMLElement>document.querySelector('.toy-cards');
    this.storage.start();
    this.getOptionsFromStorage();
    this.sorting.start();
    filter.addEventListener('click', this.applySorting.bind(this));
    this.filter.start();
    filter.addEventListener('click', this.applyOptions.bind(this));
    GetToyCards.getToys(this.data, this.options, this.selectedCards);
    toyCards.addEventListener('click', this.selectCards.bind(this));
    window.addEventListener('beforeunload', this.storage.setLocalStorage.bind(this));
  }

  applySorting() {
    if (this.sort !== this.sorting.sort) {
      this.sort = this.sorting.sort;
      GetToyCards.getToys(this.data, this.options, this.selectedCards);
    }
  }

  applyOptions() {
    this.options = this.filter.options;
    GetToyCards.getToys(this.data, this.options, this.selectedCards);
  }

  selectCards(event: MouseEvent): void {
    const selectedAmount = <HTMLElement>document.querySelector('.selected-amount');
    const target = <HTMLElement>event.target;
    const closest = <HTMLElement>target.closest('.card');
    if (closest) {
      if (this.selectedCards.length < 20
          && !this.selectedCards.includes(closest.id)) {
        closest.classList.add('selected');
        this.selectedCards.push(closest.id);
      } else if (this.selectedCards.includes(closest.id)) {
        closest.classList.remove('selected');
        this.selectedCards.splice(this.selectedCards.indexOf(closest.id), 1);
      }
      selectedAmount.textContent = this.selectedCards.length.toString();
    }
  }

  getOptionsFromStorage() {
    this.options = this.storage.options;
    this.sort = this.storage.sort;
    this.selectedCards = this.storage.selectedCards;
    console.log(this.options);
    console.log(this.sort);
    console.log(this.selectedCards);
  }
}

export default Options;
