import './toysForTree.css';
import { IToy } from '../../../types/types';
import Storage from '../../toys/filter/storage';

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
  }

  renderToys(cardArray: string[]): void {
    const toysContainer = <HTMLElement>document.querySelector('.toys-container');
    cardArray.forEach((el: string): void => {
      const count = Number(this.data[Number(el)].count);
      const toyCard = document.createElement('div');
      toyCard.classList.add('toy-card');
      const toyCount = document.createElement('p');
      toyCount.classList.add('toys-count');
      toyCount.textContent = `${count}`;
      toyCard.append(toyCount);
      for (let i = 0; i < count; i += 1) {
        const toyImg = document.createElement('img');
        toyImg.classList.add('toys-img');
        toyImg.setAttribute('alt', 'Toy');
        toyImg.setAttribute('dragable', 'true');
        toyImg.setAttribute('src', `./assets/toys/${el}.png`);
        toyCard.append(toyImg);
      }
      toysContainer.append(toyCard);
    });
  }
}

export default ToysForTree;
