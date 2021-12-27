import { IToy } from '../../../types';

class Sorting {
  data: IToy[];

  sort: string;

  constructor(data: IToy[], sort: string) {
    this.data = data;
    this.sort = sort;
  }

  start(): void {
    const sortSelect = <HTMLSelectElement>document.querySelector('.form-filter__sort');
    sortSelect.value = this.sort;
    sortSelect.addEventListener('change', this.changeSortOptions.bind(this));
    this.sortToysCards();
  }

  changeSortOptions(): void {
    const sortSelect = <HTMLSelectElement>document.querySelector('.form-filter__sort');
    this.sort = sortSelect.value;
    this.sortToysCards();
  }

  sortToysCards(): void {
    if (this.sort === 'name-asc') {
      this.data.sort((a: IToy, b: IToy): 1 | -1 | 0 => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    }
    if (this.sort === 'name-desc') {
      this.data.sort((a: IToy, b: IToy): 1 | -1 | 0 => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
    }
    if (this.sort === 'year-asc') this.data.sort((a: IToy, b: IToy): number => Number(a.year) - Number(b.year));
    if (this.sort === 'year-desc') this.data.sort((a: IToy, b: IToy): number => Number(b.year) - Number(a.year));
  }
}

export default Sorting;
