import * as noUiSlider from 'nouislider';
import {
  IOptions, ShapeFilter, ColorFilter, SizeFilter,
} from '../../../types/types';

class Filter {
  options: IOptions;

  countSlider: noUiSlider.target;

  yearSlider: noUiSlider.target;

  constructor(options: IOptions) {
    this.options = options;
    this.countSlider = <noUiSlider.target>document.querySelector('.count-slider');
    this.yearSlider = <noUiSlider.target>document.querySelector('.year-slider');
  }

  start(): void {
    this.displayCurrentOptions();
    const formFilter = <HTMLElement>document.querySelector('.form-filter');
    formFilter.addEventListener('click', this.changeFilter.bind(this));
  }

  displayCurrentOptions(): void {
    this.displayInputOptions();
    if (this.options.shape.length !== 5) this.displayShapeOptions();
    if (this.options.color.length !== 5) this.displayColorOptions();
    if (this.options.size.length !== 3) this.displaySizeOptions();
  }

  displayInputOptions(): void {
    const favoriteInput = <HTMLInputElement>document.querySelector('.favorite-input');
    if (this.options.favorite.length === 1) favoriteInput.checked = true;
    else favoriteInput.checked = false;
  }

  displayShapeOptions(): void {
    const { shape } = this.options;
    shape.forEach((el: string): void => {
      switch (el) {
        case ShapeFilter.Round:
          Filter.activeButton('round');
          break;
        case ShapeFilter.Bell:
          Filter.activeButton('bell');
          break;
        case ShapeFilter.Cone:
          Filter.activeButton('cone');
          break;
        case ShapeFilter.Snowflake:
          Filter.activeButton('snowflake');
          break;
        case ShapeFilter.Figurine:
          Filter.activeButton('figurine');
          break;
        default: break;
      }
    });
  }

  displayColorOptions(): void {
    const { color } = this.options;
    color.forEach((el: string): void => {
      switch (el) {
        case ColorFilter.White:
          Filter.activeButton('white');
          break;
        case ColorFilter.Yellow:
          Filter.activeButton('yellow');
          break;
        case ColorFilter.Red:
          Filter.activeButton('red');
          break;
        case ColorFilter.Blue:
          Filter.activeButton('blue');
          break;
        case ColorFilter.Green:
          Filter.activeButton('green');
          break;
        default: break;
      }
    });
  }

  displaySizeOptions(): void {
    const { size } = this.options;
    size.forEach((el: string): void => {
      switch (el) {
        case SizeFilter.Big:
          Filter.activeButton('big');
          break;
        case SizeFilter.Medium:
          Filter.activeButton('medium');
          break;
        case SizeFilter.Small:
          Filter.activeButton('small');
          break;
        default: break;
      }
    });
  }

  changeFilter(event: MouseEvent): void {
    const target = <HTMLElement>event.target;
    if (target.closest('.form-filter')
        && !target.closest('.form-filter__sort')
        && !target.closest('.search')) {
      this.choseOptions(target);
    }
  }

  choseOptions(target: HTMLElement): void {
    const shapeButton = <HTMLElement>target.closest('.shape-button');
    const colorButton = <HTMLElement>target.closest('.color-button');
    const sizeButton = <HTMLElement>target.closest('.size-button');
    const favoriteInput = <HTMLElement>target.closest('.favorite-input');
    const resetButton = <HTMLElement>target.closest('.reset-button');

    if (shapeButton) {
      Filter.activeButton(shapeButton.id);
      this.setShapeOptions();
    } else if (colorButton) {
      Filter.activeButton(colorButton.id);
      this.setColorOptions();
    } else if (sizeButton) {
      Filter.activeButton(sizeButton.id);
      this.setSizeOptions();
    } else if (favoriteInput) {
      this.setFavoriteOptions();
    } else if (resetButton) {
      this.resetOptions();
    }
  }

