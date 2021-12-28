import MainPage from './mainPage/mainPage';
import TreePage from './tree/treePage';
import { Settings } from './tree/settings';
import { ToysForTree } from './tree/toysForTree';
import { IToy } from '../types';
import ToysPage from './toys/toysPage';
import { Options } from './toys/filter';
import Slider from './toys/slider';

class App {
  data: IToy[];

  constructor() {
    this.data = [];
    document.addEventListener('click', this.navigation.bind(this));
  }

  async getAllToys(): Promise<void> {
    const toysData = '../data/data.json';
    const res: Response = await fetch(toysData);
    this.data = await res.json();
  }

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
    TreePage.render();
    const settings: Settings = new Settings();
    settings.start();
    const toys: ToysForTree = new ToysForTree(this.data);
    toys.start();
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
