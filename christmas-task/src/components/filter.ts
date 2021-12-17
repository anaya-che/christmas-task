import { IOptions, IToy, ShapeFilter } from '../types/types';

class Filter {
  options: IOptions;

  data: IToy[];

  constructor(data: IToy[]) {
    this.data = data;
    this.options = {
      shape: [],
      color: [],
      size: [],
      favorite: [],
    };
  }

  start(): void {
    document.addEventListener('click', this.changeFilter.bind(this));
  }

  changeFilter(event: MouseEvent) {
    const target = <HTMLElement>event.target;
    if (target.closest('.form-filter__shape')) this.choseShape(target);
  }

  choseShape(target: HTMLElement) {
    const closest = <HTMLElement>target.closest('.button');

    if (closest) {
      switch (closest.id) {
        case 'round':
          if (!this.options.shape.includes(ShapeFilter.Round)) {
            this.options.shape.push(ShapeFilter.Round);
          }
          break;
        case 'bell':
          if (!this.options.shape.includes(ShapeFilter.Bell)) {
            this.options.shape.push(ShapeFilter.Bell);
          }
          break;
        case 'cone':
          if (!this.options.shape.includes(ShapeFilter.Cone)) {
            this.options.shape.push(ShapeFilter.Cone);
          }
          break;
        case 'snowflake':
          if (!this.options.shape.includes(ShapeFilter.Snowflake)) {
            this.options.shape.push(ShapeFilter.Snowflake);
          }
          break;
        case 'figurine':
          if (!this.options.shape.includes(ShapeFilter.Figurine)) {
            this.options.shape.push(ShapeFilter.Figurine);
          }
          break;
        default: break;
      }
      console.log(this.options.shape);
      this.getToy();
    }
  }

  async getToy() {
    this.data.forEach((el: IToy) => {
      if (this.options.shape?.includes(el.shape)) { console.log(el); }
    });
  }
}

export default Filter;