  setShapeOptions(): void {
    const activeButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('shape-button active');
    const activeButtonsId = Array.from(activeButtons, (element: Element) => element.id);
    const { shape } = this.options;
    shape.splice(0, shape.length);

    if (activeButtonsId.length === 0) {
      shape.push('шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка');
    } else {
      activeButtonsId.forEach((el: string) => {
        switch (el) {
          case 'round':
            if (!shape.includes(ShapeFilter.Round)) shape.push(ShapeFilter.Round);
            break;
          case 'bell':
            if (!shape.includes(ShapeFilter.Bell)) shape.push(ShapeFilter.Bell);
            break;
          case 'cone':
            if (!shape.includes(ShapeFilter.Cone)) shape.push(ShapeFilter.Cone);
            break;
          case 'snowflake':
            if (!shape.includes(ShapeFilter.Snowflake)) shape.push(ShapeFilter.Snowflake);
            break;
          case 'figurine':
            if (!shape.includes(ShapeFilter.Figurine)) shape.push(ShapeFilter.Figurine);
            break;
          default: break;
        }
      });
    }
  }

  setColorOptions(): void {
    const activeButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('color-button active');
    const activeButtonsId = Array.from(activeButtons, (element: Element) => element.id);
    const { color } = this.options;
    color.splice(0, color.length);

    if (activeButtonsId.length === 0) {
      color.push('белый', 'желтый', 'красный', 'синий', 'зелёный');
    } else {
      activeButtonsId.forEach((el: string) => {
        switch (el) {
          case 'white':
            if (!color.includes(ColorFilter.White)) color.push(ColorFilter.White);
            break;
          case 'yellow':
            if (!color.includes(ColorFilter.Yellow)) color.push(ColorFilter.Yellow);
            break;
          case 'red':
            if (!color.includes(ColorFilter.Red)) color.push(ColorFilter.Red);
            break;
          case 'blue':
            if (!color.includes(ColorFilter.Blue)) color.push(ColorFilter.Blue);
            break;
          case 'green':
            if (!color.includes(ColorFilter.Green)) color.push(ColorFilter.Green);
            break;
          default: break;
        }
      });
    }
  }

  setSizeOptions(): void {
    const activeButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('size-button active');
    const activeButtonsId = Array.from(activeButtons, (element: Element) => element.id);
    const { size } = this.options;
    size.splice(0, size.length);

    if (activeButtonsId.length === 0) {
      size.push('большой', 'средний', 'малый');
    } else {
      activeButtonsId.forEach((el: string) => {
        switch (el) {
          case 'big':
            if (!size.includes(SizeFilter.Big)) size.push(SizeFilter.Big);
            break;
          case 'medium':
            if (!size.includes(SizeFilter.Medium)) size.push(SizeFilter.Medium);
            break;
          case 'small':
            if (!size.includes(SizeFilter.Small)) size.push(SizeFilter.Small);
            break;
          default: break;
        }
      });
    }
  }

  setFavoriteOptions(): void {
    const favoriteInput = <HTMLInputElement>document.querySelector('.favorite-input');
    const { favorite } = this.options;
    if (favoriteInput.checked) favorite.splice(favorite.indexOf('нет'), 1);
    else favorite.push('нет');
  }

  resetOptions(): void {
    this.options = {
      shape: ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'],
      color: ['белый', 'желтый', 'красный', 'синий', 'зелёный'],
      size: ['большой', 'средний', 'малый'],
      favorite: ['да', 'нет'],
      count: [1, 12],
      year: [1940, 2020],
    };
    this.displayCurrentOptions();
    const activeButtons: NodeListOf<Element> = document.querySelectorAll('.active');
    activeButtons.forEach((el) => el.classList.remove('active'));
  }

  static activeButton(id: string): void {
    const button = <HTMLElement>document.getElementById(id);
    if (button.classList.contains('active')) button.classList.remove('active');
    else button.classList.add('active');
  }
}

export default Filter;
