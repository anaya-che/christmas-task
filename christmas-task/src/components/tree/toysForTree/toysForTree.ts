import './toysForTree.css';
import { IToy } from '../../../types/types';
import Storage from '../../toys/filter/storage';
import DragToys from './dragToys';

class ToysForTree {
  data: IToy[];

  selectedCards: string[];

  storage: Storage;

  constructor(data: IToy[]) {
    this.data = data;
    this.selectedCards = [];
    this.storage = new Storage();
  }

  start(): void {
    this.storage.getLocalStorage();
    this.selectedCards = this.storage.selectedCards;
    if (this.selectedCards.length > 0) this.renderToys(this.selectedCards);
    else {
      const newArray: string[] = [];
      const arrayLength = 20;
      for (let i = 1; i <= arrayLength; i += 1) {
        newArray.push(i.toString());
      }
      this.renderToys(newArray);
    }
    DragToys.start();
  }

  renderToys(cardArray: string[]): void {
    const toysContainer = <HTMLElement>document.querySelector('.toys-container');

    this.data.forEach((el: IToy) => {
      if (cardArray.includes(el.num)) {
        const toyCard = document.createElement('div');
        toyCard.classList.add('toy-card');
        toyCard.id = `card-${el.num}`;
        const toyCount = document.createElement('p');
        toyCount.classList.add('toys-count');
        toyCount.id = `count-${el.num}`;
        toyCount.textContent = `${el.count}`;
        toyCard.append(toyCount);
        for (let i = 0; i < Number(el.count); i += 1) {
          const toyImg = document.createElement('img');
          toyImg.classList.add('toys-img');
          toyImg.id = `${el.num}-${i}`;
          toyImg.setAttribute('alt', 'Toy');
          toyImg.setAttribute('dragable', 'true');
          toyImg.setAttribute('src', `./assets/toys/${el.num}.png`);
          toyCard.append(toyImg);
        }
        toysContainer.append(toyCard);
        toysContainer.append(toyCard);
      }
    });
  }
}

export default ToysForTree;
