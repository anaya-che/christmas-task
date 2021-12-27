import { IToy } from '../types';
import ToysPage from './toys/toysPage';
import { Options } from './toys/filter';
import Slider from './toys/slider';

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

  getToysPage(): void {
    ToysPage.render();
    Slider.start();
    const options: Options = new Options(this.data);
    options.start();
  }

  async start(): Promise<void> {
    await this.getAllToys();
    this.getToysPage();
  }
}

export default App;
