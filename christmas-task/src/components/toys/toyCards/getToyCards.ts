import ToyCard from './toyCard';
import { IOptions, IToy } from '../../../types/types';

class GetToyCards {
  data: IToy[];

  options: IOptions;

  selectedCards: string[];

  searchInput: HTMLInputElement;

  toysArray: HTMLDivElement[];

  filteredToys: HTMLDivElement[];

  constructor(data: IToy[], options: IOptions, selectedCards: string[]) {
    this.data = data;
    this.options = options;
    this.selectedCards = selectedCards;
    this.toysArray = [];
    this.filteredToys = [];
    this.searchInput = <HTMLInputElement>document.querySelector('.search');
    this.searchInput.addEventListener('input', this.searchCards.bind(this));
  }

  getToys(): void {
    this.toysArray = [];
    this.data.forEach((el: IToy) => {
      let selected = false;
      if (this.options.shape.includes(el.shape)
          && this.options.color.includes(el.color)
          && this.options.size.includes(el.size)
          && this.options.favorite.includes(el.favorite)
          && (Number(el.count) >= this.options.count[0]
          && Number(el.count) <= this.options.count[1])
          && (Number(el.year) >= this.options.year[0]
          && Number(el.year) <= this.options.year[1])) {
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
        this.toysArray.push(card.createCard(selected));
      }
    });
    this.searchCards();
  }

  searchCards(): void {
    if (this.toysArray.length !== 0 && this.searchInput.value.length !== 0) {
      this.filteredToys = this.toysArray.filter((el: HTMLDivElement) => {
        const title = <string> el.childNodes[1].textContent;
        return title.toLowerCase().includes(this.searchInput.value);
      });
      GetToyCards.render(this.filteredToys);
    } else GetToyCards.render(this.toysArray);
  }

  static render(filteredToys: HTMLDivElement[]): void {
    const cardContainer = <HTMLElement>document.querySelector('.toy-cards');
    cardContainer.innerHTML = '';
    filteredToys.forEach((el: HTMLDivElement) => cardContainer.append(el));
  }
}

export default GetToyCards;
