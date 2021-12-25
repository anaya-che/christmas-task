import './toyCard.css';

class ToyCard {
  num: string;

  name: string;

  count: string;

  year: string;

  shape: string;

  color: string;

  size: string;

  favorite: string;

  constructor(
    num: string,
    name: string,
    count: string,
    year: string,
    shape: string,
    color: string,
    size: string,
    favorite: string,
  ) {
    this.num = num;
    this.name = name;
    this.count = count;
    this.year = year;
    this.shape = shape;
    this.color = color;
    this.size = size;
    this.favorite = favorite;
  }

  createCard(selected: boolean): HTMLDivElement {
    const cardElement: HTMLDivElement = document.createElement('div');
    if (selected) cardElement.className = 'card selected';
    else cardElement.className = 'card';
    cardElement.id = this.num;

    const imgElement: HTMLImageElement = document.createElement('img');
    imgElement.className = 'card-image';
    imgElement.setAttribute('src', `./assets/toys/${this.num}.png`);
    imgElement.setAttribute('alt', 'Toy');

    const descriptionElement: HTMLDivElement = document.createElement('div');
    descriptionElement.className = 'card-decription';

    const nameElement: HTMLDivElement = document.createElement('div');
    nameElement.className = 'card-title';
    nameElement.innerText = this.name;

    const countElement: HTMLDivElement = document.createElement('div');
    countElement.className = 'count';
    countElement.innerText = `Количество: ${this.count}`;

    const yearElement: HTMLDivElement = document.createElement('div');
    yearElement.className = 'year';
    yearElement.innerText = `Год покупки: ${this.year}`;

    const shapeElement: HTMLDivElement = document.createElement('div');
    shapeElement.className = 'shape';
    shapeElement.innerText = `Форма: ${this.shape}`;

    const colorElement: HTMLDivElement = document.createElement('div');
    colorElement.className = 'color';
    colorElement.innerText = `Цвет: ${this.color}`;

    const sizeElement: HTMLDivElement = document.createElement('div');
    sizeElement.className = 'size';
    sizeElement.innerText = `Размер: ${this.size}`;

    const favoriteElement: HTMLDivElement = document.createElement('div');
    favoriteElement.className = 'favorite';
    favoriteElement.innerText = `Любимая: ${this.favorite}`;

    const ribbonElement: HTMLDivElement = document.createElement('div');
    ribbonElement.className = 'ribbon';

    cardElement.append(
      nameElement,
      imgElement,
      descriptionElement,
      ribbonElement,
    );

    descriptionElement.append(
      countElement,
      yearElement,
      shapeElement,
      colorElement,
      sizeElement,
      favoriteElement,
    );

    return cardElement;
  }
}

export default ToyCard;
