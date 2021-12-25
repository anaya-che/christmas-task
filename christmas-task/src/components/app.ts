import { IToy } from '../types/types';
import MainPage from './mainPage/mainPage';
import ToysPage from './toys/toysPage/toysPage';
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

  async start(): Promise<void> {
    await this.getAllToys();
    // this.getToysPage();
    App.getMainPage();
  }
}

export default App;
