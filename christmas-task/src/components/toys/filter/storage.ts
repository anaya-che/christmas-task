import {
  IOptions,
} from '../../../types/types';

class Storage {
  options: IOptions;

  sort: string;

  selectedCards: string[];

  constructor(options: IOptions, sort: string, selectedCards: string[]) {
    this.options = options;
    this.sort = sort;
    this.selectedCards = selectedCards;
  }

  start() {
    this.getLocalStorage();
    const clearButton = <HTMLElement>document.querySelector('.clear-button');
    clearButton.addEventListener('click', Storage.clearStorage.bind(this));
  }

  setLocalStorage() {
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
