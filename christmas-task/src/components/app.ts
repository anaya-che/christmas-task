import { IToy } from '../types/types';
import ToysPage from './toysPage';
import Filter from './filter';

class App {
  data: IToy[];

  constructor() {
    this.data = [];
  }

  async getAllToys() {
    const toysData = '../data/data.json';
    const res: Response = await fetch(toysData);
    this.data = await res.json();
  }

  getToysPage() {
    ToysPage.render();
    const filter: Filter = new Filter(this.data);
    filter.start();
  }

  async start() {
    await this.getAllToys();
    this.getToysPage();
  }
}

export default App;
