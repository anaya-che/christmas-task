import * as noUiSlider from 'nouislider';
import {
  IOptions, ShapeFilter, ColorFilter, SizeFilter,
} from '../../../types';

class Filter {
  options: IOptions<number, string>;

  countSlider: noUiSlider.target;

  yearSlider: noUiSlider.target;

  constructor(options: IOptions<number, string>) {
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
    const allShapeButtons = 5;
    const allColorButtons = 5;
    const allSizeButtons = 3;

    if (this.options.shape.length !== allShapeButtons) {
      Filter.displayFilterOptions(this.options.shape);
    }
    if (this.options.color.length !== allColorButtons) {
      Filter.displayFilterOptions(this.options.color);
    }
    if (this.options.size.length !== allSizeButtons) {
      Filter.displayFilterOptions(this.options.size);
    }
  }

  displayInputOptions(): void {
    const favoriteInput = <HTMLInputElement>document.querySelector('.favorite-input');
    if (this.options.favorite.length === 1) favoriteInput.checked = true;
    else favoriteInput.checked = false;
  }

  static displayFilterOptions(filters: string[]): void {
    if (filters.includes(ShapeFilter.Round)) {
      Filter.activeButton('round');
    }
    if (filters.includes(ShapeFilter.Bell)) {
      Filter.activeButton('bell');
    }
    if (filters.includes(ShapeFilter.Cone)) {
      Filter.activeButton('cone');
    }
    if (filters.includes(ShapeFilter.Snowflake)) {
      Filter.activeButton('snowflake');
    }
    if (filters.includes(ShapeFilter.Figurine)) {
      Filter.activeButton('figurine');
    }
    if (filters.includes(ColorFilter.White)) {
      Filter.activeButton('white');
    }
    if (filters.includes(ColorFilter.Yellow)) {
      Filter.activeButton('yellow');
    }
    if (filters.includes(ColorFilter.Red)) {
      Filter.activeButton('red');
    }
    if (filters.includes(ColorFilter.Blue)) {
      Filter.activeButton('blue');
    }
    if (filters.includes(ColorFilter.Green)) {
      Filter.activeButton('green');
    }
    if (filters.includes(SizeFilter.Big)) {
      Filter.activeButton('big');
    }
    if (filters.includes(SizeFilter.Medium)) {
      Filter.activeButton('medium');
    }
    if (filters.includes(SizeFilter.Small)) {
      Filter.activeButton('small');
    }
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
      Filter.setOptions('shape', this.options.shape);
    } else if (colorButton) {
      Filter.activeButton(colorButton.id);
      Filter.setOptions('color', this.options.color);
    } else if (sizeButton) {
      Filter.activeButton(sizeButton.id);
      Filter.setOptions('size', this.options.size);
    } else if (favoriteInput) {
      this.setFavoriteOptions();
    } else if (resetButton) {
      this.resetOptions();
    }
  }

  static setOptions(type: string, filter: string[]): void {
    const activeButtons: HTMLCollectionOf<Element> = document.getElementsByClassName(`${type}-button active`);
    const activeButtonsId = Array.from(activeButtons, (element: Element) => element.id);
    filter.splice(0, filter.length);
    if (type === 'size') {
      if (activeButtonsId.length === 0) filter.push('большой', 'средний', 'малый');
      if (activeButtonsId.includes('big') && !filter.includes(SizeFilter.Big)) filter.push(SizeFilter.Big);
      if (activeButtonsId.includes('medium') && !filter.includes(SizeFilter.Medium)) filter.push(SizeFilter.Medium);
      if (activeButtonsId.includes('small') && !filter.includes(SizeFilter.Small)) filter.push(SizeFilter.Small);
    }
    if (type === 'shape') {
      if (activeButtonsId.length === 0) filter.push('шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка');
      if (activeButtonsId.includes('round') && !filter.includes(ShapeFilter.Round)) filter.push(ShapeFilter.Round);
      if (activeButtonsId.includes('bell') && !filter.includes(ShapeFilter.Bell)) filter.push(ShapeFilter.Bell);
      if (activeButtonsId.includes('cone') && !filter.includes(ShapeFilter.Cone)) filter.push(ShapeFilter.Cone);
      if (activeButtonsId.includes('snowflake') && !filter.includes(ShapeFilter.Snowflake)) filter.push(ShapeFilter.Snowflake);
      if (activeButtonsId.includes('figurine') && !filter.includes(ShapeFilter.Figurine)) filter.push(ShapeFilter.Figurine);
    }
    if (type === 'color') {
      if (activeButtonsId.length === 0) filter.push('белый', 'желтый', 'красный', 'синий', 'зелёный');
      if (activeButtonsId.includes('white') && !filter.includes(ColorFilter.White)) filter.push(ColorFilter.White);
      if (activeButtonsId.includes('yellow') && !filter.includes(ColorFilter.Yellow)) filter.push(ColorFilter.Yellow);
      if (activeButtonsId.includes('red') && !filter.includes(ColorFilter.Red)) filter.push(ColorFilter.Red);
      if (activeButtonsId.includes('blue') && !filter.includes(ColorFilter.Blue)) filter.push(ColorFilter.Blue);
      if (activeButtonsId.includes('green') && !filter.includes(ColorFilter.Green)) filter.push(ColorFilter.Green);
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
    activeButtons.forEach((el): void => el.classList.remove('active'));

    Filter.displaySliderOptions(this.options);
  }

  static displaySliderOptions(options: IOptions<number, string>): void {
    const countSlider = <noUiSlider.target>document.querySelector('.count-slider');
    const yearSlider = <noUiSlider.target>document.querySelector('.year-slider');
    (<noUiSlider.API>countSlider.noUiSlider).set(
      [options.count[0], options.count[1]],
    );
    (<noUiSlider.API>yearSlider.noUiSlider).set(
      [options.year[0], options.year[1]],
    );
    this.getCountSliderValues(options);
    this.getYearSliderValues(options);
  }

  static getCountSliderValues(options: IOptions<number, string>): void {
    const lowerValue = <HTMLElement>document.querySelector('.count-value_lower');
    const upperValue = <HTMLElement>document.querySelector('.count-value_upper');
    lowerValue.textContent = options.count[0].toString();
    upperValue.textContent = options.count[1].toString();
  }

  static getYearSliderValues(options: IOptions<number, string>): void {
    const lowerValue = <HTMLElement>document.querySelector('.year-value_lower');
    const upperValue = <HTMLElement>document.querySelector('.year-value_upper');
    lowerValue.textContent = options.year[0].toString();
    upperValue.textContent = options.year[1].toString();
  }

  static activeButton(id: string): void {
    const button = <HTMLElement>document.getElementById(id);
    if (button.classList.contains('active')) button.classList.remove('active');
    else button.classList.add('active');
  }
}

export default Filter;
