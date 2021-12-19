import * as noUiSlider from 'nouislider';
import {
  IOptions, IToy, ShapeFilter, ColorFilter, SizeFilter,
} from '../../types/types';
import GetToyCards from './getToyCards';

class Filter {
  options: IOptions;

  data: IToy[];

  constructor(data: IToy[]) {
    this.data = data;
    this.options = {
      shape: ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'],
      color: ['белый', 'желтый', 'красный', 'синий', 'зелёный'],
      size: ['большой', 'средний', 'малый'],
      favorite: ['да', 'нет'],
      count: [1, 12],
      year: [1940, 2020],
    };
  }

  start(): void {
    const countSlider = <noUiSlider.target>document.querySelector('.count-slider');
    const yearSlider = <noUiSlider.target>document.querySelector('.year-slider');
    (<noUiSlider.API>countSlider.noUiSlider).on('change', (values: (string | number)[]): void => {
      this.options.count = values;
      this.getCountSliderValues();
    });

    (<noUiSlider.API>yearSlider.noUiSlider).on('change', (values: (string | number)[]): void => {
      this.options.year = values;
      this.getYearSliderValues();
    });

    document.addEventListener('click', this.changeFilter.bind(this));
    GetToyCards.getToys(this.data, this.options);
  }

  changeFilter(event: MouseEvent): void {
    const target = <HTMLElement>event.target;
    if (target.closest('.form-filter') && !target.closest('.count-slider')) this.choseOptions(target);
    GetToyCards.getToys(this.data, this.options);
  }

  getCountSliderValues(): void {
    const lowerValue = <HTMLElement>document.querySelector('.count-value_lower');
    const upperValue = <HTMLElement>document.querySelector('.count-value_upper');
    lowerValue.textContent = this.options.count[0].toString();
    upperValue.textContent = this.options.count[1].toString();
  }

  getYearSliderValues(): void {
    const lowerValue = <HTMLElement>document.querySelector('.year-value_lower');
    const upperValue = <HTMLElement>document.querySelector('.year-value_upper');
    lowerValue.textContent = this.options.year[0].toString();
    upperValue.textContent = this.options.year[1].toString();
  }

  choseOptions(target: HTMLElement): void {
    const shapeButton = <HTMLElement>target.closest('.shape-button');
    const colorButton = <HTMLElement>target.closest('.color-button');
    const sizeButton = <HTMLElement>target.closest('.size-button');
    const favoriteInput = <HTMLElement>target.closest('.favorite-input');

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
    }
  }

  setShapeOptions(): void {
    const activeButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('shape-button active');
    const activeButtonsId = Array.from(activeButtons, (element: Element) => element.id);
    const { shape } = this.options;
    const round: string = ShapeFilter.Round;
    const bell: string = ShapeFilter.Bell;
    const cone: string = ShapeFilter.Cone;
    const snowflake: string = ShapeFilter.Snowflake;
    const figurine: string = ShapeFilter.Figurine;
    shape.splice(0, shape.length);

    if (activeButtonsId.length === 0) {
      shape.push(round, bell, cone, snowflake, figurine);
    } else {
      activeButtonsId.forEach((el: string) => {
        switch (el) {
          case 'round':
            if (!shape.includes(round)) shape.push(round);
            break;
          case 'bell':
            if (!shape.includes(bell)) shape.push(bell);
            break;
          case 'cone':
            if (!shape.includes(cone)) shape.push(cone);
            break;
          case 'snowflake':
            if (!shape.includes(snowflake)) shape.push(snowflake);
            break;
          case 'figurine':
            if (!shape.includes(figurine)) shape.push(figurine);
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
    const white: string = ColorFilter.White;
    const yellow: string = ColorFilter.Yellow;
    const red: string = ColorFilter.Red;
    const blue: string = ColorFilter.Blue;
    const green: string = ColorFilter.Green;
    color.splice(0, color.length);

    if (activeButtonsId.length === 0) {
      color.push(white, yellow, red, blue, green);
    } else {
      activeButtonsId.forEach((el: string) => {
        switch (el) {
          case 'white':
            if (!color.includes(white)) color.push(white);
            break;
          case 'yellow':
            if (!color.includes(yellow)) color.push(yellow);
            break;
          case 'red':
            if (!color.includes(red)) color.push(red);
            break;
          case 'blue':
            if (!color.includes(blue)) color.push(blue);
            break;
          case 'green':
            if (!color.includes(green)) color.push(green);
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
    const big: string = SizeFilter.Big;
    const medium: string = SizeFilter.Medium;
    const small: string = SizeFilter.Small;
    size.splice(0, size.length);

    if (activeButtonsId.length === 0) {
      size.push(big, medium, small);
    } else {
      activeButtonsId.forEach((el: string) => {
        switch (el) {
          case 'big':
            if (!size.includes(big)) size.push(big);
            break;
          case 'medium':
            if (!size.includes(medium)) size.push(medium);
            break;
          case 'small':
            if (!size.includes(small)) size.push(small);
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

  static activeButton(id: string): void {
    const button = <HTMLElement>document.getElementById(id);
    if (button.classList.contains('active')) button.classList.remove('active');
    else button.classList.add('active');
  }
}

export default Filter;
