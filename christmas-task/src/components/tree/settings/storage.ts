import {
  ISettings,
} from '../../../types/types';

class Storage {
  settings: ISettings;

  constructor() {
    this.settings = {
      music: 'off',
      snow: 'off',
      treeImage: '1',
      bgImage: '1',
    };
  }

  start(): void {
    this.getLocalStorage();
    const clearButton = <HTMLElement>document.querySelector('.clear-button');
    clearButton.addEventListener('click', Storage.clearStorage.bind(this));
  }

  setLocalStorage(event: MouseEvent): void {
    const target = <HTMLElement>event.target;
    if (!target.closest('.clear-button')) {
      const settingsObj = JSON.stringify(this.settings);
      localStorage.setItem('settings', settingsObj);
    }
  }

  getLocalStorage(): void {
    if (localStorage.getItem('settings')) {
      const settingsObj = <string>localStorage.getItem('settings');
      this.settings = JSON.parse(settingsObj);
    }
  }

  static clearStorage(): void {
    localStorage.clear();
  }
}

export default Storage;
