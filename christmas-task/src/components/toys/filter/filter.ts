import * as noUiSlider from 'nouislider';
import {
  IOptions, ShapeFilterEng, ColorFilterEng, SizeFilterEng,
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
      Filter.displayFilterOptions<typeof ShapeFilterEng>(this.options.shape, ShapeFilterEng);
    }
    if (this.options.color.length !== allColorButtons) {
      Filter.displayFilterOptions<typeof ColorFilterEng>(this.options.color, ColorFilterEng);
    }
    if (this.options.size.length !== allSizeButtons) {
      Filter.displayFilterOptions<typeof SizeFilterEng>(this.options.size, SizeFilterEng);
    }
  }

  displayInputOptions(): void {
    const favoriteInput = <HTMLInputElement>document.querySelector('.favorite-input');
    if (this.options.favorite.length === 1) favoriteInput.checked = true;
    else favoriteInput.checked = false;
  }

  static displayFilterOptions<T>(filters: string[], enumObj: T): void {
    Object.entries(enumObj).forEach(([key, value]) => {
      if (filters.includes(value)) Filter.activeButton(key);
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
      Filter.setOptions<typeof ShapeFilterEng>(this.options.shape, 'shape', ShapeFilterEng);
    } else if (colorButton) {
      Filter.activeButton(colorButton.id);
      Filter.setOptions<typeof ColorFilterEng>(this.options.color, 'color', ColorFilterEng);
    } else if (sizeButton) {
      Filter.activeButton(sizeButton.id);
      Filter.setOptions<typeof SizeFilterEng>(this.options.size, 'size', SizeFilterEng);
    } else if (favoriteInput) {
      this.setFavoriteOptions();
    } else if (resetButton) {
      this.resetOptions();
    }
  }

  static setOptions<T>(filter: string[], type: string, enumObj: T): void {
    const activeButtons: HTMLCollectionOf<Element> = document.getElementsByClassName(`${type}-button active`);
    const activeButtonsId = Array.from(activeButtons, (element: Element) => element.id);
    filter.splice(0, filter.length);

    activeButtonsId.forEach((el: string) => {
      if (Object.keys(enumObj).includes(el)) {
        const value: T[keyof T] = enumObj[el as keyof typeof enumObj];
        if (typeof value === 'string') filter.push(value);
      }
    });

    if (activeButtonsId.length === 0) Object.values(enumObj).forEach((el) => filter.push(el));
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
