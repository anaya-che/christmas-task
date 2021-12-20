import ToyCard from './toyCard';
import { IOptions, IToy } from '../../../types/types';

class GetToyCards {
  data: IToy[];

  options: IOptions;

  selectedCards: string[];

  searchInput: HTMLInputElement;

  allCardsArray: HTMLDivElement[];

  currentCards: Element[];

  toysArray: HTMLDivElement[];

  filteredToys: HTMLDivElement[];

  constructor(data: IToy[], options: IOptions, selectedCards: string[]) {
    this.data = data;
    this.options = options;
    this.selectedCards = selectedCards;
    this.allCardsArray = [];
    this.currentCards = [];
    this.toysArray = [];
    this.filteredToys = [];
    this.searchInput = <HTMLInputElement>document.querySelector('.search');
    this.searchInput.addEventListener('input', this.searchCards.bind(this));
  }

  displayAllToys(): void {
    this.data.forEach((el: IToy) => {
      let selected = false;
      const card = new ToyCard(
        el.num,
        el.name,
        el.count,
        el.year,
        el.shape,
        el.color,
        el.size,
        el.favorite,
      );
      if (this.selectedCards.includes(el.num)) selected = true;
      this.allCardsArray.push(card.createCard(selected));
    });

    const cardContainer = <HTMLElement>document.querySelector('.toy-cards');
    cardContainer.innerHTML = '';
    this.allCardsArray.forEach((el: HTMLDivElement) => cardContainer.append(el));
    this.hideToysByOptions();
  }

  hideToysByOptions() {
    this.allCardsArray.forEach((el: HTMLDivElement) => {
      const shape = <string> el.childNodes[4].textContent;
      const color = <string> el.childNodes[5].textContent;
      const size = <string> el.childNodes[6].textContent;
      const favorite = <string> el.childNodes[7].textContent;
      const count = <string> el.childNodes[2].textContent;
      const year = <string> el.childNodes[3].textContent;
      if (!this.options.shape.includes(shape)
          || !this.options.color.includes(color)
          || !this.options.size.includes(size)
          || !this.options.favorite.includes(favorite)
          || !(Number(count) >= this.options.count[0] && Number(count) <= this.options.count[1])
          || !(Number(year) >= this.options.year[0] && Number(year) <= this.options.year[1])
      ) {
        el.classList.add('hidden');
      } else if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
      }
    });

    this.getCurrentCards();
  }

  getCurrentCards(): void {
    const allCards: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
    const allCardsArray = Array.from(allCards, (element: Element) => element);
    this.currentCards = allCardsArray.filter((el: Element) => !el.classList.value.includes('hidden'));
    GetToyCards.getEmptyMessage();
  }

  static getEmptyMessage(): void {
    const cardMessage = <HTMLElement>document.querySelector('.toy-cards__message');
    const allCards: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
    const allCardsArray = Array.from(allCards, (element: Element) => element);
    const aciveCards: Element[] = allCardsArray.filter((el: Element) => !el.classList.value.includes('hidden'));

    if (aciveCards.length === 0) {
      cardMessage.classList.remove('hidden');
    } else if (!cardMessage.classList.contains('hidden')) {
      cardMessage.classList.add('hidden');
    }
  }

  searchCards(): void {
    if (this.currentCards.length !== 0 && this.searchInput.value.length !== 0) {
      this.currentCards.forEach((el: Element) => {
        const title = <string> el.childNodes[1].textContent;
        if (!title.toLowerCase().includes(this.searchInput.value)) {
          el.classList.add('hidden');
        } else {
          el.classList.remove('hidden');
        }
      });
    } else if (this.searchInput.value.length === 0) {
      this.currentCards.forEach((el: Element) => el.classList.remove('hidden'));
    }
    GetToyCards.getEmptyMessage();
  }

  static render(filteredToys: HTMLDivElement[]): void {
    const cardContainer = <HTMLElement>document.querySelector('.toy-cards');
    cardContainer.innerHTML = '';
    if (filteredToys.length === 0) cardContainer.innerHTML = 'Извините, совпадений не обнаружено';
    else filteredToys.forEach((el: HTMLDivElement) => cardContainer.append(el));
  }
}

export default GetToyCards;
