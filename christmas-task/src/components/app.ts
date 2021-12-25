import { IToy } from '../types/types';
import MainPage from './mainPage/mainPage';
import ToysPage from './toys/toysPage/toysPage';
import TreePage from './treePage/treePage';
import Options from './toys/filter/options';
import Slider from './toys/slider/slider';

class App {
  data: IToy[];

  constructor() {
    this.data = [];
  }

  async getAllToys(): Promise<void> {
    const toysData = '../data/data.json';
    const res: Response = await fetch(toysData);
    this.data = await res.json();
    document.addEventListener('click', this.navigation.bind(this));
  }

  static createImage = (src: string): Promise<unknown> => new Promise((res, rej): void => {
    const img: HTMLImageElement = new Image();
    img.onload = (): void => res(img);
    img.onerror = rej;
    img.src = src;
  });

  getToysPage(): void {
    ToysPage.render();
    Slider.start();
    const options: Options = new Options(this.data);
    options.start();
  }

  static getMainPage() {
    MainPage.render();
  }

  // eslint-disable-next-line class-methods-use-this
  getTreePage(): void {
    TreePage.render();
  }

  async start(): Promise<void> {
    await this.getAllToys();
    App.getMainPage();
  }

  navigation(event: MouseEvent): void {
    const target = <HTMLElement>event.target;
    if (target.closest('.nav-main')) {
      App.removeActiveClass();
      App.getMainPage();
    }
    if (target.closest('.main__button')
      || target.closest('.nav-toys')
    ) {
      App.addActiveClass('.nav-toys');
      this.getToysPage();
    }
    if (target.closest('.nav-tree')) {
      App.addActiveClass('.nav-tree');
      this.getTreePage();
    }
  }

  static addActiveClass(className: string): void {
    App.removeActiveClass();
    const target = <HTMLElement>document.querySelector(className);
    target.classList.add('active-link');
  }

  static removeActiveClass(): void {
    const allNavItems: NodeListOf<HTMLElement> = document.querySelectorAll('.header__nav-item');
    allNavItems.forEach((el: HTMLElement): void => {
      if (el.classList.contains('active-link')) el.classList.remove('active-link');
    });
  }
}

export default App;
