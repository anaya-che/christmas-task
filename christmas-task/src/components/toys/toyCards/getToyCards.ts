import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import ToyCard from './toyCard';
import { IOptions, IToy } from '../../../types/types';

gsap.registerPlugin(Flip);

class GetToyCards {
  data: IToy[];

  options: IOptions<number, string>;

  selectedCards: string[];

  searchInput: HTMLInputElement;

  allCardsArray: HTMLDivElement[];

  currentCards: Element[];

  toysArray: HTMLDivElement[];

  filteredToys: HTMLDivElement[];

  constructor(data: IToy[], options: IOptions<number, string>, selectedCards: string[]) {
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
      const card: ToyCard = new ToyCard(
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
    this.allCardsArray.forEach((el: HTMLDivElement): void => cardContainer.append(el));
    this.hideToysByOptions();
    this.searchCards();
  }

  hideToysByOptions(): void {
    const state: Flip.FlipState = Flip.getState('.card');

    this.allCardsArray.forEach((el: HTMLDivElement): void => {
      const shapeContent = <string> el.childNodes[2].childNodes[2].textContent;
      const shape = <string> shapeContent.split(' ')[1];
      const colorContent = <string> el.childNodes[2].childNodes[3].textContent;
      const color = <string> colorContent.split(' ')[1];
      const sizeContent = <string> el.childNodes[2].childNodes[4].textContent;
      const size = <string> sizeContent.split(' ')[1];
      const favoriteContent = <string> el.childNodes[2].childNodes[5].textContent;
      const favorite = <string> favoriteContent.split(' ')[1];
      const countContent = <string> el.childNodes[2].childNodes[0].textContent;
      const count = <string> countContent.split(' ')[1];
      const yearContent = <string> el.childNodes[2].childNodes[1].textContent;
      const year = <string> yearContent.split(' ')[2];

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

    Flip.from(state, {
      duration: 1,
      fade: true,
      scale: true,
      ease: 'power1.inOut',
      onEnter: (elements: Element[]): gsap.core.Tween => gsap.fromTo(
        elements,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 1 },
      ),
      onLeave: (elements: Element[]): gsap.core.Tween => gsap.to(
        elements,
        { opacity: 0, scale: 0, duration: 1 },
      ),
    });

    this.getCurrentCards();
  }

  getCurrentCards(): void {
    const allCards: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
    const allCardsArray = Array.from(allCards, (element: Element): Element => element);
    this.currentCards = allCardsArray.filter((el: Element) => !el.classList.value.includes('hidden'));
    GetToyCards.getEmptyMessage();
  }

  static getEmptyMessage(): void {
    const cardMessage = <HTMLElement>document.querySelector('.toy-cards__message');
    const allCards: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
    const allCardsArray = Array.from(allCards, (element: Element): Element => element);
    const aciveCards: Element[] = allCardsArray.filter((el: Element): boolean => !el.classList.value.includes('hidden'));

    if (aciveCards.length === 0) {
      cardMessage.classList.remove('hidden');
    } else if (!cardMessage.classList.contains('hidden')) {
      cardMessage.classList.add('hidden');
    }
  }

  searchCards(): void {
    if (this.currentCards.length !== 0 && this.searchInput.value.trim().length !== 0) {
      this.currentCards.forEach((el: Element): void => {
        const title = <string> el.childNodes[0].textContent;
        if (!title.toLowerCase().includes(this.searchInput.value.trim())) {
          el.classList.add('hidden');
        } else {
          el.classList.remove('hidden');
        }
      });
    } else if (this.searchInput.value.length === 0) {
      this.currentCards.forEach((el: Element): void => el.classList.remove('hidden'));
    }
    GetToyCards.getEmptyMessage();
  }

  static render(filteredToys: HTMLDivElement[]): void {
    const cardContainer = <HTMLElement>document.querySelector('.toy-cards');
    cardContainer.innerHTML = '';
    if (filteredToys.length === 0) cardContainer.innerHTML = 'Извините, совпадений не обнаружено';
    else filteredToys.forEach((el: HTMLDivElement): void => cardContainer.append(el));
  }
}

export default GetToyCards;
