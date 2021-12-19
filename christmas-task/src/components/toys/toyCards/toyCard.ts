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
    const numElement: HTMLDivElement = document.createElement('div');
    numElement.className = 'num';
    numElement.innerText = this.num;
    const nameElement: HTMLDivElement = document.createElement('div');
    nameElement.className = 'name';
    nameElement.innerText = this.name;
    const countElement: HTMLDivElement = document.createElement('div');
    countElement.className = 'count';
    countElement.innerText = this.count;
    const yearElement: HTMLDivElement = document.createElement('div');
    yearElement.className = 'year';
    yearElement.innerText = this.year;
    const shapeElement: HTMLDivElement = document.createElement('div');
    shapeElement.className = 'shape';
    shapeElement.innerText = this.shape;
    const colorElement: HTMLDivElement = document.createElement('div');
    colorElement.className = 'color';
    colorElement.innerText = this.color;
    const sizeElement: HTMLDivElement = document.createElement('div');
    sizeElement.className = 'size';
    sizeElement.innerText = this.size;
    const favoriteElement: HTMLDivElement = document.createElement('div');
    favoriteElement.className = 'favorite';
    favoriteElement.innerText = this.favorite;

    cardElement.append(
      numElement,
      nameElement,
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
