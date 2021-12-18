import ToyCard from './toyCard';
import { IOptions, IToy } from '../../types/types';

class GetToyCards {
  static getToys(data: IToy[], options: IOptions): void {
    const toysArray: HTMLDivElement[] = [];
    data.forEach((el: IToy) => {
      if (options.shape.includes(el.shape)
          && options.color.includes(el.color)
          && options.size.includes(el.size)
          && options.favorite.includes(el.favorite)) {
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
        toysArray.push(card.createCard());
      }
    });
    this.render(toysArray);
  }

  static render(toysArray: HTMLDivElement[]): void {
    const currCollection: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
    const currCollectionId = Array.from(currCollection, (element: Element) => element.id);
    const toyId = Array.from(toysArray, (element: HTMLDivElement) => element.id);

    if (currCollectionId.length === 0) {
      toysArray.forEach((el: HTMLDivElement) => {
        this.addCard(el);
      });
    } else {
      toysArray.forEach((el: HTMLDivElement) => {
        if (!currCollectionId.includes(el.id)) {
          this.addCard(el);
        }
      });
      currCollectionId.forEach((el: string) => {
        if (!toyId.includes(el)) {
          this.removeCard(el);
        }
      });
    }
  }

  static addCard(el: HTMLDivElement): void {
    const cardContainer = <HTMLElement>document.querySelector('.toy-cards');
    cardContainer.append(el);
  }

  static removeCard(id: string): void {
    const element: HTMLElement | null = document.getElementById(id);
    if (element) element.remove();
  }
}

export default GetToyCards;
