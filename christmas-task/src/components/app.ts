import { IToy } from '../types/types';
import MainPage from './mainPage/mainPage';
import ToysPage from './toys/toysPage/toysPage';
import TreePage from './tree/treePage/treePage';
import Options from './toys/filter/options';
import Slider from './toys/slider/slider';
import Storage from './toys/filter/storage';

class App {
  data: IToy[];

  storage: Storage;

  constructor() {
    this.data = [];
    this.storage = new Storage();
    document.addEventListener('click', this.navigation.bind(this));
  }

  async getAllToys(): Promise<void> {
    const toysData = '../data/data.json';
    const res: Response = await fetch(toysData);
    this.data = await res.json();
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

  getTreePage(): void {
    this.storage.getLocalStorage();
    const { selectedCards } = this.storage;
    console.log(selectedCards);
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
