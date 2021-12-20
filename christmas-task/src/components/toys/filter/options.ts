import * as noUiSlider from 'nouislider';
import {
  IOptions, IToy,
} from '../../../types/types';
import GetToyCards from '../toyCards/getToyCards';
import Sorting from './sorting';
import Filter from './filter';
import Storage from './storage';

class Options {
  options: IOptions<number, string>;

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
    this.selectedCards = [];
    this.storage = new Storage();
    this.filter = new Filter(this.options);
    this.sorting = new Sorting(this.data, this.sort);
  }

  start(): void {
    const filter = <HTMLElement>document.querySelector('.form-filter');
    const toyCards = <HTMLElement>document.querySelector('.toy-cards');
    const sortElement = <HTMLElement>document.querySelector('.form-filter__sort');
    const countSlider = <noUiSlider.target>document.querySelector('.count-slider');
    const yearSlider = <noUiSlider.target>document.querySelector('.year-slider');
    (<noUiSlider.API> countSlider.noUiSlider).on('change', (values: (string | number)[]): void => {
      const getToyCards = new GetToyCards(this.data, this.options, this.selectedCards);
      this.options.count = <number[]>values;
      this.getCountSliderValues();
      getToyCards.displayAllToys();
    });

    (<noUiSlider.API> yearSlider.noUiSlider).on('change', (values: (string | number)[]): void => {
      const getToyCards = new GetToyCards(this.data, this.options, this.selectedCards);
      this.options.year = <number[]>values;
      this.getYearSliderValues();
      getToyCards.displayAllToys();
    });

    this.storage.start();
    this.getOptionsFromStorage();
    this.displaySelectedAmount();
    this.displaySliderOptions();
    this.sorting.start();
    sortElement.addEventListener('change', this.applySorting.bind(this));
    this.filter.start();
    filter.addEventListener('click', this.applyOptions.bind(this));
    const getToyCards = new GetToyCards(this.data, this.options, this.selectedCards);
    getToyCards.displayAllToys();
    toyCards.addEventListener('click', this.selectCards.bind(this));
    window.addEventListener('beforeunload', this.storage.setLocalStorage.bind(this));
  }

  applySorting(): void {
    if (this.sort !== this.sorting.sort) {
      this.sort = this.sorting.sort;
      const getToyCards = new GetToyCards(this.data, this.options, this.selectedCards);
      getToyCards.displayAllToys();
    }
  }

  applyOptions(event: MouseEvent): void {
    const target = <HTMLElement>event.target;
    if (target.closest('.button')
    || target.closest('.favorite-label')
    || target.closest('.favorite-input')
    || target.closest('.slider')) {
      this.options = this.filter.options;
      const getToyCards = new GetToyCards(this.data, this.options, this.selectedCards);
      getToyCards.displayAllToys();
    }
  }

  selectCards(event: MouseEvent): void {
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
      } else if (this.selectedCards.length === 20) {
        closest.classList.add('max-slots');
        setTimeout(() => closest.classList.remove('max-slots'), 1500);
      }
      this.displaySelectedAmount();
    }
  }

  displaySelectedAmount(): void {
    const selectedAmount = <HTMLElement>document.querySelector('.selected-amount');
    selectedAmount.textContent = this.selectedCards.length.toString();
  }

  getOptionsFromStorage(): void {
    this.options = this.storage.options;
    this.sort = this.storage.sort;
    this.selectedCards = this.storage.selectedCards;
    this.filter = new Filter(this.options);
    this.sorting = new Sorting(this.data, this.sort);
  }

  displaySliderOptions(): void {
    const countSlider = <noUiSlider.target>document.querySelector('.count-slider');
    const yearSlider = <noUiSlider.target>document.querySelector('.year-slider');
    (<noUiSlider.API>countSlider.noUiSlider).set(
      [this.options.count[0], this.options.count[1]],
    );
    (<noUiSlider.API>yearSlider.noUiSlider).set(
      [this.options.year[0], this.options.year[1]],
    );
    this.getCountSliderValues();
    this.getYearSliderValues();
  }

  getCountSliderValues(): void {
    const lowerValue = <HTMLElement>document.querySelector('.count-value_lower');
    const upperValue = <HTMLElement>document.querySelector('.count-value_upper');
    lowerValue.textContent = this.options.count[0].toString();
    upperValue.textContent = this.options.count[1].toString();
  }

  getYearSliderValues(): void {
    const lowerValue = <HTMLElement>document.querySelector('.year-value_lower');
    const upperValue = <HTMLElement>document.querySelector('.year-value_upper');
    lowerValue.textContent = this.options.year[0].toString();
    upperValue.textContent = this.options.year[1].toString();
  }
}

export default Options;
