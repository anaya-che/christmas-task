import {
  IOptions,
} from '../../../types';

class Storage {
  options: IOptions<number, string>;

  sort: string;

  selectedCards: string[];

  constructor() {
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
  }

  start(): void {
    this.getLocalStorage();
    const clearButton = <HTMLElement>document.querySelector('.clear-button');
    clearButton.addEventListener('click', Storage.clearStorage.bind(this));
  }

  setLocalStorage(): void {
    const optionsObj = JSON.stringify(this.options);
    const cardsString = this.selectedCards.join();
    localStorage.setItem('options', optionsObj);
    localStorage.setItem('sort', this.sort);
    localStorage.setItem('selectedCards', cardsString);
  }

  getLocalStorage(): void {
    if (localStorage.getItem('sort')) {
      this.sort = <string>localStorage.getItem('sort');
    }
    if (localStorage.getItem('selectedCards')) {
      const cardsString = <string>localStorage.getItem('selectedCards');
      this.selectedCards = cardsString.split(',');
    }
    if (localStorage.getItem('options')) {
      const optionsObj = <string>localStorage.getItem('options');
      this.options = JSON.parse(optionsObj);
    }
  }

  static clearStorage(): void {
    localStorage.clear();
  }
}

export default Storage;
