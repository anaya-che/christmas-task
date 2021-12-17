import {
  IOptions, IToy, ShapeFilter, ColorFilter, SizeFilter,
} from '../types/types';

class Filter {
  options: IOptions;

  data: IToy[];

  constructor(data: IToy[]) {
    this.data = data;
    this.options = {
      shape: ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'],
      color: ['белый', 'желтый', 'красный', 'синий', 'зелёный'],
      size: ['большой', 'средний', 'малый'],
      favorite: [],
    };
  }

  start(): void {
    document.addEventListener('click', this.changeFilter.bind(this));
    console.log(this.options);
  }

  changeFilter(event: MouseEvent) {
    const target = <HTMLElement>event.target;
    if (target.closest('.form-filter__shape')) this.choseShape(target);
    else if (target.closest('.form-filter__color')) this.choseColor(target);
    else if (target.closest('.form-filter__size')) this.choseSize(target);
    console.log(this.options);
    this.getToy();
  }

  choseShape(target: HTMLElement) {
    const closest = <HTMLElement>target.closest('.button');
    const { shape } = this.options;
    const round: string = ShapeFilter.Round;
    const bell: string = ShapeFilter.Bell;
    const cone: string = ShapeFilter.Cone;
    const snowflake: string = ShapeFilter.Snowflake;
    const figurine: string = ShapeFilter.Figurine;

    if (closest) {
      switch (closest.id) {
        case 'round':
          if (!shape.includes(round)) {
            shape.push(round);
          } else shape.splice(shape.indexOf(round), 1);
          break;
        case 'bell':
          if (!shape.includes(bell)) {
            shape.push(bell);
          } else shape.splice(shape.indexOf(bell), 1);
          break;
        case 'cone':
          if (!shape.includes(cone)) {
            shape.push(cone);
          } else shape.splice(shape.indexOf(cone), 1);
          break;
        case 'snowflake':
          if (!shape.includes(snowflake)) {
            shape.push(snowflake);
          } else shape.splice(shape.indexOf(snowflake), 1);
          break;
        case 'figurine':
          if (!shape.includes(figurine)) {
            shape.push(figurine);
          } else shape.splice(shape.indexOf(figurine), 1);
          break;
        default: break;
      }
    }
  }

  choseColor(target: HTMLElement) {
    const closest = <HTMLElement>target.closest('.button');
    const { color } = this.options;
    const white: string = ColorFilter.White;
    const yellow: string = ColorFilter.Yellow;
    const red: string = ColorFilter.Red;
    const blue: string = ColorFilter.Blue;
    const green: string = ColorFilter.Green;

    if (closest) {
      switch (closest.id) {
        case 'white':
          if (!color.includes(white)) {
            color.push(white);
          } else color.splice(color.indexOf(white), 1);
          break;
        case 'yellow':
          if (!color.includes(yellow)) {
            color.push(yellow);
          } else color.splice(color.indexOf(yellow), 1);
          break;
        case 'red':
          if (!color.includes(red)) {
            color.push(red);
          } else color.splice(color.indexOf(red), 1);
          break;
        case 'blue':
          if (!color.includes(blue)) {
            color.push(blue);
          } else color.splice(color.indexOf(blue), 1);
          break;
        case 'green':
          if (!color.includes(green)) {
            color.push(green);
          } else color.splice(color.indexOf(green), 1);
          break;
        default: break;
      }
    }
  }

  choseSize(target: HTMLElement) {
    const closest = <HTMLElement>target.closest('.button');
    const { size } = this.options;
    const big: string = SizeFilter.Big;
    const medium: string = SizeFilter.Medium;
    const small: string = SizeFilter.Small;

    if (closest) {
      switch (closest.id) {
        case 'big':
          if (!size.includes(big)) {
            size.push(big);
          } else size.splice(size.indexOf(big), 1);
          break;
        case 'medium':
          if (!size.includes(medium)) {
            size.push(medium);
          } else size.splice(size.indexOf(medium), 1);
          break;
        case 'small':
          if (!size.includes(small)) {
            size.push(small);
          } else size.splice(size.indexOf(small), 1);
          break;
        default: break;
      }
    }
  }

  getToy() {
    this.data.forEach((el: IToy) => {
      if (this.options.shape.includes(el.shape)
          && this.options.color.includes(el.color)
          && this.options.size.includes(el.size)) { console.log(el); }
    });
  }
}

export default Filter;
